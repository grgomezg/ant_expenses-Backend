import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuarios,
  Transacciones,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosTransaccionesController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many Transacciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Transacciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Transacciones>,
  ): Promise<Transacciones[]> {
    return this.usuariosRepository.transacciones(id).find(filter);
  }

  @post('/usuarios/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransaccionesInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.usuariosRepository.transacciones(id).create(transacciones);
  }

  @patch('/usuarios/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Usuarios.Transacciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {partial: true}),
        },
      },
    })
    transacciones: Partial<Transacciones>,
    @param.query.object('where', getWhereSchemaFor(Transacciones)) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.usuariosRepository.transacciones(id).patch(transacciones, where);
  }

  @del('/usuarios/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Usuarios.Transacciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transacciones)) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.usuariosRepository.transacciones(id).delete(where);
  }
}
