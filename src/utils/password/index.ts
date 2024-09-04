import Bcrypt from 'bcrypt'
import Owasp from 'owasp-password-strength-test'
import GeneratePassword from 'generate-password'

export class PasswordUtilities {
  /**
   * Check if the password is strong
   * @param password password for check
   */
  public isPasswordStrong(password: string): {
    strong: boolean;
    optionalTestsPassed: number;
  } {
    const result = Owasp.test(password);
    return {
      strong: result.strong,
      optionalTestsPassed: result.optionalTestsPassed,
    };
  }
  /**
   * Generate a random password
   */
  public async getRandomPassword(): Promise<string> {
    return GeneratePassword.generate({
      length: 15,
      numbers: true,
      symbols: true,
      uppercase: true,
      exclude: '""',
      strict: true,
    })
  }
  /**
   * Check if the password is correct
   * @param password password for check
   * @param hash hash for password check
   */
  public isCorrectPassword(password: string, hash: string) {
    return Bcrypt.compare(password, hash);
  }
}
