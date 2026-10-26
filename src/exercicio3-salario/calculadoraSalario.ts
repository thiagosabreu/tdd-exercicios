import { Cargo, Funcionario } from './funcionario';

// cargo: [limite, desconto se salário >= limite, desconto se salário < limite] (descontos em %)
const REGRAS: Record<Cargo, [number, number, number]> = {
  [Cargo.DESENVOLVEDOR]: [3000, 20, 10],
  [Cargo.DBA]: [2000, 25, 15],
  [Cargo.TESTADOR]: [2000, 25, 15],
  [Cargo.GERENTE]: [5000, 30, 20],
};

export class CalculadoraSalario {
  calcularSalarioLiquido(funcionario: Funcionario): number {
    const [limite, descontoAcima, descontoAbaixo] = REGRAS[funcionario.cargo];
    const desconto = funcionario.salarioBase >= limite ? descontoAcima : descontoAbaixo;
    // cálculo em centavos para evitar erros de ponto flutuante
    const centavos = Math.round(funcionario.salarioBase * 100);
    return Math.round((centavos * (100 - desconto)) / 100) / 100;
  }
}
