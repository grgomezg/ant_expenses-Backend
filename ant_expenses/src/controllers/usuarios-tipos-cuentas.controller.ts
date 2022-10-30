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
  TiposCuentas,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosTiposCuentasController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many TiposCuentas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TiposCuentas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TiposCuentas>,
  ): Promise<TiposCuentas[]> {
    return this.usuariosRepository.tiposCuentas(id).find(filter);
  }

  @post('/usuarios/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(TiposCuentas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposCuentas, {
            title: 'NewTiposCuentasInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) tiposCuentas: Omit<TiposCuentas, 'id'>,
  ): Promise<TiposCuentas> {
    return this.usuariosRepository.tiposCuentas(id).create(tiposCuentas);
  }

  @patch('/usuarios/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'Usuarios.TiposCuentas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposCuentas, {partial: true}),
        },
      },
    })
    tiposCuentas: Partial<TiposCuentas>,
    @param.query.object('where', getWhereSchemaFor(TiposCuentas)) where?: Where<TiposCuentas>,
  ): Promise<Count> {
    return this.usuariosRepository.tiposCuentas(id).patch(tiposCuentas, where);
  }

  @del('/usuarios/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'Usuarios.TiposCuentas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TiposCuentas)) where?: Where<TiposCuentas>,
  ): Promise<Count> {
    return this.usuariosRepository.tiposCuentas(id).delete(where);
  }
}
