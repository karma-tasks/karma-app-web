// server.js is required entry for GAE (vs. start script) - This will likely not be the case post EAP
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(process.env.PORT);

const port = process.env.PORT ? process.env.PORT : 3000;

app.prepare().then(() => {
  const server = express();

  // Route all other urls to next "as is" - see note above about /next/ and /webpack/
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
