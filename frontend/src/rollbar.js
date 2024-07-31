import Rollbar from 'rollbar';

const rollbar = new Rollbar({
  accessToken: '6f9323de3cee497f9d6c4b9656255523',
  environment: process.env.NODE_ENV || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
