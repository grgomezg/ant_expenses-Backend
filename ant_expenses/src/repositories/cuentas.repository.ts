import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cuentas, CuentasRelations, Transacciones, TiposCuentas} from '../models';
import {TransaccionesRepository} from './transacciones.repository';
import {TiposCuentasRepository} from './tipos-cuentas.repository';

export class CuentasRepository extends DefaultCrudRepository<
  Cuentas,
  typeof Cuentas.prototype.id,
  CuentasRelations
> {

  public readonly transacciones: HasManyRepositoryFactory<Transacciones, typeof Cuentas.prototype.id>;

  public readonly tiposCuentas: BelongsToAccessor<TiposCuentas, typeof Cuentas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TransaccionesRepository') protected transaccionesRepositoryGetter: Getter<TransaccionesRepository>, @repository.getter('TiposCuentasRepository') protected tiposCuentasRepositoryGetter: Getter<TiposCuentasRepository>,
  ) {
    super(Cuentas, dataSource);
    this.tiposCuentas = this.createBelongsToAccessorFor('tiposCuentas', tiposCuentasRepositoryGetter,);
    this.registerInclusionResolver('tiposCuentas', this.tiposCuentas.inclusionResolver);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionesRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
  }
}
