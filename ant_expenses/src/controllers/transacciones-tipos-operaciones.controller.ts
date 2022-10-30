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
  TiposOperaciones,
} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesTiposOperacionesController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository: TransaccionesRepository,
  ) { }

  @get('/transacciones/{id}/tipos-operaciones', {
    responses: {
      '200': {
        description: 'TiposOperaciones belonging to Transacciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TiposOperaciones)},
          },
        },
      },
    },
  })
  async getTiposOperaciones(
    @param.path.string('id') id: typeof Transacciones.prototype.id,
  ): Promise<TiposOperaciones> {
    return this.transaccionesRepository.tiposOperaciones(id);
  }
}
