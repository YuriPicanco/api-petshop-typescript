import {Request, Response} from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet";


export default class PetController{
  constructor(private repository: PetRepository){
  }

  async listaPets(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>){
      const listaPet = await this.repository.listaPet();

      const data = listaPet.map((pet)=>{
        return {
          id:pet.id,
          nome:pet.nome,
          especie:pet.especie,
          porte:pet.porte
        }
      })

      return res.status(201).json({data})
  }
  async criaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>){
    const {nome, especie, dataDeNascimento, adotado, porte} = <PetEntity> req.body;

    if(!Object.values(EnumEspecie).includes(especie)){
      return res.status(404).json({error: "Espécie inválida"});
    }

    if(porte && !(porte in EnumPorte)){
      return res.status(404).json({error: "Porte do pet inválido"});
    }

    var novoPet =  new PetEntity(nome, especie, dataDeNascimento, adotado, porte);

    await this.repository.criaPet(novoPet);
    
    return res.status(201).json({data:{id: novoPet.id, nome, especie, porte}});

  }
  async atualizaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>){
    const {id} = req.params;
    const listaDePets = await this.repository.listaPet();
    const {sucess, message} = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity
    )
    const {adotado, especie, dataDeNascimento, nome} = <PetEntity> req.body;
    const pet = listaDePets.find(((pet)=> pet.id === Number(id)))
    if(!pet){
      return res.status(404).json({error: message})
    }
    pet.nome = nome;
    pet.adotado =adotado;
    pet.dataDeNascimento = dataDeNascimento;
    pet.especie = especie;

    return res.status(200).json({data:pet})
  }
  async deletaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response){
    const {id} = req.params;
    const listaDePets = await this.repository.listaPet();
    const pet = listaDePets.find((pet)=>pet.id===Number(id))

    if(!pet){
      return res.status(404).json({error: "Pet não encontrado"})
    }

    const index = listaDePets.indexOf(pet)
    listaDePets.splice(index, 1);
    return res.status(200).json({mensage: "Pet deletado com sucesso"});
  }
  async adotaPet(req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>, res: Response<TipoResponseBodyPet>){
    const {pet_id, adotante_id} = req.params;

    const {sucess, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(adotante_id)
    )

    if(!sucess){
      return res.status(404).json({error:message})
    }

    res.status(201).json({})
  }
  async buscaPorCampoGenerico(req: Request, res: Response){
      const { campo, valor } = req.query;

      const listaDePets = await this.repository.buscaPorCampoGenerico(campo as keyof PetEntity, valor as string);

      return res.status(201).json({...listaDePets})
  }
}