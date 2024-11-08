import EnumEspecie from "../enum/EnumEspecie";
import PetEntity from "../entities/PetEntity";

// type TipoPet ={
//   id:number;
//   nome:string;
//   especie:EnumEspecie;
//   adotado:boolean;
//   dataDeNascimento:Date;
// }

type TipoRequestBodyPet = Omit<PetEntity, "id">;

type TipoRequestParamsPet = {id?: string, pet_id?:string, adotante_id?:string};

type TipoResponseBodyPet = {
  data?: 
  | Pick<PetEntity, "id" | "nome" | "porte" | "especie">
  | Pick<PetEntity, "id" | "nome" | "porte" | "especie">[];

  error?: unknown;
}

export  {TipoRequestBodyPet, TipoResponseBodyPet, TipoRequestParamsPet}