import mongoose from "npm:mongoose@7.6.3";
import { Cliente } from "../types.ts";

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    name: { type: String, required: true },
    cif:{ type: String, required: true,unique: true },
    saldo:{type: Number, required: true},
    hipotecas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hipoteca' }],
    gestor: { type: mongoose.Schema.Types.ObjectId, ref: 'Gestor' }
  },
  { timestamps: true }
);

export type clienteModelType = mongoose.Document & Omit<Cliente, "id">;

export default mongoose.model<clienteModelType>("Cliente", clienteSchema);