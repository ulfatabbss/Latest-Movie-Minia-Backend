const express = require("express");
const { addDrama, getAllDrama, getDrama, updateDrama, deleteDrama } = require("../controllers/DramaController");
const router = express.Router();
const passport = require("../../Middlewear");
//UserRegistration
router.post('/darama', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), addDrama);
router.get('/darama', getAllDrama)
router.get('/darama/:id', getDrama)
router.put('/darama/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), updateDrama)
router.delete('/darama/:id', passport.authenticate("jwt", { session: false }), passport.checkRole("Admin"), deleteDrama)
module.exports = router;