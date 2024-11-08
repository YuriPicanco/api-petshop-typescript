import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAdotanteRepository{
    criaAdotante(adotante: AdotanteEntity): void;

    listaAdotante(): AdotanteEntity[] | Promise<AdotanteEntity[]>;

    atualizaAdotante(
        id: number, 
        adotante: AdotanteEntity
    ): Promise<{sucess: boolean, message?: string}> | void;

    deletaAdotante(    
        id: number, adotante: AdotanteEntity
    ): Promise<{sucess: boolean, message?: string}> | void;
    
    atualizaEnderecoAdotante(
        id: number, endereco: EnderecoEntity
    ): Promise<{sucess: boolean, message?: string}> | void;
}