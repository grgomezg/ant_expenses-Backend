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
  Cuentas,
} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesCuentasController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository: TransaccionesRepository,
  ) { }

  @get('/transacciones/{id}/cuentas', {
    responses: {
      '200': {
        description: 'Cuentas belonging to Transacciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cuentas)},
          },
        },
      },
    },
  })
  async getCuentas(
    @param.path.string('id') id: typeof Transacciones.prototype.id,
  ): Promise<Cuentas> {
    return this.transaccionesRepository.cuentas(id);
  }
}
