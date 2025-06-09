// src/controllers/LeaderBoard.controller.ts
import { Request, Response } from 'express';
import PlayerActivity from '../models/PlayerActivity.model';

export async function getWeeklyActivity(req: Request, res: Response) {
  try {
    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo 🏁'];
    const hoy = new Date();

    const diaSemana = hoy.getDay();
    const diffLunes = diaSemana === 0 ? -6 : 1 - diaSemana;

    const semanaActual: string[] = [];
    for (let i = 0; i < 7; i++) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() + diffLunes + i);
      semanaActual.push(dia.toISOString().split('T')[0]);
    }

    const players = await PlayerActivity.find();

    const resultado = players.map(p => {
      const actividad = semanaActual.map(fecha => p.diasActivos.includes(fecha));

      // Contar días activos con la función
      const contarDiasActivos = (dias: boolean[]) => dias.filter(d => d).length;
      const contadorIngresos = contarDiasActivos(actividad);

      return { nombre: p.nombre, dias: actividad, contadorIngresos };
    });
    

    res.json({ diasSemana: diasDeLaSemana, datos: resultado });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo actividad semanal' });
  }
}
