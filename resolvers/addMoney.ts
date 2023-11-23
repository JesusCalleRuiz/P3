import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/clientes.ts";

const addMoney = async (req: Request, res: Response) => {
  try {
    const { id,dinero} = req.params;
    if (!id || !dinero) {
      res.status(400).send("id and dinero are required");
      return;
    }

    const amount = parseFloat(dinero);
    if (isNaN(amount) || amount <= 0) {
      res.status(400).send("Invalid amount");
      return;
    }

    const Client1 = await ClientModel.findById(id);

    if (!Client1) {
      res.status(404).send("Client not found");
      return;
    }

    await ClientModel.updateOne(
      { _id: id },
      { saldo: +amount }
    );

    res.status(200).send({
        name: Client1.name,
        saldo: Client1.saldo,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export default addMoney;