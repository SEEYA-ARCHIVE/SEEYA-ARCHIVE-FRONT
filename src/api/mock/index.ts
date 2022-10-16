const isServer = typeof window === 'undefined';

export const setUpMocks = async () => {
  if (isServer) {
    const { server } = await import('./server');
    server.listen();
  } else {
    const { worker } = await import('./browser');
    worker.start();
  }
};
