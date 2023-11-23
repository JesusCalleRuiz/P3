endpoints:

# /client (POST)
  crear cliente
  
# /gestor (POST)
  crear gestor
  
# /hipoteca (POST)
  crear hipoteca
  
# /client/:id (DELETE)
  eliminar cliente a partir de su id
  
# /client/:idClient1/:idClient2/:dinero (PUT)
  enviar dinero desde cliente1 a cliente2
  
# /client/:id/:dinero (PUT)
  ingresar dinero al cliente con su id
  
# /gestor/:gestorId/:clienteId (PUT)
  asignar un gestor a un cliente 

# /hipoteca/:clienteId/:hipotecaId (PUT)
  amoritzar una cuota de la hipoteca de un cliente
