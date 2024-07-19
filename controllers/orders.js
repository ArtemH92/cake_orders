const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/orders
 * @desc Получение всех заказов
 * @access Private
 */
const all = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch {
    res.status(500).json({ message: "Не удалось получить заказы" });
  }
};

/**
 * @route POST /api/orders/add
 * @desc Добавление заказа
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.dessert || !data.date || !data.time) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const order = await prisma.order.create({
      data: {
        ...data,
        createdById: req.user.id,
      },
    });

    return res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    await prisma.order.delete({
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
 * @route PUT /api/orders/edit/:id
 * @desc Редактирование заказа
 * @access Private
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = data.id;

  try {
    await prisma.order.update({
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
 * @route GET /api/orders/:id
 * @desc Получение заказа
 * @access Private
 */
const order = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json(order);
  } catch(err) {
    res.status(500).json({ message: "Не удалось получить заказ" });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  order,
};