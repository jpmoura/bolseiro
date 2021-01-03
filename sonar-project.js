/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const scanner = require('sonarqube-scanner');
const dotenv = require('dotenv');

const loadDotEnv = dotenv.config();

if (loadDotEnv.error) {
  throw loadDotEnv.error;
}

scanner(
  {
    serverUrl: process.env.SONAR_HOST,
    token: process.env.SONAR_TOKEN,
    options: {
      'sonar.sources': 'src',
      'sonar.sourceEncoding': 'UTF-8',
    },
  },
  () => {
    console.info('>> Sonar analysis is done!');
    process.exit();
  },
);
