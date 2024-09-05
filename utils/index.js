const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const user = require('../config');

const prisma = new PrismaClient();

let isDefaultUserCreated = false;

function createDefaultUser() {
  return async (req, res, next) => {
    if (isDefaultUserCreated) {
      return next();
    }

    try {
      const existingUser = await prisma.user.findUnique({
        where: { username: process.env.SUPER_USER_NAME },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(process.env.SUPER_USER_PASSWORD, 10);
        await prisma.user.create({
          data: {
            username: process.env.SUPER_USER_NAME,
            password: hashedPassword,
            administrator: true,
          },
        });
        console.log('Default user created successfully');
      } else {
        console.log('Default user already exists');
      }

      isDefaultUserCreated = true;
    } catch (error) {
      console.error('Error creating default user:', error);
    }

    next();
  };
}

module.exports = createDefaultUser;