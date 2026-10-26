export enum TipoTriangulo {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES = 'ISOSCELES',
  ESCALENO = 'ESCALENO',
  INVALIDO = 'INVALIDO',
}

export class Triangulo {
  classificar(a: number, b: number, c: number): TipoTriangulo {
    if (a <= 0 || b <= 0 || c <= 0) {
      return TipoTriangulo.INVALIDO;
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      return TipoTriangulo.INVALIDO;
    }
    if (a === b && b === c) {
      return TipoTriangulo.EQUILATERO;
    }
    if (a === b || a === c || b === c) {
      return TipoTriangulo.ISOSCELES;
    }
    return TipoTriangulo.ESCALENO;
  }
}
