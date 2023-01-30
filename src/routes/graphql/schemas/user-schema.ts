import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLID } from 'graphql';
import { memberType } from './memberType-schema';
import { post } from './post-schema';
import { profile } from './profile-schema';

export const user: any = new GraphQLObjectType({
  name: 'user',

  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    subscribedToUserIds: { type: new GraphQLList(GraphQLString) },
    posts: {
      type: new GraphQLList(post),
      async resolve(parent: any, args: any, context: any) {
        const posts = await context.db.posts.findMany({ key: 'userId', equals: parent.id });
        return posts;
      }
    },
    profile: {
      type: profile,
      async resolve(parent: any, args: any, context: any) {
        return await context.db.profiles.findOne({ key: 'userId', equals: parent.id });
      }
    },
    memberType: {
      type: memberType,
      async resolve(parent: any, args: any, context: any) {
        const profile = await context.db.profiles.findOne({ key: 'userId', equals: parent.id });
        if (!profile) return null;        
        return await context.db.memberTypes.findOne({ key: 'id', equals: profile.memberTypeId });
      }
    },
    userSubscribedTo: {
      type: new GraphQLList(user),
      async resolve(parent: any, args: any, context: any) {
        return await context.db.users.findMany({ key: 'subscribedToUserIds', inArray: parent.id });
      }
    },
    subscribedToUser: {
      type: new GraphQLList(user),
      async resolve(parent: any, args: any, context: any) {
        return await context.db.users.findMany({ key: 'id', equalsAnyOf: parent.subscribedToUserIds });
      }
    }
  }),
});
