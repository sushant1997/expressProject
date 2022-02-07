const express = require('express')
const router = express.Router();
const users = require('../controllers/controller.js')


router.get('/',users.list)
router.post('/',users.create)
router.put('/:id',users.update)
router.delete('/:id', users.deleteUsers)
router.get('/:id',users.getSingleUser)

module.exports = router