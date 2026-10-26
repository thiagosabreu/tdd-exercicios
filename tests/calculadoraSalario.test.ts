import { CalculadoraSalario } from '../src/exercicio3-salario/calculadoraSalario';
import { Cargo, Funcionario } from '../src/exercicio3-salario/funcionario';

describe('CalculadoraSalario', () => {
  const calculadora = new CalculadoraSalario();

  function salarioLiquido(cargo: Cargo, salarioBase: number): number {
    return calculadora.calcularSalarioLiquido(new Funcionario('Fulano de Tal', 'fulano@mail.com', salarioBase, cargo));
  }

  test.each([
    [5000.0, 4000.0], // >= 3000: 20%
    [3000.0, 2400.0], // = 3000: 20%
    [2999.99, 2699.99], // < 3000: 10%
    [1000.0, 900.0], // < 3000: 10%
  ])('DESENVOLVEDOR com salário %d recebe %d', (salario, esperado) => {
    expect(salarioLiquido(Cargo.DESENVOLVEDOR, salario)).toBe(esperado);
  });

  test.each([
    [4000.0, 3000.0], // >= 2000: 25%
    [2000.0, 1500.0], // = 2000: 25%
    [1999.99, 1699.99], // < 2000: 15%
    [500.0, 425.0], // < 2000: 15%
  ])('DBA com salário %d recebe %d', (salario, esperado) => {
    expect(salarioLiquido(Cargo.DBA, salario)).toBe(esperado);
  });

  test.each([
    [4000.0, 3000.0], // >= 2000: 25%
    [2000.0, 1500.0], // = 2000: 25%
    [1999.99, 1699.99], // < 2000: 15%
    [550.0, 467.5], // < 2000: 15%
  ])('TESTADOR com salário %d recebe %d', (salario, esperado) => {
    expect(salarioLiquido(Cargo.TESTADOR, salario)).toBe(esperado);
  });

  test.each([
    [8000.0, 5600.0], // >= 5000: 30%
    [5000.0, 3500.0], // = 5000: 30%
    [4999.99, 3999.99], // < 5000: 20%
    [2500.0, 2000.0], // < 5000: 20%
  ])('GERENTE com salário %d recebe %d', (salario, esperado) => {
    expect(salarioLiquido(Cargo.GERENTE, salario)).toBe(esperado);
  });
});
