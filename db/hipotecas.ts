import mongoose from "npm:mongoose@7.6.3";
import { Hipoteca } from "../types.ts";

const Schema = mongoose.Schema;

const clienteSchema = new Schema(
  {
    monto: { type: Number, required: true },
    cuota:{ type: Number, required: true },
    cuotasPagadas:{type: Number, required: true },
    cliente:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    gestor: { type: mongoose.Schema.Types.ObjectId, ref: 'Gestor' }
  },
  { timestamps: true }
);

export type clienteModelType = mongoose.Document & Omit<Hipoteca, "id">;

export default mongoose.model<clienteModelType>("Hipoteca", clienteSchema);