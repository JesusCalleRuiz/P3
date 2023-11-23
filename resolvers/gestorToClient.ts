import { Request, Response } from "npm:express@4.18.2";
import ClienteModel from '../db/clientes.ts';
import GestorModel from '../db/gestores.ts';

const gestorToClient = async (req: Request, res: Response) => {
  try {
    const { gestorId, clienteId } = req.params;

    const gestor = await GestorModel.findById(gestorId);
    const cliente = await ClienteModel.findById(clienteId);

    if (!gestor || !cliente) {
      res.status(404).send("Gestor or client not found");
      return;
    }

    gestor.clientes.push(clienteId);
    await gestor.save();

    cliente.gestor = gestorId;
    await cliente.save();

    res.status(200).send({
      gestor,
      cliente,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default gestorToClient;