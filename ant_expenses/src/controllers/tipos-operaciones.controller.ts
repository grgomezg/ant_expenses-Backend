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
import {TiposOperaciones} from '../models';
import {TiposOperacionesRepository} from '../repositories';

export class TiposOperacionesController {
  constructor(
    @repository(TiposOperacionesRepository)
    public tiposOperacionesRepository : TiposOperacionesRepository,
  ) {}

  @post('/tipos-operaciones')
  @response(200, {
    description: 'TiposOperaciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(TiposOperaciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposOperaciones, {
            title: 'NewTiposOperaciones',
            exclude: ['id'],
          }),
        },
      },
    })
    tiposOperaciones: Omit<TiposOperaciones, 'id'>,
  ): Promise<TiposOperaciones> {
    return this.tiposOperacionesRepository.create(tiposOperaciones);
  }

  @get('/tipos-operaciones/count')
  @response(200, {
    description: 'TiposOperaciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TiposOperaciones) where?: Where<TiposOperaciones>,
  ): Promise<Count> {
    return this.tiposOperacionesRepository.count(where);
  }

  @get('/tipos-operaciones')
  @response(200, {
    description: 'Array of TiposOperaciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TiposOperaciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TiposOperaciones) filter?: Filter<TiposOperaciones>,
  ): Promise<TiposOperaciones[]> {
    return this.tiposOperacionesRepository.find(filter);
  }

  @patch('/tipos-operaciones')
  @response(200, {
    description: 'TiposOperaciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposOperaciones, {partial: true}),
        },
      },
    })
    tiposOperaciones: TiposOperaciones,
    @param.where(TiposOperaciones) where?: Where<TiposOperaciones>,
  ): Promise<Count> {
    return this.tiposOperacionesRepository.updateAll(tiposOperaciones, where);
  }

  @get('/tipos-operaciones/{id}')
  @response(200, {
    description: 'TiposOperaciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TiposOperaciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TiposOperaciones, {exclude: 'where'}) filter?: FilterExcludingWhere<TiposOperaciones>
  ): Promise<TiposOperaciones> {
    return this.tiposOperacionesRepository.findById(id, filter);
  }

  @patch('/tipos-operaciones/{id}')
  @response(204, {
    description: 'TiposOperaciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TiposOperaciones, {partial: true}),
        },
      },
    })
    tiposOperaciones: TiposOperaciones,
  ): Promise<void> {
    await this.tiposOperacionesRepository.updateById(id, tiposOperaciones);
  }

  @put('/tipos-operaciones/{id}')
  @response(204, {
    description: 'TiposOperaciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tiposOperaciones: TiposOperaciones,
  ): Promise<void> {
    await this.tiposOperacionesRepository.replaceById(id, tiposOperaciones);
  }

  @del('/tipos-operaciones/{id}')
  @response(204, {
    description: 'TiposOperaciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tiposOperacionesRepository.deleteById(id);
  }
}
