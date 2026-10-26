import { Person } from './person';

export const ERRO_NOME = 'O nome deve ter ao menos 2 partes compostas apenas por letras';
export const ERRO_IDADE = 'A idade deve estar no intervalo [1, 200]';
export const ERRO_SEM_EMAIL = 'A pessoa deve ter ao menos um email associado';
export const ERRO_EMAIL_INVALIDO = 'Email inválido: ';

const PARTE_NOME = /^\p{L}+$/u;
const EMAIL = /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/;

export class PersonDAO {
  private readonly pessoas: Person[] = [];

  save(p: Person): void {
    this.pessoas.push(p);
  }

  isValidToInclude(p: Person): string[] {
    const erros: string[] = [];
    const partes = p.name.trim().split(/\s+/);
    if (partes.length < 2 || !partes.every((parte) => PARTE_NOME.test(parte))) {
      erros.push(ERRO_NOME);
    }
    if (p.age < 1 || p.age > 200) {
      erros.push(ERRO_IDADE);
    }
    if (p.emails.length === 0) {
      erros.push(ERRO_SEM_EMAIL);
    }
    for (const email of p.emails) {
      if (!EMAIL.test(email.name)) {
        erros.push(ERRO_EMAIL_INVALIDO + email.name);
      }
    }
    return erros;
  }
}
