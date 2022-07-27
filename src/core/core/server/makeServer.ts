import { createServer, Server } from 'http';

import { makeServerFn } from './protocols';
import serverHandler from './serverHandler';

const server: Server | null = null;

const makeServer: makeServerFn = () => server ?? createServer(serverHandler);

export default makeServer;
