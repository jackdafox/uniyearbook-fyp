import { prismaMock } from "@/singleton";
import { createUser } from "@/utils/prisma-test/user-nocontext";
import { expect } from '@jest/globals';

test("should create new user ", async () => {
  const user = {
    id: 0,
    email: "hello@prisma.io",
    password: "asdasdasd",
    first_name: "Rich",
    last_name: "Haines",
    profile_picture: null,
    details: null,
    contacts: null
  };

  prismaMock.user.create.mockResolvedValue(user);

  await expect(createUser(user)).resolves.toEqual({
    id: 0,
    email: "hello@prisma.io",
    password: "asdasdasd",
    first_name: "Rich",
    last_name: "Haines",
    profile_picture: null,
    details: null,
    contacts: null
  });
});

