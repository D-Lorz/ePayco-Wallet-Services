import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// CORS Options for all requests (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
export const CORS: CorsOptions = {
  origin: true,
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
  allowedHeaders: '*',
};
