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
  CategoriasGastos,
  Transacciones,
} from '../models';
import {CategoriasGastosRepository} from '../repositories';

export class CategoriasGastosTransaccionesController {
  constructor(
    @repository(CategoriasGastosRepository) protected categoriasGastosRepository: CategoriasGastosRepository,
  ) { }

  @get('/categorias-gastos/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Array of CategoriasGastos has many Transacciones',
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
    return this.categoriasGastosRepository.transacciones(id).find(filter);
  }

  @post('/categorias-gastos/{id}/transacciones', {
    responses: {
      '200': {
        description: 'CategoriasGastos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof CategoriasGastos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransaccionesInCategoriasGastos',
            exclude: ['id'],
            optional: ['categoriasGastosId']
          }),
        },
      },
    }) transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.categoriasGastosRepository.transacciones(id).create(transacciones);
  }

  @patch('/categorias-gastos/{id}/transacciones', {
    responses: {
      '200': {
        description: 'CategoriasGastos.Transacciones PATCH success count',
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
    return this.categoriasGastosRepository.transacciones(id).patch(transacciones, where);
  }

  @del('/categorias-gastos/{id}/transacciones', {
    responses: {
      '200': {
        description: 'CategoriasGastos.Transacciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transacciones)) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.categoriasGastosRepository.transacciones(id).delete(where);
  }
}
