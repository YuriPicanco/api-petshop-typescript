import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetRepository implements InterfacePetRepository{
  private petRepository: Repository<PetEntity>
  private adotanteRepository: Repository<AdotanteEntity>

  constructor(
    petRepository: Repository<PetEntity>, 
    adotanteRepository: Repository<AdotanteEntity>
  ){
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository
  }
  async criaPet(pet: PetEntity): Promise<void>{
    await this.petRepository.save(pet)
  }
  async listaPet(): Promise<PetEntity[]>{
    return await this.petRepository.find()
  }
  async atualizaPet(id: number, newDataPet: PetEntity): Promise<{sucess: boolean; message?: string}>{
    try{
      const petToUpdate = await this.petRepository.findOne({where: {id}})

      if(!petToUpdate){
        return {sucess: false, message: "Pet não encontrado"};
      }

      Object.assign(petToUpdate, newDataPet);

      await this.petRepository.save(petToUpdate)

      return {sucess: true};
    }catch(error){
      console.log(error)
      return {sucess: false, message: "Erro interno do servidor"}
    }
  }
  async deletaPet(id: number, pet: PetEntity): Promise<{sucess:boolean, message?: string}>{
    try{

      const petToRemove = await this.petRepository.findOne({where:{id}})
      
      if(!petToRemove){
        return {sucess: false, message: "Pet não encontrado"}
      }

      await this.petRepository.remove(petToRemove);

      return {sucess: true, message: "Pet excluído com sucesso"}
    }catch(error){
      return {sucess: false, message: "Erro interno do servidor"}
    }
  }
  async adotaPet(pet_id: number, adotante_id: number): Promise<{sucess: boolean, message: string}>{

    const adotante = await this.adotanteRepository.findOne({where:{id:adotante_id}});
    if(!adotante) return {sucess: false, message: "Adotante não encontrando"}

    const pet = await this.petRepository.findOne({where:{id:pet_id}});
    if(!pet) return {sucess: false, message: "Pet não encontrando"}

    pet.adotante = adotante;
    pet.adotado = true;
    
    await this.petRepository.save(pet);
    return {sucess: true, message: ''}
  }
  async buscaPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo, 
    valor: PetEntity[Tipo]
  ): Promise<PetEntity[]>{
    return await this.petRepository.find({where:{[campo]:valor}})
  }

}