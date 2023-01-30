import { GraphQLObjectType, GraphQLID, GraphQLInt } from 'graphql';

export const memberType = new GraphQLObjectType({
    name: 'memberType',
    fields: () => ({
        id: { type: GraphQLID },
        discount: { type: GraphQLInt },
        monthPostsLimit: { type: GraphQLInt },
    }),
}); 