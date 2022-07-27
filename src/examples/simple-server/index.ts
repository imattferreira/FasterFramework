import server, { router } from '../../core';

server.middleware(({ next, metadata }) => {
  // TODO
  metadata.platform = 'faster framework';

  console.log('this middleware run before all routes');

  next();
});

router.get('/', ({ response, metadata }) => {
  response.json({ message: 'hello world!', platform: metadata?.platform });
});

router.get('/:id', ({ request, response }) => {
  console.log(request.params);
  response.json({ message: `hello ${request.params?.id}` });
});

server.middleware(({ next }) => {
  console.log('this middleware run only before /user routes');
  next();
});

router.post('/user', ({ request, response }) => {
  response.json({ ...request.body });
});

router.get('/user/:id', ({ request, response }) => {
  response.json({ message: `hello user  with id: ${request.params?.id}` });
});

server.listen(3000, (port) => console.log(`\n[INFO]: 🚀 server running at: http://localhost:${port}`));
