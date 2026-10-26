export class Email {
  constructor(
    public id: number,
    public name: string | null,
  ) {}
}

export class Person {
  emails: Email[] = [];

  constructor(
    public id: number,
    public name: string | null,
    public age: number,
  ) {}

  addEmail(email: Email): void {
    this.emails.push(email);
  }
}
