import { GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { memberType } from '../schemas/memberType-schema';
import { updateMemberTypeDto } from '../DTOs/memberType-dto';

export const getMemberTypes = {
    type: new GraphQLList(memberType),
    async resolve(parent: any, args: any, context: any) {
        return await context.db.memberTypes.findMany();
    },
};

export const getMemberTypeById = {
    type: memberType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    async resolve(parent: any, args: any, context: any) {
        const type = await context.db.memberTypes.findOne({ key: 'id', equals: args.id });
        if (!type) throw new Error('Member type is not found');
        return type;
    }
};

export const updateType = {
    type: memberType,
    args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(updateMemberTypeDto)}
    },
    async resolve(parent: any, args: any, context: any) {
        try {
            const { id, data } = args;
            return await context.db.memberTypes.change(id, data);
        } catch (e: any) {
            throw new Error(e.message || e);
        }
    }
};