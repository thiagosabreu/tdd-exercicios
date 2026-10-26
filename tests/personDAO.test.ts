import { Email, Person } from '../src/exercicio2-person/person';
import {
  ERRO_EMAIL_INVALIDO,
  ERRO_IDADE,
  ERRO_NOME,
  ERRO_PESSOA_NULA,
  ERRO_SEM_EMAIL,
  PersonDAO,
} from '../src/exercicio2-person/personDAO';

function pessoa(nome: string | null, idade: number, ...emails: (string | null)[]): Person {
  const p = new Person(1, nome, idade);
  emails.forEach((email, i) => p.addEmail(new Email(i + 1, email)));
  return p;
}

describe('PersonDAO', () => {
  let dao: PersonDAO;

  beforeEach(() => {
    dao = new PersonDAO();
  });

  describe('modelo', () => {
    test('Person e Email armazenam os dados', () => {
      const p = new Person(10, 'Maria Silva', 30);
      const email = new Email(20, 'maria@mail.com');
      p.addEmail(email);
      expect([p.id, p.name, p.age, p.emails]).toEqual([10, 'Maria Silva', 30, [email]]);
      expect([email.id, email.name]).toEqual([20, 'maria@mail.com']);
    });
  });

  describe('pessoa válida', () => {
    test('não retorna erros', () => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', 30, 'maria@fatec.sp.gov.br'))).toEqual([]);
    });

    test('nome com acentos e mais de duas partes é válido', () => {
      expect(dao.isValidToInclude(pessoa('João da Conceição', 45, 'joao@mail.com'))).toEqual([]);
    });

    test('nome com espaços extras entre as partes é válido', () => {
      expect(dao.isValidToInclude(pessoa('  Maria   Silva ', 30, 'maria@mail.com'))).toEqual([]);
    });
  });

  test('pessoa nula retorna erro', () => {
    expect(dao.isValidToInclude(null)).toEqual([ERRO_PESSOA_NULA]);
  });

  describe('nome', () => {
    test.each([null, '', '   ', 'Maria', 'Maria Silva2', 'Maria S1lva', 'Maria-Silva', 'Maria @Silva', 'Maria Silva_'])(
      'nome inválido "%s" retorna erro',
      (nome) => {
        expect(dao.isValidToInclude(pessoa(nome, 30, 'maria@mail.com'))).toEqual([ERRO_NOME]);
      },
    );
  });

  describe('idade', () => {
    test.each([1, 2, 199, 200])('idade %i (dentro do intervalo) é válida', (idade) => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', idade, 'maria@mail.com'))).toEqual([]);
    });

    test.each([-1000, -1, 0, 201, 1000, 30.5, NaN])('idade %d (fora do intervalo) retorna erro', (idade) => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', idade, 'maria@mail.com'))).toEqual([ERRO_IDADE]);
    });
  });

  describe('emails', () => {
    test('pessoa sem email retorna erro', () => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', 30))).toEqual([ERRO_SEM_EMAIL]);
    });

    test.each(['a@b.c', 'nome.sobrenome@empresa.com.br', 'x_y@dominio.org'])('email "%s" é válido', (email) => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', 30, email))).toEqual([]);
    });

    test.each([
      null,
      '',
      'maria',
      'maria@',
      '@mail.com',
      'maria@mail',
      'maria@.com',
      'maria@mail.',
      'maria@@mail.com',
      'ma ria@mail.com',
      'maria.mail.com',
    ])('email "%s" fora do formato retorna erro', (email) => {
      expect(dao.isValidToInclude(pessoa('Maria Silva', 30, email))).toEqual([ERRO_EMAIL_INVALIDO + email]);
    });

    test('cada email inválido gera um erro', () => {
      const p = pessoa('Maria Silva', 30, 'valido@mail.com', 'invalido1', 'invalido2@');
      expect(dao.isValidToInclude(p)).toEqual([ERRO_EMAIL_INVALIDO + 'invalido1', ERRO_EMAIL_INVALIDO + 'invalido2@']);
    });
  });

  test('retorna todos os erros de uma vez', () => {
    expect(dao.isValidToInclude(pessoa('Maria', 0))).toEqual([ERRO_NOME, ERRO_IDADE, ERRO_SEM_EMAIL]);
  });

  describe('save', () => {
    test('pessoa válida é armazenada', () => {
      const p = pessoa('Maria Silva', 30, 'maria@mail.com');
      dao.save(p);
      expect(dao.findAll()).toEqual([p]);
    });

    test('pessoa inválida lança erro e não é armazenada', () => {
      const p = pessoa('Maria', 30, 'maria@mail.com');
      expect(() => dao.save(p)).toThrow(ERRO_NOME);
      expect(dao.findAll()).toEqual([]);
    });
  });
});
