import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/clientes.ts";

const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await ClientModel.findOneAndDelete({ _id: id }).exec();
    if (!client) {
      res.status(404).send("Client not found");
      return;
    }
    res.status(200).send("Client deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteClient;