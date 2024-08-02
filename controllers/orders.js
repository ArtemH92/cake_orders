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
    const { dessert, cakeType, cupcakesType, filling, quantity, date, time, status, createdById, photoId } = req.body;
    const numericQuantity = quantity === "null" || quantity === "" ? null : parseFloat(quantity);
    const isoDate = new Date(date).toISOString();
    const isoTime = new Date(time).toISOString();
    const data = {
        dessert,
        cakeType,
        cupcakesType,
        filling,
        quantity: numericQuantity,
        date: isoDate,
        time: isoTime,
        status,
        createdById,
        photoId,
    }
    const file = req.file;

    if (!data.dessert || !data.date || !data.time) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const uploadFile = await prisma.uploadFile.create({
      data: {
        filename: file.filename,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size,
      },
    });

    const order = await prisma.order.create({
      data: {
        ...data,
        createdById: req.user.id,
        photoId: uploadFile.id,
      },
    });

    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Что-то пошло не так ${err}` });
  }
};

/**
 * @route POST /api/orders/remove/:id
 * @desc Удаление заказа
 * @access Private
 */
const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.order.delete({
      where: {
        id,
      },
    });

    res.status(204).json("OK");
  } catch(err) {
    res.status(500).json(err.message);
  }
};

/**
 * @route PUT /api/orders/edit/:id
 * @desc Редактирование заказа
 * @access Private
 */
const edit = async (req, res) => {
  const { id } = req.params;
  const { dessert, cakeType, cupcakesType, filling, quantity, date, time, status, notes } = req.body;

  try {
    let photoId = null;

    if (req.file) {
      const { filename, path, mimetype, size } = req.file;

      const uploadFile = await prisma.uploadFile.create({
        data: {
          filename,
          path,
          mimetype,
          size,
        },
      });

      photoId = uploadFile.id;
    }

    const isoDate = new Date(date).toISOString();
    const isoTime = new Date(time).toISOString();

    const numericQuantity = quantity === "null" || quantity === "" ? null : parseFloat(quantity);
    const parsedNotes = notes === "null" ? null : notes;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        dessert,
        cakeType,
        cupcakesType,
        filling,
        quantity: numericQuantity,
        date: isoDate,
        time: isoTime,
        status,
        notes: parsedNotes,
        photoId,
      },
    });

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: `Server error ${error}` } );
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
      where: { id },
      include: {
        photo: true, // Включаем информацию о фото
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  order,
};