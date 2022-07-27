import HttpCodes from '../../constants/httpCodes';
import { HttpResponse, MakeResponse } from './protocols';

const makeResponse: MakeResponse = (response) => {
  let statusCode = 200;

  return {
    status(status: number): Omit<HttpResponse, 'status'> {
      if (!(status in HttpCodes)) {
        throw new Error('invalid status code');
      }

      statusCode = status;

      return this;
    },
    json(data: Record<string, unknown>): Omit<HttpResponse, 'json'> {
      const parsedData = JSON.stringify(data);

      response
        .writeHead(statusCode, { 'Content-Type': 'application/json' })
        .write(parsedData);

      response.end();

      return this;
    },
  };
};

export default makeResponse;
