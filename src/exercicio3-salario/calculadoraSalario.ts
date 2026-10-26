import { Cargo, Funcionario } from './funcionario';

interface RegraDesconto {
  limite: number;
  percentualAcimaDoLimite: number;
  percentualAbaixoDoLimite: number;
}

// Descontos em percentual inteiro; limite em reais (salário >= limite usa o percentual "acima")
const REGRAS: Record<Cargo, RegraDesconto> = {
  [Cargo.DESENVOLVEDOR]: { limite: 3000, percentualAcimaDoLimite: 20, percentualAbaixoDoLimite: 10 },
  [Cargo.DBA]: { limite: 2000, percentualAcimaDoLimite: 25, percentualAbaixoDoLimite: 15 },
  [Cargo.TESTADOR]: { limite: 2000, percentualAcimaDoLimite: 25, percentualAbaixoDoLimite: 15 },
  [Cargo.GERENTE]: { limite: 5000, percentualAcimaDoLimite: 30, percentualAbaixoDoLimite: 20 },
};

export class CalculadoraSalario {
  calcularSalarioLiquido(funcionario: Funcionario): number {
    if (!funcionario) {
      throw new Error('Funcionário é obrigatório');
    }
    const regra = REGRAS[funcionario.cargo];
    if (!regra) {
      throw new Error(`Cargo desconhecido: ${funcionario.cargo}`);
    }
    const { salarioBase } = funcionario;
    if (!Number.isFinite(salarioBase) || salarioBase < 0) {
      throw new Error('O salário-base deve ser um número não negativo');
    }

    const percentual =
      salarioBase >= regra.limite ? regra.percentualAcimaDoLimite : regra.percentualAbaixoDoLimite;
    // cálculo em centavos inteiros para evitar erros de ponto flutuante
    const centavos = Math.round(salarioBase * 100);
    return Math.round((centavos * (100 - percentual)) / 100) / 100;
  }
}
