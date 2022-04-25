import { createServer, Server } from 'http';

import { makeServerFn } from './protocols';
import serverHandler from './serverHandler';

let server: Server | null = null;

const makeServer: makeServerFn = () => server ?? createServer(serverHandler);

export default makeServer;
