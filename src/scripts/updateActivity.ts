import PlayerActivity from '../models/PlayerActivity.model';
import { fetchLeaderboard } from '../services/AssettoService';

export async function updatePlayerActivity() {
  try {
    const data = await fetchLeaderboard();
    const drivers = data?.ConnectedDrivers || [];
    const today = new Date().toISOString().split('T')[0];

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

    console.log('Actividad actualizada');
  } catch (error) {
    console.error('Error actualizando actividad:', error);
  }
}
