const app = require('./app');

//routes
const nl2 = require('./nl2');
const health = require('./health');

app.use('/api/v1', nl2);
app.use('/api/v1', health);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
