import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const profile = new GraphQLObjectType({
    name: 'profile',
    fields: () => ({
        id: { type: GraphQLID },
        avatar: { type: GraphQLString },
        sex: { type: GraphQLString },
        birthday: { type: GraphQLString },
        country: { type: GraphQLString },
        street: { type: GraphQLString },
        city: { type: GraphQLString },
        memberTypeId: { type: GraphQLString },
        userId: { type: GraphQLID },
    }),
});
