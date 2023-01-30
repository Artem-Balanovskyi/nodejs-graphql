import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { user } from '../schemas/user-schema';
import { createUserDto, updateUserDto, subscriptionDto } from '../DTOs/user-dto';

export const getUsers = {
    type: new GraphQLList(user),
    async resolve(parent: any, args: any, context: any) {
        return await context.db.users.findMany();
    }
};

export const getUserById = {
    type: user,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent: any, args: any, context: any) {
        const user = await context.db.users.findOne({ key: 'id', equals: args.id });
        if (!user) throw new Error('User is not found');
        return user;
    }
};

export const createUser = {
    type: user,
    args: { data: {type: new GraphQLNonNull(createUserDto)} ,    },
    async resolve(parent: any, args: any, context: any) {
        return await context.db.users.create(args.data);
    },
};

export const updateUser = {
    type: user,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(updateUserDto) },
    },
    async resolve(parent: any, args: any, context: any) {
        try {
            const { id, data } = args;
            return await context.db.users.change(id, data);
        } catch (err: any) {
            throw new Error(err.message || err);
        }
    },
};

export const subscribeToUser = {
    type: user,
    args: { data: { type: new GraphQLNonNull(subscriptionDto) }},
    async resolve(parent: any, args: any, context: any) {
        const { id, userId } = args.data;
        const user = await context.db.users.findOne({ key: 'id', equals: id });
        if (!user) {
            throw new Error('User is not found');
        } else {
            const secondUser = await context.db.users.findOne({ key: 'id', equals: userId });
            if (!secondUser) {
                throw new Error('User is not found');
            } else {
                if (secondUser.subscribedToUserIds.includes(id)) {
                    throw new Error(`Already subscribed`);
                } else {
                    return await context.db.users.change(userId, {
                        subscribedToUserIds: [...secondUser.subscribedToUserIds, id],
                    });
                }
            }
        }
    },
};

export const unsubscribeFromUser = {
    type: user,
    args: { data: { type: new GraphQLNonNull(subscriptionDto)}},
    async resolve(parent: any, args: any, context: any) {
        const { id, userId } = args.data;
        const user = await context.db.users.findOne({ key: 'id', equals: id });
        if (!user) {
            throw new Error('User is not found');
        } else {
            const secondUser = await context.db.users.findOne({
                key: 'id',
                equals: userId,
            });
            if (!secondUser) {
                throw new Error('User is not found');
            } else {
                const userIndex = secondUser.subscribedToUserIds.indexOf(id);
                if (userIndex < 0) {
                    throw new Error(`User is not subscribed`);
                } else {
                    secondUser.subscribedToUserIds.splice(userIndex, 1);
                    return await context.db.users.change(userId, {
                        subscribedToUserIds: secondUser.subscribedToUserIds,
                    });
                }
            }
        }
    }
};