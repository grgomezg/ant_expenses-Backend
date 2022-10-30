import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Transacciones,
  CategoriasGastos,
} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesCategoriasGastosController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository: TransaccionesRepository,
  ) { }

  @get('/transacciones/{id}/categorias-gastos', {
    responses: {
      '200': {
        description: 'CategoriasGastos belonging to Transacciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(CategoriasGastos)},
          },
        },
      },
    },
  })
  async getCategoriasGastos(
    @param.path.string('id') id: typeof Transacciones.prototype.id,
  ): Promise<CategoriasGastos> {
    return this.transaccionesRepository.categoriasGastos(id);
  }
}
