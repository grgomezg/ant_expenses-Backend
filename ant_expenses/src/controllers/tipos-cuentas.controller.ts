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
import {TiposCuentas} from '../models';
import {TiposCuentasRepository} from '../repositories';

export class TiposCuentasController {
  constructor(
    @repository(TiposCuentasRepository)
    public tiposCuentasRepository : TiposCuentasRepository,
  ) {}

  @post('/tipos-cuentas')
  @response(200, {
    description: 'TiposCuentas model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposCuentas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposCuentas, {
            title: 'NewTiposCuentas',
            exclude: ['id'],
          }),
        },
      },
    })
    tiposCuentas: Omit<TiposCuentas, 'id'>,
  ): Promise<TiposCuentas> {
    return this.tiposCuentasRepository.create(tiposCuentas);
  }

  @get('/tipos-cuentas/count')
  @response(200, {
    description: 'TiposCuentas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposCuentas) where?: Where<TiposCuentas>,
  ): Promise<Count> {
    return this.tiposCuentasRepository.count(where);
  }

  @get('/tipos-cuentas')
  @response(200, {
    description: 'Array of TiposCuentas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposCuentas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposCuentas) filter?: Filter<TiposCuentas>,
  ): Promise<TiposCuentas[]> {
    return this.tiposCuentasRepository.find(filter);
  }

  @patch('/tipos-cuentas')
  @response(200, {
    description: 'TiposCuentas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposCuentas, {partial: true}),
        },
      },
    })
    tiposCuentas: TiposCuentas,
    @param.where(TiposCuentas) where?: Where<TiposCuentas>,
  ): Promise<Count> {
    return this.tiposCuentasRepository.updateAll(tiposCuentas, where);
  }

  @get('/tipos-cuentas/{id}')
  @response(200, {
    description: 'TiposCuentas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposCuentas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TiposCuentas, {exclude: 'where'}) filter?: FilterExcludingWhere<TiposCuentas>
  ): Promise<TiposCuentas> {
    return this.tiposCuentasRepository.findById(id, filter);
  }

  @patch('/tipos-cuentas/{id}')
  @response(204, {
    description: 'TiposCuentas PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposCuentas, {partial: true}),
        },
      },
    })
    tiposCuentas: TiposCuentas,
  ): Promise<void> {
    await this.tiposCuentasRepository.updateById(id, tiposCuentas);
  }

  @put('/tipos-cuentas/{id}')
  @response(204, {
    description: 'TiposCuentas PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tiposCuentas: TiposCuentas,
  ): Promise<void> {
    await this.tiposCuentasRepository.replaceById(id, tiposCuentas);
  }

  @del('/tipos-cuentas/{id}')
  @response(204, {
    description: 'TiposCuentas DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiposCuentasRepository.deleteById(id);
  }
}
