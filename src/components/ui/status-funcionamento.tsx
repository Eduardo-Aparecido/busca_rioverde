import { Clock } from "lucide-react";

interface Horario {
  dia: string;
  horarios: string[];
}

interface StatusFuncionamentoProps {
  horarios: Horario[];
  ultimaAtualizacao: string;
}

export function StatusFuncionamento({ horarios, ultimaAtualizacao }: StatusFuncionamentoProps) {
  const verificarStatusFuncionamento = () => {
    const agora = new Date();
    const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const hora = agora.getHours();
    const minutos = agora.getMinutes();
    const horaAtual = hora + minutos / 60;

    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    const horarioHoje = horarios.find(h => h.dia.toLowerCase() === diasSemana[diaSemana]);

    if (!horarioHoje) return false;

    return horarioHoje.horarios.some(intervalo => {
      const [inicio, fim] = intervalo.split(' às ').map(h => {
        const [hora, minuto = '0'] = h.split(':');
        return parseInt(hora) + parseInt(minuto) / 60;
      });

      return horaAtual >= inicio && horaAtual <= fim;
    });
  };

  const estaAberto = verificarStatusFuncionamento();

  return (
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex items-center gap-2">
        <span className={`inline-flex h-2 w-2 rounded-full ${estaAberto ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="font-medium">
          {estaAberto ? 'Aberto agora' : 'Fechado agora'}
        </span>
      </div>

      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>Atualizado em {ultimaAtualizacao}</span>
      </div>
    </div>
  );
} 