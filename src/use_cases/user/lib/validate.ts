import { CryptoUtils } from 'src/utils/crypto'
import { PasswordUtilities } from 'src/utils/password'

export class UserLib {
  private cryptoUtils!: CryptoUtils
  private passwordUtilities!: PasswordUtilities

  constructor() {
    this.passwordUtilities = new PasswordUtilities()
    this.cryptoUtils = new CryptoUtils()
  }

  public validatePassword(password: string): boolean {
    return this.passwordUtilities.isPasswordStrong(password).strong
  }
}