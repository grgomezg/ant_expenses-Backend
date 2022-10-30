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
  TiposCuentas,
  CategoriasGastos,
} from '../models';
import {TiposCuentasRepository} from '../repositories';

export class TiposCuentasCategoriasGastosController {
  constructor(
    @repository(TiposCuentasRepository) protected tiposCuentasRepository: TiposCuentasRepository,
  ) { }

  @get('/tipos-cuentas/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'Array of TiposCuentas has many CategoriasGastos',
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
    return this.tiposCuentasRepository.categoriasGastos(id).find(filter);
  }

  @post('/tipos-cuentas/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'TiposCuentas model instance',
        content: {'application/json': {schema: getModelSchemaRef(CategoriasGastos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TiposCuentas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {
            title: 'NewCategoriasGastosInTiposCuentas',
            exclude: ['id'],
            optional: ['tiposCuentasId']
          }),
        },
      },
    }) categoriasGastos: Omit<CategoriasGastos, 'id'>,
  ): Promise<CategoriasGastos> {
    return this.tiposCuentasRepository.categoriasGastos(id).create(categoriasGastos);
  }

  @patch('/tipos-cuentas/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'TiposCuentas.CategoriasGastos PATCH success count',
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
    return this.tiposCuentasRepository.categoriasGastos(id).patch(categoriasGastos, where);
  }

  @del('/tipos-cuentas/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'TiposCuentas.CategoriasGastos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CategoriasGastos)) where?: Where<CategoriasGastos>,
  ): Promise<Count> {
    return this.tiposCuentasRepository.categoriasGastos(id).delete(where);
  }
}
