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
  Usuarios,
} from '../models';
import {TransaccionesRepository} from '../repositories';

export class TransaccionesUsuariosController {
  constructor(
    @repository(TransaccionesRepository)
    public transaccionesRepository: TransaccionesRepository,
  ) { }

  @get('/transacciones/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to Transacciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof Transacciones.prototype.id,
  ): Promise<Usuarios> {
    return this.transaccionesRepository.usuarios(id);
  }
}
