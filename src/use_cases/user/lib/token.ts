import { Environments } from 'src/constants/Environment';
import { ModelUser } from 'src/models/ModelUser';
import { CryptoUtils } from 'src/utils/crypto';

export class TokenUtils {
  private crypto!: CryptoUtils
  constructor() {
    this.crypto = new CryptoUtils()
  }
  /**
   * Generates a token for the user
   * @param user User data
   * @returns Token
   */
  public generateToken(user: ModelUser): string {
    return this.crypto.tokenGenerator({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    }, Environments.secretToken)
  }
}
