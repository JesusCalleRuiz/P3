export type Cliente = {
    id: string;
    name: string;
    cif: string;
    saldo: number;
    hipotecas : Hipoteca[];
    gestor : Gestor;
  };

  export type Hipoteca = {
    id : string
    monto: number;
    cuota : number;
    cuotasPagadas : number;
    cliente : Cliente;
    gestor : Gestor;
  }

  export type Gestor = {
    id : string;
    name : string;
    cif : string;
    clientes : Cliente[];
  }