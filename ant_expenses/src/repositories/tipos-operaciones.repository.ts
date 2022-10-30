import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TiposOperaciones, TiposOperacionesRelations, Transacciones} from '../models';
import {TransaccionesRepository} from './transacciones.repository';

export class TiposOperacionesRepository extends DefaultCrudRepository<
  TiposOperaciones,
  typeof TiposOperaciones.prototype.id,
  TiposOperacionesRelations
> {

  public readonly transacciones: HasManyRepositoryFactory<Transacciones, typeof TiposOperaciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TransaccionesRepository') protected transaccionesRepositoryGetter: Getter<TransaccionesRepository>,
  ) {
    super(TiposOperaciones, dataSource);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionesRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
  }
}
