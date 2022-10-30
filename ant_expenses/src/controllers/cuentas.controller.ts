import {
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
} from '@loopback/rest';
import {Cuentas} from '../models';
import {CuentasRepository} from '../repositories';

export class CuentasController {
  constructor(
    @repository(CuentasRepository)
    public cuentasRepository : CuentasRepository,
  ) {}

  @post('/cuentas')
  @response(200, {
    description: 'Cuentas model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cuentas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuentas, {
            title: 'NewCuentas',
            exclude: ['id'],
          }),
        },
      },
    })
    cuentas: Omit<Cuentas, 'id'>,
  ): Promise<Cuentas> {
    return this.cuentasRepository.create(cuentas);
  }

  @get('/cuentas/count')
  @response(200, {
    description: 'Cuentas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cuentas) where?: Where<Cuentas>,
  ): Promise<Count> {
    return this.cuentasRepository.count(where);
  }

  @get('/cuentas')
  @response(200, {
    description: 'Array of Cuentas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cuentas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cuentas) filter?: Filter<Cuentas>,
  ): Promise<Cuentas[]> {
    return this.cuentasRepository.find(filter);
  }

  @patch('/cuentas')
  @response(200, {
    description: 'Cuentas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuentas, {partial: true}),
        },
      },
    })
    cuentas: Cuentas,
    @param.where(Cuentas) where?: Where<Cuentas>,
  ): Promise<Count> {
    return this.cuentasRepository.updateAll(cuentas, where);
  }

  @get('/cuentas/{id}')
  @response(200, {
    description: 'Cuentas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cuentas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cuentas, {exclude: 'where'}) filter?: FilterExcludingWhere<Cuentas>
  ): Promise<Cuentas> {
    return this.cuentasRepository.findById(id, filter);
  }

  @patch('/cuentas/{id}')
  @response(204, {
    description: 'Cuentas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cuentas, {partial: true}),
        },
      },
    })
    cuentas: Cuentas,
  ): Promise<void> {
    await this.cuentasRepository.updateById(id, cuentas);
  }

  @put('/cuentas/{id}')
  @response(204, {
    description: 'Cuentas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cuentas: Cuentas,
  ): Promise<void> {
    await this.cuentasRepository.replaceById(id, cuentas);
  }

  @del('/cuentas/{id}')
  @response(204, {
    description: 'Cuentas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.cuentasRepository.deleteById(id);
  }
}
