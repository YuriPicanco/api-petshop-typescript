import {DataSource} from 'typeorm';
import PetEntity from '../entities/PetEntity';
import AdotanteEntity from '../entities/AdotanteEntity';
import EnderecoEntity from '../entities/EnderecoEntity';

export const AppDataSource = new DataSource(
  {
  type:"sqlite",
  database:"./src/config/database.sqlite",
  entities:[PetEntity, AdotanteEntity, EnderecoEntity],
  // entities:[__dirname + "../**/*.entity{.ts,.js}"],
  synchronize:true
})

// export const AppDataSourceAdotante = new DataSource({
//   type:"sqlite",
//   database:"./src/config/database.sqlite",
//   entities:[AdotanteEntity],
//   // entities:[__dirname + "../**/*.entity{.ts,.js}"],
//   synchronize:true
// })