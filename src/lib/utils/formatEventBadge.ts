import { format, isToday, isTomorrow, isSameHour, addHours, parseISO, differenceInCalendarDays, startOfDay, setYear } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatEventBadge(dataHoraISO: string | undefined, duracao?: number): string {
  // Verificação de segurança
  if (!dataHoraISO) {
    console.error('dataHoraISO não foi fornecido para formatEventBadge');
    return '';
  }

  try {
    const dataHora = parseISO(dataHoraISO);
    const agora = new Date();
    const horaEvento = format(dataHora, "HH'h'", { locale: ptBR });
    const horaFim = duracao ? format(addHours(dataHora, duracao), "HH'h'", { locale: ptBR }) : undefined;
    
    // Normaliza as datas para o mesmo ano
    const anoAtual = agora.getFullYear();
    const dataHoraAnoAtual = setYear(dataHora, anoAtual);
    const agoraInicioDia = startOfDay(agora);
    const dataEventoInicioDia = startOfDay(dataHoraAnoAtual);
    
    // Calcula a diferença em dias
    const diasDeDiferenca = differenceInCalendarDays(dataEventoInicioDia, agoraInicioDia);

    console.log('Data do Evento (ano atual):', format(dataHoraAnoAtual, 'dd/MM/yyyy'));
    console.log('Data Atual:', format(agora, 'dd/MM/yyyy'));
    console.log('Diferença em dias:', diasDeDiferenca);

    // Se o evento está acontecendo agora
    if (isSameHour(agora, dataHoraAnoAtual)) {
      return `Agora, até ${horaFim || horaEvento}`;
    }

    // Se é hoje
    if (format(dataEventoInicioDia, 'dd/MM') === format(agoraInicioDia, 'dd/MM')) {
      return `Hoje, às ${horaEvento}`;
    }

    // Se é amanhã (diferença de 1 dia)
    if (diasDeDiferenca === 1) {
      return `Amanhã, às ${horaEvento}`;
    }

    // Caso contrário, mostra apenas dia e mês
    const dataFormatada = format(dataHora, "dd/MM", { locale: ptBR });
    return `${dataFormatada} às ${horaEvento}`;
  } catch (error) {
    console.error('Erro ao formatar badge do evento:', error);
    return '';
  }
} 