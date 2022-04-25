import { IncomingMessage } from "http";

type BodyParserFn = (request: IncomingMessage) => Promise<Record<string, unknown>>;

const bodyParser: BodyParserFn = (request) => {
  let chunks = '';

  return new Promise(resolve => {
    request
    .on('data', (chunk) => {
      chunks += chunk;
    })
    .on('end', () => {
      resolve(chunks ? JSON.parse(chunks) : {});
    })
  });
}

export default bodyParser;
