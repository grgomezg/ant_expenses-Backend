import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cuentas,
  TiposCuentas,
} from '../models';
import {CuentasRepository} from '../repositories';

export class CuentasTiposCuentasController {
  constructor(
    @repository(CuentasRepository)
    public cuentasRepository: CuentasRepository,
  ) { }

  @get('/cuentas/{id}/tipos-cuentas', {
    responses: {
      '200': {
        description: 'TiposCuentas belonging to Cuentas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TiposCuentas)},
          },
        },
      },
    },
  })
  async getTiposCuentas(
    @param.path.string('id') id: typeof Cuentas.prototype.id,
  ): Promise<TiposCuentas> {
    return this.cuentasRepository.tiposCuentas(id);
  }
}
