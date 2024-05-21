// What is ORM?
// https://www.freecodecamp.org/news/what-is-an-orm-the-meaning-of-object-relational-mapping-database-tools/

// Uses of Prisma CLient
// https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma#:~:text=Prisma%20Client%20can%20be%20used,else%20that%20needs%20a%20database.

// Hot reload is a feature that lets you inject updated source code into a running app. This means that you can see the effects of your code changes almost instantly, without waiting for the app to rebuild or relaunch.

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
