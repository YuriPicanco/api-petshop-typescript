import { Repository } from 'typeorm';
import AdotanteEntity from '../entities/AdotanteEntity';
import InterfaceAdotanteRepository from './interfaces/InterfaceAdotanteRepository';
import EnderecoEntity from '../entities/EnderecoEntity';



export default class AdotanteRepository implements InterfaceAdotanteRepository{
  constructor(private repository: Repository<AdotanteEntity>){};

  async criaAdotante(novoAdotante: AdotanteEntity): Promise<AdotanteEntity>{
      return await this.repository.save(novoAdotante);
  };

  async listaAdotante(): Promise<AdotanteEntity[]>{
    return await this.repository.find();
  }
  
  async atualizaAdotante(id: number, newDataAdotante: AdotanteEntity): Promise<{sucess: boolean, message?: string}>{
    try{
      const adotanteToUpdate = await this.repository.findOne({where:{id}})

      if(!adotanteToUpdate){
        return {sucess: false, message: "Adotante não encontrado"}
      }
      
      Object.assign(adotanteToUpdate, newDataAdotante);

      await this.repository.save(adotanteToUpdate);

      return {sucess: true}
    }catch(error){
      console.log(error);
      return {sucess: false, message: "Erro interno do servidor"}
    }

  }

  async deletaAdotante(id: number): Promise<{sucess: boolean, message?: string}>{
    try{

      const adotanteToDelete = await this.repository.findOne({where:{id}});
  
      if(!adotanteToDelete) return {sucess: false, message: 'Adotante não encontrado'}
  
      await this.repository.remove(adotanteToDelete);

      return {sucess: true}
    }catch(err){
      console.log(err);
      return {sucess: false, message: "Erro interno do servidor"};
    }
  }
  
  async atualizaEnderecoAdotante(id: number, endereco: EnderecoEntity): Promise<{sucess: boolean, message?: string}>{
    try{
      const adotante = await this.repository.findOne({where:{id}});
      
      if(!adotante) return {sucess: false, message: "Adotante não encontrado"}
      
      const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
      adotante.endereco = novoEndereco;
      
      await this.repository.save(adotante)

      return {sucess: true}
    }catch(err){
      console.log(err);
      return {sucess: false, message: "Erro interno do servidor"}

    }
    
  }
}