import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
// crypto: consigo gerar um hash aleatoria com ela.

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
      //Onde nosso vão quando for feito o upload.
    filename(request, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      // ele vai gerar um hash com 6 caracteres, depois converter em uma string do tipo hex.

      const filename = `${hash}-${file.originalname}`;

      callback(null, filename);
    }
  }),
};
// file: e tudo que pode ter do arquivo, nome, extensão, etc...
// callback: e uma função que vai ser chamado depois de processar o filename.