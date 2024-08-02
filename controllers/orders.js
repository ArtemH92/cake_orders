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
    }
    

    if (!data.dessert || !data.date || !data.time) {
      return res.status(400).json({ message: "Все поля обязательные" });
    }

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Необходимо загрузить хотя бы одно фото" });
    }

    const uploadFiles = await Promise.all(files.map(file => 
      prisma.uploadFile.create({
        data: {
          filename: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        },
      })
    ));

    const order = await prisma.order.create({
      data: {
        ...data,
        createdById: req.user.id,
        photos: {
          connect: uploadFiles.map(file => ({ id: file.id }))
        },
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
    let newPhotoIds = [];

    if (req.files && req.files.length > 0) {
      const uploadFiles = await Promise.all(req.files.map(file => 
        prisma.uploadFile.create({
          data: {
            filename: file.filename,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
          },
        })
      ));
      newPhotoIds = uploadFiles.map(file => file.id);
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
        photos: {
          connect: newPhotoIds.map(file => ({ id: file.id }))
        },
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
        photos: true, // Включаем информацию о всех фотографиях
      },
    });

    if (!order) {
      return res.status(404).json({ message: 'Заказ не найден' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: `Что-то пошло не так, ${error}` });
  }
};

module.exports = {
  all,
  add,
  remove,
  edit,
  order,
};