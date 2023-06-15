const express = require("express");
const { addDrama, getAllDrama, getDrama, updateDrama, deleteDrama } = require("../controllers/DramaController");
const router = express.Router();
//UserRegistration
router.post('/darama', addDrama);
router.get('/darama', getAllDrama)
router.get('/darama/:id', getDrama)
router.put('/movies/:id', updateDrama)
router.delete('/darama/:id', deleteDrama)

module.exports = router;