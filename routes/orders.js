const express = require('express');
const router = express.Router();
const { add, edit, remove, all, order } = require("../controllers/orders");
const { auth } = require('../middleware/auth');
const upload  = require('../middleware/upload');

router.get("/", auth, all);
router.get("/:id", auth, order);
router.post("/add", auth, upload.array('photos', 5), add);
router.put("/edit/:id", auth, upload.array('photos', 5), edit);
router.post("/remove/:id", auth, remove);

module.exports = router;