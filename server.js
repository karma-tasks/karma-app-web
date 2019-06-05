// server.js is required entry for GAE (vs. start script) - This will likely not be the case post EAP
const express = require('express');
const next = require('next');
var bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT ? process.env.PORT : 3000;

app.prepare().then(() => {
  const server = express();
  const api = express();
  // Route all other urls to next "as is" - see note above about /next/ and /webpack/
  api.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  api.use(bodyParser.json());

  api.post('/auth/authenticate', (req, res, next) => {
    console.log('==============================');

    console.log(req.body);
    console.log('SHEEET FOR BRAINS...');
    res.send('cool man');
    //next();

    // idToken comes from the client app (shown above)

    //admin.auth().verifyIdToken(idToken)
    //  .then(function(decodedToken) {
    //    var uid = decodedToken.uid;
    //    // ...
    //  }).catch(function(error) {
    //    // Handle error
    //  });
  });

  server.use(api);
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}).catch((ex) => {
  console.error(ex.stack);
  process.exit(1);
});
