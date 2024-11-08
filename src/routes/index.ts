import express from "express";
import petRouter from '../routes/petRouter'
import adotanteRouter from '../routes/adotanteRoute'

const router = express.Router();

router.use("/pets/", petRouter)
router.use("/adotante/", adotanteRouter)

export default router;