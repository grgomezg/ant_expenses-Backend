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
import {CategoriasGastos} from '../models';
import {CategoriasGastosRepository} from '../repositories';

export class CategoriasGastosController {
  constructor(
    @repository(CategoriasGastosRepository)
    public categoriasGastosRepository : CategoriasGastosRepository,
  ) {}

  @post('/categorias-gastos')
  @response(200, {
    description: 'CategoriasGastos model instance',
    content: {'application/json': {schema: getModelSchemaRef(CategoriasGastos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {
            title: 'NewCategoriasGastos',
            exclude: ['id'],
          }),
        },
      },
    })
    categoriasGastos: Omit<CategoriasGastos, 'id'>,
  ): Promise<CategoriasGastos> {
    return this.categoriasGastosRepository.create(categoriasGastos);
  }

  @get('/categorias-gastos/count')
  @response(200, {
    description: 'CategoriasGastos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(CategoriasGastos) where?: Where<CategoriasGastos>,
  ): Promise<Count> {
    return this.categoriasGastosRepository.count(where);
  }

  @get('/categorias-gastos')
  @response(200, {
    description: 'Array of CategoriasGastos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(CategoriasGastos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(CategoriasGastos) filter?: Filter<CategoriasGastos>,
  ): Promise<CategoriasGastos[]> {
    return this.categoriasGastosRepository.find(filter);
  }

  @patch('/categorias-gastos')
  @response(200, {
    description: 'CategoriasGastos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {partial: true}),
        },
      },
    })
    categoriasGastos: CategoriasGastos,
    @param.where(CategoriasGastos) where?: Where<CategoriasGastos>,
  ): Promise<Count> {
    return this.categoriasGastosRepository.updateAll(categoriasGastos, where);
  }

  @get('/categorias-gastos/{id}')
  @response(200, {
    description: 'CategoriasGastos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(CategoriasGastos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CategoriasGastos, {exclude: 'where'}) filter?: FilterExcludingWhere<CategoriasGastos>
  ): Promise<CategoriasGastos> {
    return this.categoriasGastosRepository.findById(id, filter);
  }

  @patch('/categorias-gastos/{id}')
  @response(204, {
    description: 'CategoriasGastos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CategoriasGastos, {partial: true}),
        },
      },
    })
    categoriasGastos: CategoriasGastos,
  ): Promise<void> {
    await this.categoriasGastosRepository.updateById(id, categoriasGastos);
  }

  @put('/categorias-gastos/{id}')
  @response(204, {
    description: 'CategoriasGastos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() categoriasGastos: CategoriasGastos,
  ): Promise<void> {
    await this.categoriasGastosRepository.replaceById(id, categoriasGastos);
  }

  @del('/categorias-gastos/{id}')
  @response(204, {
    description: 'CategoriasGastos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriasGastosRepository.deleteById(id);
  }
}
