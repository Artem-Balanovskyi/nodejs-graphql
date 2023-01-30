import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export const createPostDto = new GraphQLInputObjectType({
    name: 'createPostDto',
    fields: () => ({
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
    }),
});

export const updatePostDto = new GraphQLInputObjectType({
    name: 'updatePostDto',
    fields: () => ({
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    }),
});  