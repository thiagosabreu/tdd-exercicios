import { Email, Person } from '../src/exercicio2-person/person';
import { ERRO_EMAIL_INVALIDO, ERRO_IDADE, ERRO_NOME, ERRO_SEM_EMAIL, PersonDAO } from '../src/exercicio2-person/personDAO';

function pessoa(nome: string, idade: number, ...emails: string[]): Person {
  const p = new Person(1, nome, idade);
  emails.forEach((email, i) => p.addEmail(new Email(i + 1, email)));
  return p;
}

describe('PersonDAO.isValidToInclude', () => {
  let dao: PersonDAO;

  beforeEach(() => {
    dao = new PersonDAO();
  });

  test('pessoa válida não retorna erros', () => {
    expect(dao.isValidToInclude(pessoa('Maria Silva', 30, 'maria@mail.com'))).toEqual([]);
  });

  // O nome é composto por ao menos 2 partes e deve ser composto de letras
  test.each(['', 'Maria', 'Maria Silva2', 'Maria-Silva', 'Maria @Silva'])('nome inválido "%s" retorna erro', (nome) => {
    expect(dao.isValidToInclude(pessoa(nome, 30, 'maria@mail.com'))).toEqual([ERRO_NOME]);
  });

  // A idade deve estar no intervalo [1, 200]
  test.each([1, 200])('idade %i (limite do intervalo) é válida', (idade) => {
    expect(dao.isValidToInclude(pessoa('Maria Silva', idade, 'maria@mail.com'))).toEqual([]);
  });

  test.each([0, 201, -1])('idade %i (fora do intervalo) retorna erro', (idade) => {
    expect(dao.isValidToInclude(pessoa('Maria Silva', idade, 'maria@mail.com'))).toEqual([ERRO_IDADE]);
  });

  // O objeto Person deve ter pelo menos um objeto da classe Email associado
  test('pessoa sem email retorna erro', () => {
    expect(dao.isValidToInclude(pessoa('Maria Silva', 30))).toEqual([ERRO_SEM_EMAIL]);
  });

  // O nome da classe Email deve estar no formato "_____@____._____"
  test('email com uma letra em cada parte é válido', () => {
    expect(dao.isValidToInclude(pessoa('Maria Silva', 30, 'a@b.c'))).toEqual([]);
  });

  test.each(['maria', '@mail.com', 'maria@.com', 'maria@mail.', 'maria@mail'])(
    'email "%s" fora do formato retorna erro',
    (email) => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', 30, email))).toEqual([ERRO_EMAIL_INVALIDO + email]);
    },
  );

  test('retorna a lista com todos os erros encontrados', () => {
    expect(dao.isValidToInclude(pessoa('Maria', 0))).toEqual([ERRO_NOME, ERRO_IDADE, ERRO_SEM_EMAIL]);
  });
});

describe('PersonDAO.save', () => {
  test('salva a pessoa', () => {
    expect(() => new PersonDAO().save(pessoa('Maria Silva', 30, 'maria@mail.com'))).not.toThrow();
  });
});
