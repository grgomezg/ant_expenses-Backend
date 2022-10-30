import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TiposCuentas,
  Usuarios,
} from '../models';
import {TiposCuentasRepository} from '../repositories';

export class TiposCuentasUsuariosController {
  constructor(
    @repository(TiposCuentasRepository)
    public tiposCuentasRepository: TiposCuentasRepository,
  ) { }

  @get('/tipos-cuentas/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to TiposCuentas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof TiposCuentas.prototype.id,
  ): Promise<Usuarios> {
    return this.tiposCuentasRepository.usuarios(id);
  }
}
