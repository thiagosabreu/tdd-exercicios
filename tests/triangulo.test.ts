import { TipoTriangulo, Triangulo } from '../src/exercicio1-triangulo/triangulo';

describe('Triangulo', () => {
  let triangulo: Triangulo;

  beforeEach(() => {
    triangulo = new Triangulo();
  });

  test('2.1 - triângulo escaleno válido', () => {
    expect(triangulo.classificar(3, 4, 5)).toBe(TipoTriangulo.ESCALENO);
  });

  test('2.2 - triângulo isósceles válido', () => {
    expect(triangulo.classificar(5, 5, 3)).toBe(TipoTriangulo.ISOSCELES);
  });

  test('2.3 - triângulo equilátero válido', () => {
    expect(triangulo.classificar(4, 4, 4)).toBe(TipoTriangulo.EQUILATERO);
  });

  test.each([
    [5, 5, 3],
    [5, 3, 5],
    [3, 5, 5],
  ])('2.4 - isósceles, permutação (%i, %i, %i)', (a, b, c) => {
    expect(triangulo.classificar(a, b, c)).toBe(TipoTriangulo.ISOSCELES);
  });

  test.each([
    [0, 4, 5],
    [3, 0, 5],
    [3, 4, 0],
  ])('2.5 - um valor zero (%i, %i, %i)', (a, b, c) => {
    expect(triangulo.classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
  });

  test.each([
    [-3, 4, 5],
    [3, -4, 5],
    [3, 4, -5],
  ])('2.6 - um valor negativo (%i, %i, %i)', (a, b, c) => {
    expect(triangulo.classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
  });

  test('2.7 - soma de 2 lados igual ao terceiro', () => {
    expect(triangulo.classificar(1, 2, 3)).toBe(TipoTriangulo.INVALIDO);
  });

  test.each([
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
  ])('2.8 - soma igual ao terceiro, permutação (%i, %i, %i)', (a, b, c) => {
    expect(triangulo.classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
  });

  test('2.9 - soma de 2 lados menor que o terceiro', () => {
    expect(triangulo.classificar(1, 2, 5)).toBe(TipoTriangulo.INVALIDO);
  });

  test.each([
    [1, 2, 5],
    [1, 5, 2],
    [2, 1, 5],
    [2, 5, 1],
    [5, 1, 2],
    [5, 2, 1],
  ])('2.10 - soma menor que o terceiro, permutação (%i, %i, %i)', (a, b, c) => {
    expect(triangulo.classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
  });

  test('2.11 - três valores iguais a zero', () => {
    expect(triangulo.classificar(0, 0, 0)).toBe(TipoTriangulo.INVALIDO);
  });
});
