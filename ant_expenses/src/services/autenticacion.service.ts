import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import generadorPassword from 'password-generator'
/*importamos cryptoJS*/
import CryptoJS from 'crypto-js';
/*atravez de el accedemos a los servicios*/
import { UsuariosRepository } from '../repositories';
import { repository } from '@loopback/repository';
import { Usuario, Usuarios } from '../models';
import { environment } from '../config/environment';
import jwt from 'jsonwebtoken';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {

  constructor(/* Add @inject to inject parameters */
  @repository(UsuariosRepository)
  public usuariorepository : UsuariosRepository
  ) {}

  /*
   * Add service methods here
   */
  

  generarPassword (){
    let password = generadorPassword(12, false)
    return password;
  }
//opcion para encriptar la clave
  encriptar(clave : string){
    let encriptado = CryptoJS.AES.encrypt( clave, environment.secretkeyAES).toString();
    return encriptado;
  }
  //opcion para desencriptar la clave
  desencriptar(clave : string){
    let bytes  = CryptoJS.AES.decrypt( clave, environment.secretkeyAES);
    let desencriptado = bytes.toString(CryptoJS.enc.Utf8);
    return desencriptado;
   }

 login(email: string, clave:string){
  try {
    let busqueda = this.usuariorepository.findOne({
      where : { email : email, clave : clave }
    });
    if(busqueda != null){
      
      return busqueda;
    
    }else{
      return false;
    }
    
  } catch (error) {
    
  }
  

 }  

   

 //metodo para saber si una persona esta logueada o no con captura de errores
 async loginAsync( email : string, clave : string){

  try {
    let persona = await this.usuariorepository.findOne({
      where : { email : email}
    });
    console.log(email)
    
    
    if( persona != null){
      console.log('esta es la clave encriptada',persona.clave)
      let descubrir = this.desencriptar(persona.clave);
      console.log('esta es la clave desencriptada',descubrir)
      
      

      if( descubrir == clave){
        return persona;
      }else{
        return false;
      }
  
    }else{
      return false;
    }  
  } catch (error) {
    
    
  }
  


 }
 async loginpromesa( email: string, clave: string){

 
    let persona = this.usuariorepository.findOne({
      where : { email : email}
    });

    persona.then( result =>{
      console.log("promesa cumplida");

    }).catch(error=> {
      console.log("la promesa no se cumplio por un error");
    }

    )

  }
  generaciontoken(persona :Usuarios){
    let token = jwt.sign( {
      data:{id : persona.id,
        nombre : persona.nombre,
        apellido : persona.apellido,
        correo : persona.email        
      }
      
    },environment.secretJWT,
    { expiresIn : 60 * 60 });
    return token;
  }
  ValidarTokenJWT(token: string){
    try {
      let data = jwt.verify(token, environment.secretJWT);
      return data;
    } catch (error) {
      return false;
    }
  }

}
