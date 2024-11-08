import {Router, Request, Response} from "express";
import PetController from "../controller/PetController";
import PetRepository from "../repositories/PetRepository";
import { AppDataSource } from "../config/DataSource";

const router = Router();
const petRepository = new PetRepository(
    AppDataSource.getRepository("PetEntity"), 
    AppDataSource.getRepository("AdotanteEntity")
  )

const petConotroller = new PetController(petRepository);

router.post('/', (req: Request, res: Response)=>petConotroller.criaPet(req, res));
router.get('/', (req: Request, res: Response)=>petConotroller.listaPets(req, res));
router.get('/filtroPorte/', (req: Request, res: Response)=>petConotroller.listaPets(req, res));

router.put('/:id', (req: Request, res: Response)=>petConotroller.atualizaPet(req, res));
router.delete('/:id', (req: Request, res: Response)=>petConotroller.deletaPet(req, res));
router.put('/adotaPet/:pet_id/:adotante_id/', (req: Request, res: Response)=>petConotroller.adotaPet(req, res));

export default router;