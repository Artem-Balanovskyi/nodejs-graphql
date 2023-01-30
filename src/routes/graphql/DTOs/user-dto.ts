import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLID } from 'graphql';

export const createUserDto = new GraphQLInputObjectType({
    name: 'createUserDto',
    fields: () => ({
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
    }),
});

export const updateUserDto = new GraphQLInputObjectType({
    name: 'updateUserDto',
    fields: () => ({
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

export const subscriptionDto = new GraphQLInputObjectType({
    name: 'subscriptionDto',
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
    }),
});