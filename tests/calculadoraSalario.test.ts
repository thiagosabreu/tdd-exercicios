import { CalculadoraSalario } from '../src/exercicio3-salario/calculadoraSalario';
import { Cargo, Funcionario } from '../src/exercicio3-salario/funcionario';

function funcionario(cargo: Cargo, salarioBase: number): Funcionario {
  return new Funcionario('Fulano de Tal', 'fulano@mail.com', salarioBase, cargo);
}

describe('CalculadoraSalario', () => {
  let calculadora: CalculadoraSalario;

  beforeEach(() => {
    calculadora = new CalculadoraSalario();
  });

  test('Funcionario armazena os dados', () => {
    const f = funcionario(Cargo.DBA, 3500);
    expect([f.nome, f.email, f.salarioBase, f.cargo]).toEqual(['Fulano de Tal', 'fulano@mail.com', 3500, Cargo.DBA]);
  });

  test.each([
    [5000.0, 4000.0], // >= 3000: 20%
    [3000.0, 2400.0], // limite exato: 20%
    [2999.99, 2699.99], // logo abaixo do limite: 10%
    [1000.0, 900.0], // < 3000: 10%
  ])('DESENVOLVEDOR com salário %d recebe %d', (salario, esperado) => {
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.DESENVOLVEDOR, salario))).toBe(esperado);
  });

  test.each([
    [4000.0, 3000.0], // >= 2000: 25%
    [2000.0, 1500.0], // limite exato: 25%
    [1999.99, 1699.99], // logo abaixo do limite: 15%
    [500.0, 425.0], // < 2000: 15%
  ])('DBA com salário %d recebe %d', (salario, esperado) => {
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.DBA, salario))).toBe(esperado);
  });

  test.each([
    [4000.0, 3000.0], // >= 2000: 25%
    [2000.0, 1500.0], // limite exato: 25%
    [1999.99, 1699.99], // logo abaixo do limite: 15%
    [550.0, 467.5], // < 2000: 15%
  ])('TESTADOR com salário %d recebe %d', (salario, esperado) => {
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.TESTADOR, salario))).toBe(esperado);
  });

  test.each([
    [8000.0, 5600.0], // >= 5000: 30%
    [5000.0, 3500.0], // limite exato: 30%
    [4999.99, 3999.99], // logo abaixo do limite: 20%
    [2500.0, 2000.0], // < 5000: 20%
  ])('GERENTE com salário %d recebe %d', (salario, esperado) => {
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.GERENTE, salario))).toBe(esperado);
  });

  test('resultado é arredondado para centavos', () => {
    // 1234.56 * 0.85 = 1049.376 -> 1049.38
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.DBA, 1234.56))).toBe(1049.38);
  });

  test('salário zero resulta em zero', () => {
    expect(calculadora.calcularSalarioLiquido(funcionario(Cargo.GERENTE, 0))).toBe(0);
  });

  test('funcionário nulo lança erro', () => {
    expect(() => calculadora.calcularSalarioLiquido(null as unknown as Funcionario)).toThrow();
  });

  test('funcionário com cargo desconhecido lança erro', () => {
    expect(() => calculadora.calcularSalarioLiquido(funcionario('ESTAGIARIO' as Cargo, 1000))).toThrow();
  });

  test.each([-1, NaN, Infinity])('salário-base inválido (%d) lança erro', (salario) => {
    expect(() => calculadora.calcularSalarioLiquido(funcionario(Cargo.DESENVOLVEDOR, salario))).toThrow();
  });
});
