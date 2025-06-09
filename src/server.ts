import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { updatePlayerActivity } from './scripts/updateActivity';

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/LARONDA';

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('✅ MongoDB conectado');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    process.exit(1);
  }
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);

    // Ejecutar la primera actualización al iniciar el servidor
    updatePlayerActivity();

    // Ejecutar actualización cada 60 segundos (60000 ms)
    setInterval(updatePlayerActivity, 60000);
  });
});
