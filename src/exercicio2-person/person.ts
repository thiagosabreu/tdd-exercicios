export class Email {
  constructor(
    public id: number,
    public name: string,
  ) {}
}

export class Person {
  emails: Email[] = [];

  constructor(
    public id: number,
    public name: string,
    public age: number,
  ) {}

  addEmail(email: Email): void {
    this.emails.push(email);
  }
}
