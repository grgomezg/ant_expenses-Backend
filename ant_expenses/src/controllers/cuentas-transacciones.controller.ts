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
  Cuentas,
  Transacciones,
} from '../models';
import {CuentasRepository} from '../repositories';

export class CuentasTransaccionesController {
  constructor(
    @repository(CuentasRepository) protected cuentasRepository: CuentasRepository,
  ) { }

  @get('/cuentas/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Array of Cuentas has many Transacciones',
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
    return this.cuentasRepository.transacciones(id).find(filter);
  }

  @post('/cuentas/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Cuentas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Cuentas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransaccionesInCuentas',
            exclude: ['id'],
            optional: ['cuentasId']
          }),
        },
      },
    }) transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.cuentasRepository.transacciones(id).create(transacciones);
  }

  @patch('/cuentas/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Cuentas.Transacciones PATCH success count',
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
    return this.cuentasRepository.transacciones(id).patch(transacciones, where);
  }

  @del('/cuentas/{id}/transacciones', {
    responses: {
      '200': {
        description: 'Cuentas.Transacciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Transacciones)) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.cuentasRepository.transacciones(id).delete(where);
  }
}
