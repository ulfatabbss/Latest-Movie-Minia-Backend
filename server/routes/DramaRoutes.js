const express = require("express");
const { addDrama, getAllDrama, getDrama, updateDrama, deleteDrama } = require("../controllers/DramaController");
const router = express.Router();
const authMiddleware = require("../../authMiddleware");
//UserRegistration
router.post('/darama', authMiddleware.authenticateToken, addDrama);
router.get('/darama', getAllDrama)
router.get('/darama/:id', getDrama)
router.put('/darama/:id', authMiddleware.authenticateToken, updateDrama)
router.delete('/darama/:id', authMiddleware.authenticateToken, deleteDrama)
module.exports = router;