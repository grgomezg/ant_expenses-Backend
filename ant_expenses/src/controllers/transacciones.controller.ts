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
import {Transacciones} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository : TransaccionesRepository,
  ) {}

  @post('/transacciones')
  @response(200, {
    description: 'Transacciones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transacciones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {
            title: 'NewTransacciones',
            exclude: ['id'],
          }),
        },
      },
    })
    transacciones: Omit<Transacciones, 'id'>,
  ): Promise<Transacciones> {
    return this.transaccionesRepository.create(transacciones);
  }

  @get('/transacciones/count')
  @response(200, {
    description: 'Transacciones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transacciones) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.transaccionesRepository.count(where);
  }

  @get('/transacciones')
  @response(200, {
    description: 'Array of Transacciones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transacciones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transacciones) filter?: Filter<Transacciones>,
  ): Promise<Transacciones[]> {
    return this.transaccionesRepository.find(filter);
  }

  @patch('/transacciones')
  @response(200, {
    description: 'Transacciones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {partial: true}),
        },
      },
    })
    transacciones: Transacciones,
    @param.where(Transacciones) where?: Where<Transacciones>,
  ): Promise<Count> {
    return this.transaccionesRepository.updateAll(transacciones, where);
  }

  @get('/transacciones/{id}')
  @response(200, {
    description: 'Transacciones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transacciones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Transacciones, {exclude: 'where'}) filter?: FilterExcludingWhere<Transacciones>
  ): Promise<Transacciones> {
    return this.transaccionesRepository.findById(id, filter);
  }

  @patch('/transacciones/{id}')
  @response(204, {
    description: 'Transacciones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transacciones, {partial: true}),
        },
      },
    })
    transacciones: Transacciones,
  ): Promise<void> {
    await this.transaccionesRepository.updateById(id, transacciones);
  }

  @put('/transacciones/{id}')
  @response(204, {
    description: 'Transacciones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transacciones: Transacciones,
  ): Promise<void> {
    await this.transaccionesRepository.replaceById(id, transacciones);
  }

  @del('/transacciones/{id}')
  @response(204, {
    description: 'Transacciones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transaccionesRepository.deleteById(id);
  }
}
