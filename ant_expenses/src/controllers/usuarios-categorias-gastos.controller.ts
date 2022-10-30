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
  CategoriasGastos,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosCategoriasGastosController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many CategoriasGastos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CategoriasGastos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CategoriasGastos>,
  ): Promise<CategoriasGastos[]> {
    return this.usuariosRepository.categoriasGastos(id).find(filter);
  }

  @post('/usuarios/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(CategoriasGastos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {
            title: 'NewCategoriasGastosInUsuarios',
            exclude: ['id'],
            optional: ['usuariosId']
          }),
        },
      },
    }) categoriasGastos: Omit<CategoriasGastos, 'id'>,
  ): Promise<CategoriasGastos> {
    return this.usuariosRepository.categoriasGastos(id).create(categoriasGastos);
  }

  @patch('/usuarios/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'Usuarios.CategoriasGastos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {partial: true}),
        },
      },
    })
    categoriasGastos: Partial<CategoriasGastos>,
    @param.query.object('where', getWhereSchemaFor(CategoriasGastos)) where?: Where<CategoriasGastos>,
  ): Promise<Count> {
    return this.usuariosRepository.categoriasGastos(id).patch(categoriasGastos, where);
  }

  @del('/usuarios/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'Usuarios.CategoriasGastos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CategoriasGastos)) where?: Where<CategoriasGastos>,
  ): Promise<Count> {
    return this.usuariosRepository.categoriasGastos(id).delete(where);
  }
}
