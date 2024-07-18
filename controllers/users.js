const {prisma} = require("../prisma/prisma-client");
const brypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 *
 * @route POST /api/user/login
 * @desc Логин
 * @access Public
 */

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Заполните обязательные поля" });
    }
  
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })
  
    const isPasswordCorrect =
      user && (await brypt.compare(password, user.password));
      const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      });
    } else {
      return res.status(400).json({ message: "Неверно введен логин или пароль" });
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
};
/**
 *
 * @route POST /api/user/register
 * @desc Регистрация
 * @access Public
 */

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    if(!username || !password) {
      return res.status(400).json({message: 'Заполните обязателые поля'})
    }
    
    const registeredUser = await prisma.user.findFirst({
      where: {
        username
      }
    })
  
    if(registeredUser) {
      return res.status(400).json({ message: 'Пользователь, с таким именем уже существует' })
    }
  
    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassord
      }
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Не удалось создать пользователя' })
    }
  } catch {
    res.status(500).json({ message: 'Что-то пошло не так' })
  }
};

/**
 * @route POST /api/orders/remove/:id
 * @desc Удаление заказа
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch {
    res.status(500).json({ message: "Не удалось удалить заказ" });
  }
};

/**
 * 
 * @route GET /api/user/current
 * @desc Текущий пользователь
 * @access Private
 */

const current = async (req, res) => {
  return res.status(200).json(req.user)
};

module.exports = {
  login,
  register,
  remove,
  current,
};
