import { v4 as uuidv4 } from 'uuid';
export class RegisterPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('E-Mail');
    this.passwordInput = page.getByPlaceholder('password');
    this.signupButton = page.getByRole('button', { name: 'Register' });
  }

  registerAsNewUser = async () => {
    const emailId = uuidv4();
    const email = `${emailId}@gmail.com`;
    const password = uuidv4();

    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
    await this.signupButton.waitFor();
    await this.signupButton.click();
  };
}
