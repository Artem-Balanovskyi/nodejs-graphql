import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { post } from '../schemas/post-schema';
import { createPostDto, updatePostDto } from '../DTOs/post-dto';

export const getPosts = {
    type: new GraphQLList(post),
    async resolve(parent: any, args: any, context: any) {
        return await context.db.posts.findMany();
    },
};

export const getPostById = {
    type: post,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent: any, args: any, context: any) {
        const post = await context.db.posts.findOne({ key: 'id', equals: args.id });
        if (!post) throw new Error('Post is not found');
        return post;
    }
};

export const createPost = {
    type: post,
    args: { data: { type: new GraphQLNonNull(createPostDto)}},
    async resolve(parent: any, args: any, context: any) {
        return await context.db.posts.create(args.data);
    }
};

export const updatePost = {
    type: post,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(updatePostDto)},
    },
    async resolve(parent: any, args: any, context: any) {
        try {
            const { id, data } = args;
            return await context.db.posts.change(id, data);
        } catch (e: any) {
            throw new Error(e.message || e);
        }
    }
};