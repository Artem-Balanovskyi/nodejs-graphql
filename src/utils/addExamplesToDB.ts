import DB from './DB/DB';

export const addExamplesToDB = async (db: DB) => {

    const firstUser = await db.users.create({ firstName: 'First', lastName: 'User', email: 'firstUser@mail.com' });
    await db.profiles.create({
        avatar: 'firstUser.jpeg',
        sex: 'male',
        birthday: 1,
        country: 'First country',
        street: 'First street',
        city: 'First city',
        memberTypeId: 'basic',
        userId: firstUser.id,
    });
    await db.posts.create({ title: 'firstUser Post 1 title', content: 'firstUser Post 1 content', userId: firstUser.id });

    const secondUser = await db.users.create({ firstName: 'Second', lastName: 'User', email: 'secondUser@mail.com' });
    await db.profiles.create({
        avatar: 'secondUser.jpg',
        sex: 'male',
        birthday: 2,
        country: 'Second country',
        street: 'Second street',
        city: 'Second city',
        memberTypeId: 'business',
        userId: secondUser.id,
    });
    await db.posts.create({ title: 'secondUser Post 1 title', content: 'secondUser Post 1 content', userId: secondUser.id });
    await db.posts.create({ title: 'secondUser Post 2 title', content: 'secondUser Post 2 content', userId: secondUser.id });

    const thirdUser = await db.users.create({ firstName: 'Third', lastName: 'User', email: 'thirdUser@mail.com' });
    

    await db.users.change(firstUser.id, {
        subscribedToUserIds: [thirdUser.id],
    });
    await db.users.change(secondUser.id, {
        subscribedToUserIds: [firstUser.id, thirdUser.id],
    });
    await db.users.change(thirdUser.id, {
        subscribedToUserIds: [secondUser.id],
    });

};
