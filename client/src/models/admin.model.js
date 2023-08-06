export class Admin {
  constructor(email) {
    this.email = email;
  }

  // set admin from response
  static setAdmin(admin) {
    return new Admin(admin?.email);
  }
}
