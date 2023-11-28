import fs from 'node:fs';
import path from 'node:path';

export class UtilsFileUser {
  private static _userPath = ['assets', 'files']; // recebe o caminho da pasta

  private static _validateFolder(userId: string) {
    // resp. por verificar se a pasta existe
    return fs.existsSync(path.resolve(...this._userPath, userId));
  }

  public static createFolderUser(userId: string) {
    //criar a pasta do usuario pelo id
    if (!this._validateFolder(userId)) {
      fs.mkdirSync(path.resolve(...this._userPath, userId));
    }
  }
}
