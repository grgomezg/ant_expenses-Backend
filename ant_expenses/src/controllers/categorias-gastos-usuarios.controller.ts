import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  CategoriasGastos,
  Usuarios,
} from '../models';
import {CategoriasGastosRepository} from '../repositories';

export class CategoriasGastosUsuariosController {
  constructor(
    @repository(CategoriasGastosRepository)
    public categoriasGastosRepository: CategoriasGastosRepository,
  ) { }

  @get('/categorias-gastos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to CategoriasGastos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof CategoriasGastos.prototype.id,
  ): Promise<Usuarios> {
    return this.categoriasGastosRepository.usuarios(id);
  }
}
