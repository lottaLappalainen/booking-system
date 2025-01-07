import ApiRouter from './routes/api.mjs';

export const setupRoutes = app => {
  app.use('/api', ApiRouter);
};
