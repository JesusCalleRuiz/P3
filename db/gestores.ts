import mongoose from "npm:mongoose@7.6.3";
import { Gestor } from "../types.ts";

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    name: { type: String, required: true },
    cif:{ type: String, required: true,unique: true },
    clientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }]

  },
  { timestamps: true }
);

export type clienteModelType = mongoose.Document & Omit<Gestor, "id">;

export default mongoose.model<clienteModelType>("Gestor", clienteSchema);