import { Person } from './person';

export const ERRO_PESSOA_NULA = 'A pessoa não pode ser nula';
export const ERRO_NOME = 'O nome deve ter ao menos 2 partes compostas apenas por letras';
export const ERRO_IDADE = 'A idade deve estar no intervalo [1, 200]';
export const ERRO_SEM_EMAIL = 'A pessoa deve ter ao menos um email associado';
export const ERRO_EMAIL_INVALIDO = 'Email inválido: ';

export class PersonDAO {
  save(p: Person): void {
    throw new Error('Não implementado');
  }

  findAll(): Person[] {
    throw new Error('Não implementado');
  }

  isValidToInclude(p: Person | null): string[] {
    return [];
  }
}
