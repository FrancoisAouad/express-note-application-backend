// import allowedOrigins from './origin';

const corsConfig = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
};
export default corsConfig;
