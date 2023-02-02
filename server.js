const express = require('express');
const axios = require('axios');
const https = require('https');

const { PORT } = process.env;

const server = express();

server.get('/random', (req, res) => {
  axios
    .get('https://yesno.wtf/api?output=prettyjson')
    .then((axiosResponse) => {
      const { answer } = axiosResponse.data;
      if (answer === 'yes') res.send({ result: true });
      if (answer === 'no') res.send({ result: false });
      if (answer === 'maybe') res.status(500).send({ result: 500 });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
});

server.get('/healthz', (req, res) => {
  // https://httpstat.us/500
  https
    .request('https://yesno.wtf', { method: 'HEAD' }, (httpsResponse) => {
      const { statusCode } = httpsResponse;
      if (statusCode === 200) res.send(statusCode.toString());
      if (statusCode === 500) res.send(statusCode.toString());
    })
    .on('error', (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    })
    .end();
});

server.listen(PORT);
