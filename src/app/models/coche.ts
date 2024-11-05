import { Marca } from "./marca";
import { Tipo } from "./tipo";

export interface Coche {
    id: number;
    placa: string;
    puertas: number;
    marca: Marca;
    tipo : Tipo;
}