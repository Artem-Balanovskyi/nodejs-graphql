import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getUsers, getUserById, createUser, updateUser, unsubscribeFromUser, subscribeToUser } from './resolvers/users-resolvers';
import { getProfiles, getProfileById, createProfile, updateProfile } from './resolvers/profiles-resolvers';
import { getPosts, getPostById, createPost, updatePost } from './resolvers/posts-resolvers';
import { getMemberTypes, getMemberTypeById, updateType } from './resolvers/memberTypes-resolvers';

export const graphqlBodySchema = {
  type: 'object',
  properties: {
    mutation: { type: 'string' },
    query: { type: 'string' },
    variables: {
      type: 'object',
    },
  },
  oneOf: [
    {
      type: 'object',
      required: ['query'],
      properties: {
        query: { type: 'string' },
        variables: {
          type: 'object',
        },
      },
      additionalProperties: false,
    },
    {
      type: 'object',
      required: ['mutation'],
      properties: {
        mutation: { type: 'string' },
        variables: {
          type: 'object',
        },
      },
      additionalProperties: false,
    },
  ],
} as const;

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      getUsers: getUsers,
      getPosts: getPosts,
      getProfiles: getProfiles,
      getMemberTypes: getMemberTypes,
      getMemberTypeById: getMemberTypeById,
      getPostById: getPostById,
      getProfileById: getProfileById,
      getUserById: getUserById,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: createUser,
      createProfile: createProfile,
      createPost: createPost,
      updateUser: updateUser,
      updatePost: updatePost,
      updateProfile: updateProfile,
      updateType: updateType,
      unsubscribeFromUser: unsubscribeFromUser,
      subscribeToUser: subscribeToUser,
    },
  }),
});