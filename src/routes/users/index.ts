import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { idParamSchema } from '../../utils/reusedSchemas';
import { createUserBodySchema, changeUserBodySchema, subscribeBodySchema } from './schemas';
import type { UserEntity } from '../../utils/DB/entities/DBUsers';

const plugin: FastifyPluginAsyncJsonSchemaToTs = async (fastify): Promise<void> => {

  fastify.get('/', async function (request, reply): Promise<UserEntity[]> {
    return await fastify.db.users.findMany();
  });

  fastify.get('/:id', { schema: { params: idParamSchema } },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: "id", equals: id });
      if (user === null) throw fastify.httpErrors.notFound();
      return user;
    }
  );

  fastify.post('/', { schema: { body: createUserBodySchema } },
    async function (request, reply): Promise<UserEntity> {
      return await fastify.db.users.create(request.body);
    }
  );

  fastify.delete('/:id', { schema: { params: idParamSchema } },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: "id", equals: id });
      if (user === null) throw fastify.httpErrors.badRequest();

      const userPosts = await fastify.db.posts.findMany({ key: "userId", equals: id });
      if (userPosts.length > 0) {
        userPosts.forEach((item) => {
          fastify.db.posts.delete(item.id);
        });
      }

      const profile = await fastify.db.profiles.findOne({ key: "userId", equals: id });
      if (profile) await fastify.db.profiles.delete(profile.id);

      const subscribeToUsers = await fastify.db.users.findMany({ key: "subscribedToUserIds", inArray: id });

      if (subscribeToUsers.length > 0) {
        subscribeToUsers.forEach((item) => {
          const arr = item.subscribedToUserIds.filter((el) => el !== id);
          fastify.db.users.change(item.id, {
            subscribedToUserIds: arr,
          });
        });
      }

      return await fastify.db.users.delete(id);
    }
  );

  fastify.post('/:id/subscribeTo', { schema: { body: subscribeBodySchema, params: idParamSchema } },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const { userId } = request.body;

      const subscriptedUser = await fastify.db.users.findOne({ key: "id", equals: id });
      const subscriber = await fastify.db.users.findOne({ key: "id", equals: userId });

      if (subscriptedUser === null || subscriber === null) throw fastify.httpErrors.badRequest();

      let result = [...subscriber.subscribedToUserIds, id];

      return await fastify.db.users.change(userId, {
        subscribedToUserIds: result
      });
    }
  );

  fastify.post('/:id/unsubscribeFrom', { schema: { body: subscribeBodySchema, params: idParamSchema } },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const { userId } = request.body;

      const subscriptedUser = await fastify.db.users.findOne({ key: 'id', equals: id });
      const subscriber = await fastify.db.users.findOne({ key: 'id', equals: userId });

      if (subscriptedUser === null || subscriber === null || !subscriber.subscribedToUserIds.includes(id)) {
        throw fastify.httpErrors.badRequest();
      }

      subscriber.subscribedToUserIds = subscriber.subscribedToUserIds.filter((uId) => uId !== id).map((uId) => uId);

      return await fastify.db.users.change(userId, subscriber);
    }
  );

  fastify.patch('/:id', { schema: { body: changeUserBodySchema, params: idParamSchema } },
    async function (request, reply): Promise<UserEntity> {
      const { id } = request.params;
      const user = await fastify.db.users.findOne({ key: "id", equals: id });
      if (user === null) throw fastify.httpErrors.badRequest();

      return await fastify.db.users.change(id, request.body);
    }
  );
};

export default plugin;