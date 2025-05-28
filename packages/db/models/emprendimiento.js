import mongoose from 'mongoose';

const emprendeimientoSchema = new mongoose.Schema({

  userNumber:       { type: Number}, // CODIGO DE USUARIO ASOCIADO
  name:             { type: String, required: [true, "Please enter a name"] }, // NOMBRE DE LA EMPRESA
  instagram:        { type: String, required: [true, "Please enter a last name"] }, // INSTAGRAM DE LA EMPRESA
  pagweb:           { type: String, required: [true, "Please enter an pagweb"] }, // PAGINA WEB DE LA EMPRESA
  actvivity:        { type: String, required: [true, "Please enter you actvivity"] }, // ACTIVIDAD DE LA EMPRESA
  time:             { type: String, required: [true, "Please enter a time"] }, // TIEMPO DE LA EMPRESA
  challenge:        { type: String, required: [true, "Please enter a time"] },  // DESAFIO QUE ENFRENTA LA EMPRESA "LO QUE NECESITAS BUSCAR"

});

export const EmprendeModel = mongoose.models.Emprendimiento || mongoose.model('Emprendimiento', emprendeimientoSchema);