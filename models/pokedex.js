import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const notaSchema = new Schema({
    numdex: String,
    nombre: {type: String, required: [true, 'Nombre obligatorio']},
    tipo: String,
    debilidad: String,
    region: String,
    legendario: String,
    activo: {type: Boolean, default: true}
});

// Convertir a modelo
const pkdx = mongoose.model('pkdx', notaSchema);

export default pkdx;