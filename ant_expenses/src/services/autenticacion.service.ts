import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import generadorPassword from 'password-generator'
import CryptoJS from 'crypto-js';


@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
  secretkeyAES = 'Agchu"#--qs';

  generarPassword (){
    let password = generadorPassword(12, false)
    return password;
  }

  encriptar(clave : string){
    let encriptado = CryptoJS.AES.encrypt( clave, 'secret key 123').toString();
    return encriptado;
  }

  desencriptar(passwordEncriptado : string){
    let bytes  = CryptoJS.AES.decrypt( passwordEncriptado, this.secretkeyAES);
    let desencripatado = bytes.toString(CryptoJS.enc.Utf8);
    return desencripatado;
  }


}
