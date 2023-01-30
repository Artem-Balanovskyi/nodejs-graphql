# Task No.5 - GraphQL

## Installation

1. `git clone https://github.com/Artem-Balanovskyi/nodejs-graphql.git`
2. `git checkout develop`
3. `npm install`

## Launching

    `npm run start` to start the app.
    The app will be available at http://localhost:3000 for rest API and http://localhost:3000/graphql for graphQL
    
    Note: There is `addExamplesToDB.ts` file in utils and it's creating users, post, profiles automatically 
    for more easier checking. If you don't need it, just open `app.ts` file and comment lines 5 and 14.

## Other Scripts

    npm run check-integrity: Runs the check-integrity.js script.
    npm run test: Runs the tests for the project.
    npm run build:ts: Compiles TypeScript files.
    npm run watch:ts: Compiles TypeScript files in watch mode.
    npm run dev: Runs the TypeScript compiler in watch mode and starts the app.
    npm run dev:start: Starts the app in watch mode.

# Use Postman collection for testing GraphQL requests!

You will find postman collection file `NodeJS-GraphQL.postman_collection.json` in root folder.

It contains all queries for the task, just import it and use.


2.11. & 2.17. All create/update DTOs are using InputObjectType!
