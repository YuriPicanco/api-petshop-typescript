  import {Router, Request, Response} from "express";
  import AdotanteController from "../controller/AdotanteController";
  import AdotanteRepository from "../repositories/AdotanteRepository"
  import { AppDataSource } from "../config/DataSource";

  const router = Router();
  const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("AdotanteEntity"));
  const adotanteController = new AdotanteController(adotanteRepository);

  router.post('/', (req: Request, res: Response)=>adotanteController.criaAdotante(req, res));
  router.get('/', (req: Request, res: Response)=>adotanteController.listaAdotante(req, res));

  export default router;