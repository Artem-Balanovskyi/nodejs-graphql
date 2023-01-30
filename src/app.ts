import { join } from 'path';
import AutoLoad from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
//Uncomment below line (line No.5) for creating entities in DB.
import { addExamplesToDB } from './utils/addExamplesToDB';

const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: {},
  });

  //Uncomment below line (line No.14) for creating entities in DB.
  await addExamplesToDB(fastify.db);

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: {},
  });
};

export default app;
