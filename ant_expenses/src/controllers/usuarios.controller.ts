import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';

import {
  constrainFilter,
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Usuario, Usuarios} from '../models';
import {UsuariosRepository} from '../repositories';
import { AutenticacionService } from '../services';


export class UsuariosController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository : UsuariosRepository,
    @service(AutenticacionService)
    public autenticacionService : AutenticacionService, 
    
  ) {}
  
/*se crea post para usuario*/
  @post('/login')
  @response(200, {
    description: 'Usuario logeado con exito',
  })
  async login(
    @requestBody() usuario : Usuario
    /*valida si el usuario esta en la tabla usuarios*/
  ) {
        
    /*para probar que nos imprima el encriptado y comparar */ //console.log(usuario.clave)
    let persona =await this.autenticacionService.loginAsync(usuario.email, usuario.clave)
    //let persona =await this.autenticacionService.login(usuario.email, usuario.clave)
    //console.log(usuario.clave)
    if (persona){
      let token = this.autenticacionService.generaciontoken(persona);
      this.autenticacionService.notificacion_SMS_logueo("Inicio confirmado bienvenido  a Ant_Expenses")
      return {
        datos : persona,
        state : 'ok',
        token: token
      }
      
      

    }else{
      //console.log(usuario.clave)
      throw new HttpErrors[401]("Datos incorrectos");
      

    }

   
  }
  



  //@authenticate('admin')
  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id'],
          }),
        },
      },
    })
    /*encriptar la clave*/
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {

    usuarios.clave = this.autenticacionService.encriptar(usuarios.clave);

    return this.usuariosRepository.create(usuarios);
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
