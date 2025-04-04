import { parse, format } from "date-fns";
import { eventosConfig } from "@/config/eventos";

export interface Evento {
  id: string;
  titulo: string;
  imagem: string;
  dataHora: string; // ISO string format
  duracao?: number;
  local: string;
  categoria: string;
}

// Converte a data e hora do formato amigável para ISO string
function converterDataHora(dia: string, hora: string): string {
  const data = parse(dia + " " + hora, "dd/MM/yyyy HH:mm", new Date());
  return data.toISOString();
}

// Converte a configuração para o formato usado pelo sistema
export const eventos: Evento[] = eventosConfig.map(config => ({
  id: config.id,
  titulo: config.titulo,
  imagem: config.imagem,
  dataHora: converterDataHora(config.dia, config.hora),
  duracao: config.duracao,
  local: config.local,
  categoria: config.categoria,
})); 