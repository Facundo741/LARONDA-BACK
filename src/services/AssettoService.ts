import axios from 'axios';
import https from 'https';

export async function fetchLeaderboard() {
  const agent = new https.Agent({ rejectUnauthorized: false });
  try {
    const response = await axios.get(
      'https://br.assettohosting.com:10102/api/live-timings/leaderboard.json',
      { httpsAgent: agent }
    );
    return response.data;
  } catch (error) {
    console.log('Servidor Assetto Corsa caído');
    return null; 
  }
}
