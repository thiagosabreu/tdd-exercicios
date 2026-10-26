import { Person } from './person';

export const ERRO_PESSOA_NULA = 'A pessoa não pode ser nula';
export const ERRO_NOME = 'O nome deve ter ao menos 2 partes compostas apenas por letras';
export const ERRO_IDADE = 'A idade deve estar no intervalo [1, 200]';
export const ERRO_SEM_EMAIL = 'A pessoa deve ter ao menos um email associado';
export const ERRO_EMAIL_INVALIDO = 'Email inválido: ';

const IDADE_MINIMA = 1;
const IDADE_MAXIMA = 200;
const PARTE_NOME = /^\p{L}+$/u;
const EMAIL = /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/;

export class PersonDAO {
  private readonly pessoas: Person[] = [];

  save(p: Person): void {
    const erros = this.isValidToInclude(p);
    if (erros.length > 0) {
      throw new Error(erros.join('; '));
    }
    this.pessoas.push(p);
  }

  findAll(): Person[] {
    return [...this.pessoas];
  }

  isValidToInclude(p: Person | null): string[] {
    if (p === null) {
      return [ERRO_PESSOA_NULA];
    }

    const erros: string[] = [];
    if (!this.nomeValido(p.name)) {
      erros.push(ERRO_NOME);
    }
    if (!this.idadeValida(p.age)) {
      erros.push(ERRO_IDADE);
    }
    if (p.emails.length === 0) {
      erros.push(ERRO_SEM_EMAIL);
    }
    for (const email of p.emails) {
      if (!this.emailValido(email.name)) {
        erros.push(ERRO_EMAIL_INVALIDO + email.name);
      }
    }
    return erros;
  }

  private nomeValido(nome: string | null): boolean {
    if (nome === null) {
      return false;
    }
    const partes = nome.trim().split(/\s+/);
    return partes.length >= 2 && partes.every((parte) => PARTE_NOME.test(parte));
  }

  private idadeValida(idade: number): boolean {
    return Number.isInteger(idade) && idade >= IDADE_MINIMA && idade <= IDADE_MAXIMA;
  }

  private emailValido(email: string | null): boolean {
    return email !== null && EMAIL.test(email);
  }
}
