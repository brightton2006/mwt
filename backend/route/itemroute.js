const express = require('express');
const router = express.Router();
const { FetchAll, createItem, getItemById, Update, Delete } = require('../controller/itemcontroller');
router.route('/')
.get(FetchAll)
.post(createItem);
router.route('/:id')
.get(getItemById)
.put(Update)
.delete(Delete);
module.exports=router;