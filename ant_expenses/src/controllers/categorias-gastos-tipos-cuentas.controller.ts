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
  TiposCuentas,
} from '../models';
import {CategoriasGastosRepository} from '../repositories';

export class CategoriasGastosTiposCuentasController {
  constructor(
    @repository(CategoriasGastosRepository)
    public categoriasGastosRepository: CategoriasGastosRepository,
  ) { }

  @get('/categorias-gastos/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'TiposCuentas belonging to CategoriasGastos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TiposCuentas)},
          },
        },
      },
    },
  })
  async getTiposCuentas(
    @param.path.string('id') id: typeof CategoriasGastos.prototype.id,
  ): Promise<TiposCuentas> {
    return this.categoriasGastosRepository.tiposCuentas(id);
  }
}
