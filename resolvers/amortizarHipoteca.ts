import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from '../db/clientes.ts';
import HipotecaModel from '../db/hipotecas.ts';

const amortizarHipoteca = async (req: Request, res: Response) => {
  try {
    const { clienteId, hipotecaId } = req.params;

    const cliente = await ClienteModel.findById(clienteId);
    const hipoteca = await HipotecaModel.findById(hipotecaId);

    if (!cliente || !hipoteca) {
      res.status(404).send("Cliente or hipoteca not found");
      return;
    }

    if (hipoteca.cuota >= 20) {
      res.status(400).send("Hipoteca amortizada");
      return;
    }

    if (cliente.saldo < hipoteca.cuota) {
      res.status(400).send("Insufficient saldo");
      return;
    }

    if (hipoteca.monto > 1000000) {
      res.status(400).send("Client can not have hipoteca");
      return;
    }

    hipoteca.cuotasPagadas += 1;
    cliente.saldo -= hipoteca.cuota;

    await hipoteca.save();
    await cliente.save();

    res.status(200).send({
      cliente,
      hipoteca,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default amortizarHipoteca;