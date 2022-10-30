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
  TiposOperaciones,
  Transacciones,
} from '../models';
import {TiposOperacionesRepository} from '../repositories';

export class TiposOperacionesTransaccionesController {
  constructor(
    @repository(TiposOperacionesRepository) protected tiposOperacionesRepository: TiposOperacionesRepository,
  ) { }

  @get('/tipos-operaciones/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Array of TiposOperaciones has many Transacciones',
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
    return this.tiposOperacionesRepository.transacciones(id).find(filter);
  }

  @post('/tipos-operaciones/{id}/transacciones', {
    responses: {
      '200': {
        description: 'TiposOperaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TiposOperaciones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransaccionesInTiposOperaciones',
            exclude: ['id'],
            optional: ['tiposOperacionesId']
          }),
        },
      },
    }) transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.tiposOperacionesRepository.transacciones(id).create(transacciones);
  }

  @patch('/tipos-operaciones/{id}/transacciones', {
    responses: {
      '200': {
        description: 'TiposOperaciones.Transacciones PATCH success count',
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
    return this.tiposOperacionesRepository.transacciones(id).patch(transacciones, where);
  }

  @del('/tipos-operaciones/{id}/transacciones', {
    responses: {
      '200': {
        description: 'TiposOperaciones.Transacciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transacciones)) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.tiposOperacionesRepository.transacciones(id).delete(where);
  }
}
