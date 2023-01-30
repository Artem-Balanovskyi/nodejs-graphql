import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export const createProfileDto = new GraphQLInputObjectType({
    name: 'createProfileDto',
    fields: () => ({
        avatar: { type: new GraphQLNonNull(GraphQLString) },
        sex: { type: new GraphQLNonNull(GraphQLString) },
        birthday: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        memberTypeId: { type: new GraphQLNonNull(GraphQLString) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
    }),
});

export const updateProfileDto = new GraphQLInputObjectType({
    name: 'updateProfileDto',
    fields: () => ({
        avatar: { type: GraphQLString },
        sex: { type: GraphQLString },
        birthday: { type: GraphQLString },
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        memberTypeId: { type: GraphQLString },
    }),
});  