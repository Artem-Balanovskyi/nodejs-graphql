import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';

export const post = new GraphQLObjectType({
    name: 'post',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: { type: GraphQLString },
    }),
});  