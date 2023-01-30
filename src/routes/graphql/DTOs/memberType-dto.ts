import { GraphQLInt, GraphQLInputObjectType } from 'graphql';

export const updateMemberTypeDto = new GraphQLInputObjectType({
    name: 'updateTypeDto',
    fields: () => ({
        discount: { type: GraphQLInt },
        monthPostsLimit: { type: GraphQLInt },
    }),
});  