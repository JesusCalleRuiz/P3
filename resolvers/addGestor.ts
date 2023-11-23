import { Request, Response } from "npm:express@4.18.2";
import GestorModel from "../db/gestores.ts";

const addGestor = async (req: Request, res: Response) => {
  try {
    const { name, cif } = req.body;
    if (!name || !cif) {
      res.status(400).send("Name and cif are required");
      return;
    }

    const newGestor = new GestorModel({ name, cif });
    await newGestor.save();

    res.status(200).send({
      name: newGestor.name,
      cif: newGestor.cif,
      id: newGestor._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addGestor;