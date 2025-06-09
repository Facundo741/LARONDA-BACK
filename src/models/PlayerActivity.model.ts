import mongoose from 'mongoose';

const playerActivitySchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  diasActivos: [{ type: String }], 
  contadorIngresos: { type: Number, default: 0 } 
});

const PlayerActivity = mongoose.model('PlayerActivity', playerActivitySchema);

export default PlayerActivity;
