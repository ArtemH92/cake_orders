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
    const { username, password, phone, administrator } = req.body;
    
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
        password: hashedPassord,
        phone,
        administrator
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
  } catch(err) {
    res.status(500).json({ message: 'Что-то пошло не так' + err })
  }
};

/**
 * @route GET /api/users/:id
 * @desc Пользователя заказа
 * @access Private
 */
const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(user);
  } catch {
    res.status(500).json({ message: "Не удалось получить заказ" });
  }
};

/**
 * @route GET /api/user/
 * @desc Получить всех пользователей
 * @access Private
 */
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Не удалось получить пользователей" });
  }
};

/**
 * @route PUT /api/users/edit/:id
 * @desc Редактирование пользователя
 * @access Private
 */

const editUser = async (req, res) => {
  const data = req.body;
  const id = data.id;

  if (!id) {
    return res.status(400).json({ message: "ID пользователя не указан" });
  }

  try {
    await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json("OK");
  } catch(err) {
    res.status(500).json({ message: "Не удалось редактировать заказ" });
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

/**
 * @route DELETE /api/users/current/:id
 * @desc Удалить пользователя
 * @access Private
 */
const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    await prisma.user.delete({
      where: {
        id,
      },
    });

    res.status(204).json({ message: "Пользователь успешно удален" });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении пользователя" });
  }
};

module.exports = {
  login,
  register,
  current,
  getUser,
  getUsers,
  editUser,
  deleteUser
};
