import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import deleteClient from "./resolvers/deleteClient.ts";
import addClients from "./resolvers/addClients.ts";
import sendMoney from "./resolvers/sendMoney.ts";
import addMoney from "./resolvers/addMoney.ts";
import addHipoteca from "./resolvers/addHipoteca.ts";
import addGestor from "./resolvers/addGestor.ts";
import gestorToClient from "./resolvers/gestorToClient.ts";
import amortizarHipoteca from "./resolvers/amortizarHipoteca.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();
 
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.log("No mongo URL found");
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app

  .post("/client", addClients)
  .post("/gestor", addGestor)
  .post("/hipoteca", addHipoteca)
  .delete("/client/:id", deleteClient)
  .put("/client/:idClient1/:idClient2/:dinero",sendMoney)
  .put("/client/:id/:dinero",addMoney)
  .put("/gestor/:gestorId/:clienteId",gestorToClient)
  .put("/hipoteca/:clienteId/:hipotecaId",amortizarHipoteca)
 

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
