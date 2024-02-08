import { Logger } from './logger';
import morgan, { StreamOptions } from 'morgan';

// Skip all the Morgan http log if the
// application is not running in development mode.
// This method is not really needed here since
// we already told to the logger that it should print
// only warning and error messages in production.
const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

function getStreamOptions(logger: Logger): StreamOptions {
  return {
    // Use the http severity
    write: (message) => logger.logHttp(message),
  };
}

export function newLoggerMiddleware(logger: Logger) {
  const stream = getStreamOptions(logger);
  return morgan(
    // Define message format string (this is the default one).
    // The message format is made from tokens, and each token is
    // defined inside the Morgan library.
    // You can create your custom token to show what do you want from a request.
    ':method :url - status :status - :response-time ms',
    // Options: in this case, I overwrote the stream and the skip logic.
    // See the methods above.
    { stream, skip },
  );
}
