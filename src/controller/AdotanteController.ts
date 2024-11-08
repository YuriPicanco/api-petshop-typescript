import {Request, Response } from "express";
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import { TipoRequestBodyAdotante, TipoResponseBodyAdotante, TipoRequestParamsAdotante } from "../tipos/tipoAdotante";
import EnderecoEntity from "../entities/EnderecoEntity";
import * as yup from "yup";

const adotanteBodyValidator:yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">>=yup.object({
nome:yup.string().required(),
celular:yup.number().required(),
senha:yup.string().defined().min(6),
foto:yup.string().optional(),

})

export default class AdotanteController{
  constructor(private repository: AdotanteRepository){

  }

  async criaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>){
    const {nome, senha, celular, foto, endereco} = <AdotanteEntity> req.body;

    let bodyValidated:TipoRequestBodyAdotante
    var novoAdotante = new AdotanteEntity(nome, senha, celular, foto, endereco);

    await this.repository.criaAdotante(novoAdotante);

    try{
      bodyValidated = await adotanteBodyValidator.validate(req.body)
    }catch(error){
      const yupErrors = error as yup.ValidationError
      return res.status(400).json({error: yupErrors.message})
    }

    return res.status(210).json({data: {id: novoAdotante.id, nome, celular}})
  }

  async atualizaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>){
    const {id} = req.params
    const newAdotante = req.body as AdotanteEntity

    const {sucess, message} = await this.repository.atualizaAdotante(Number(id), newAdotante)

    if(!sucess) return res.status(404).json({error: message})

    return res.status(204).json({})

  }

  async atualizaEnderecoAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>){
    const {id} = req.params
    const newEnderecoAdotante = req.body.endereco as EnderecoEntity

    const {sucess, message} = await this.repository.atualizaEnderecoAdotante(Number(id), newEnderecoAdotante)

    if(!sucess) return res.status(404).json({error: message})

    return res.status(204).json({})

  }

  async listaAdotante(req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>, res: Response<TipoResponseBodyAdotante>){
    const listaAdotante = await this.repository.listaAdotante();

    const data = listaAdotante.map((adotante)=>{
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular
      }
    });
    return res.status(201).json({data})
  }

  async deletaAdotante(req: Request<TipoRequestParamsAdotante, {}, {}>, res: Response){
    const {id} = req.params
    try{
     const {sucess, message} = await this.repository.deletaAdotante(Number(id));

     if(!sucess) return res.status(404).json({error: message})
    }catch{ 
      return res.status(400)
    }

  }
}