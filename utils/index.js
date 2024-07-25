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
        where: { username: user.username },
      });

      if (!existingUser) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.create({
          data: {
            username: user.username,
            password: hashedPassword,
            administrator: user.administrator,
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