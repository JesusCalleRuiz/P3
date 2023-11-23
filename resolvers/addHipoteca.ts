import { Request, Response } from "npm:express@4.18.2";
import HipotecaModel from "../db/hipotecas.ts";

const addHipoteca = async (req: Request, res: Response) => {
  try {
    const { monto, cuota} = req.body;
    if (!monto || !cuota ) {
      res.status(400).send("monto y cuota are required");
      return;
    }

    const newHipoteca = new HipotecaModel({ monto, cuota });
    await newHipoteca.save();

    res.status(200).send({
      monto: newHipoteca.monto,
      cuota: newHipoteca.cuota,
      cuotasPagadas : 0,
      id: newHipoteca._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addHipoteca;