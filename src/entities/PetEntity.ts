
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import EnumPorte from "../enum/EnumPorte";
import AdotanteEntity from "./AdotanteEntity";

@Entity()
export default class PetEntity{
  @PrimaryGeneratedColumn()
  id!:  number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  dataDeNascimento: Date;
  @Column()
  adotado: boolean;
  @Column({nullable: true})
  porte: EnumPorte;
  @ManyToOne(()=> AdotanteEntity, (adotante) => adotante.pets)
  adotante?: AdotanteEntity;


  constructor(
    nome: string,
    especie: EnumEspecie,
    dataDeNascimento: Date,
    adotado: boolean,
    porte: EnumPorte,
    adotante?: AdotanteEntity
  ) {
    this.nome = nome;
    this.especie = especie;
    this.dataDeNascimento = dataDeNascimento;
    this.adotado = adotado;
    this.porte = porte;
    this.adotante = adotante;
  }
  
  
}