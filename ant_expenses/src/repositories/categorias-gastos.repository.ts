import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {CategoriasGastos, CategoriasGastosRelations, Usuarios, TiposCuentas, Transacciones} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {TiposCuentasRepository} from './tipos-cuentas.repository';
import {TransaccionesRepository} from './transacciones.repository';

export class CategoriasGastosRepository extends DefaultCrudRepository<
  CategoriasGastos,
  typeof CategoriasGastos.prototype.id,
  CategoriasGastosRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof CategoriasGastos.prototype.id>;

  public readonly tiposCuentas: BelongsToAccessor<TiposCuentas, typeof CategoriasGastos.prototype.id>;

  public readonly transacciones: HasManyRepositoryFactory<Transacciones, typeof CategoriasGastos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('TiposCuentasRepository') protected tiposCuentasRepositoryGetter: Getter<TiposCuentasRepository>, @repository.getter('TransaccionesRepository') protected transaccionesRepositoryGetter: Getter<TransaccionesRepository>,
  ) {
    super(CategoriasGastos, dataSource);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionesRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
    this.tiposCuentas = this.createBelongsToAccessorFor('tiposCuentas', tiposCuentasRepositoryGetter,);
    this.registerInclusionResolver('tiposCuentas', this.tiposCuentas.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
