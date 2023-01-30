import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { profile } from '../schemas/profile-schema';
import { createProfileDto, updateProfileDto } from '../DTOs/profile-dto';

export const getProfiles = {
    type: new GraphQLList(profile),
    async resolve(parent: any, args: any, context: any) {
        return await context.db.profiles.findMany();
    }
};

export const getProfileById = {
    type: profile,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent: any, args: any, context: any) {
        const profile = await context.db.profiles.findOne({ key: 'id', equals: args.id });
        if (!profile) throw new Error('Profile not found');        
        return profile;
    }
};

export const createProfile = {
    type: profile,
    args: { data: { type: new GraphQLNonNull(createProfileDto) }},
    async resolve(parent: any, args: any, context: any) {
        return await context.db.profiles.create(args.data);
    }
};

export const updateProfile = {
    type: profile,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(updateProfileDto) },
    },
    async resolve(parent: any, args: any, context: any) {
        try {
            const { id, data } = args;
            return await context.db.profiles.change(id, data);
        } catch (e: any) {
            throw new Error(e.message || e);
        }
    }
};