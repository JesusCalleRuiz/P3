import { Request, Response } from "npm:express@4.18.2";
import ClientModel from "../db/clientes.ts";

const sendMoney = async (req: Request, res: Response) => {
  try {
    const { idClient1, idClient2,dinero} = req.body;
    if (!idClient1 || !idClient2 || dinero) {
      res.status(400).send("id1, id2 and dinero are required");
      return;
    }

    const amount = parseFloat(dinero);
    if (isNaN(amount) || amount <= 0) {
      res.status(400).send("Invalid amount");
      return;
    }

    const Client1 = await ClientModel.findById(idClient1);
    const Client2 = await ClientModel.findById(idClient2);

    if (!Client1 || !Client2) {
      res.status(404).send("Clients not found");
      return;
    }

    await ClientModel.updateOne(
      { _id: idClient1 },
      { saldo: -amount }
    );

    await ClientModel.updateOne(
      { _id: idClient2 },
      {  saldo: +amount }
    );

    const updatedClient1 = await ClientModel.findById(idClient1);
    const updatedClient2 = await ClientModel.findById(idClient2);

    res.status(200).send({
      idClient1: {
        name: idClient1.name,
        saldo: updatedClient1.saldo,
      },
      idClient2: {
        name: idClient2.name,
        saldo: updatedClient2.saldo,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export default sendMoney;