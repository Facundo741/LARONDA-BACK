import axios from 'axios';
import https from 'https';
import PlayerActivity from '../models/PlayerActivity.model';
import { connectDB } from '../utils/db';

function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

async function updateActivityFromAPI() {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });

    const response = await axios.get(
      'https://br.assettohosting.com:10102/api/live-timings/leaderboard.json',
      { httpsAgent: agent }
    );

    const drivers = response.data?.ConnectedDrivers;
    if (!drivers || drivers.length === 0) {
      console.log('No hay jugadores conectados.');
      return;
    }

    const today = getTodayString();

    for (const driver of drivers) {
      const nombre = driver.CarInfo.DriverName;

      const player = await PlayerActivity.findOne({ nombre });

      if (player) {
        if (!player.diasActivos.includes(today)) {
          player.diasActivos.push(today);
          await player.save();
        }
      } else {
        await PlayerActivity.create({ nombre, diasActivos: [today] });
      }
    }

    console.log(`[${new Date().toLocaleTimeString()}] Jugadores actualizados (${drivers.length})`);
  } catch (error: any) {
    console.error('❌ Error al obtener jugadores:', error.message);
  }
}

// ⏱️ Conectar primero y después correr el cronjob
(async () => {
  await connectDB(); // esperar conexión
  await updateActivityFromAPI();
  setInterval(updateActivityFromAPI, 25000);
})();
