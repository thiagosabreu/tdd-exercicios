export enum TipoTriangulo {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES = 'ISOSCELES',
  ESCALENO = 'ESCALENO',
  INVALIDO = 'INVALIDO',
}

export class Triangulo {
  classificar(a: number, b: number, c: number): TipoTriangulo {
    throw new Error('Não implementado');
  }
}
