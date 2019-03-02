import React from 'react';
import PageBase from '../src/components/layout/PageBase';


function About() {
  return (
    <PageBase loginRequired={false}>
      This is a public page!
    </PageBase>
  );
}

About.propTypes = {};

export default About;
