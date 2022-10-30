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
  Cuentas,
} from '../models';
import {TiposCuentasRepository} from '../repositories';

export class TiposCuentasCuentasController {
  constructor(
    @repository(TiposCuentasRepository) protected tiposCuentasRepository: TiposCuentasRepository,
  ) { }

  @get('/tipos-cuentas/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Array of TiposCuentas has many Cuentas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cuentas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cuentas>,
  ): Promise<Cuentas[]> {
    return this.tiposCuentasRepository.cuentas(id).find(filter);
  }

  @post('/tipos-cuentas/{id}/cuentas', {
    responses: {
      '200': {
        description: 'TiposCuentas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cuentas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TiposCuentas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuentas, {
            title: 'NewCuentasInTiposCuentas',
            exclude: ['id'],
            optional: ['tiposCuentasId']
          }),
        },
      },
    }) cuentas: Omit<Cuentas, 'id'>,
  ): Promise<Cuentas> {
    return this.tiposCuentasRepository.cuentas(id).create(cuentas);
  }

  @patch('/tipos-cuentas/{id}/cuentas', {
    responses: {
      '200': {
        description: 'TiposCuentas.Cuentas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuentas, {partial: true}),
        },
      },
    })
    cuentas: Partial<Cuentas>,
    @param.query.object('where', getWhereSchemaFor(Cuentas)) where?: Where<Cuentas>,
  ): Promise<Count> {
    return this.tiposCuentasRepository.cuentas(id).patch(cuentas, where);
  }

  @del('/tipos-cuentas/{id}/cuentas', {
    responses: {
      '200': {
        description: 'TiposCuentas.Cuentas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cuentas)) where?: Where<Cuentas>,
  ): Promise<Count> {
    return this.tiposCuentasRepository.cuentas(id).delete(where);
  }
}
