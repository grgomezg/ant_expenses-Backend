import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, CategoriasGastos, TiposCuentas, Transacciones} from '../models';
import {CategoriasGastosRepository} from './categorias-gastos.repository';
import {TiposCuentasRepository} from './tipos-cuentas.repository';
import {TransaccionesRepository} from './transacciones.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly categoriasGastos: HasManyRepositoryFactory<CategoriasGastos, typeof Usuarios.prototype.id>;

  public readonly tiposCuentas: HasManyRepositoryFactory<TiposCuentas, typeof Usuarios.prototype.id>;

  public readonly transacciones: HasManyRepositoryFactory<Transacciones, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CategoriasGastosRepository') protected categoriasGastosRepositoryGetter: Getter<CategoriasGastosRepository>, @repository.getter('TiposCuentasRepository') protected tiposCuentasRepositoryGetter: Getter<TiposCuentasRepository>, @repository.getter('TransaccionesRepository') protected transaccionesRepositoryGetter: Getter<TransaccionesRepository>,
  ) {
    super(Usuarios, dataSource);
    this.transacciones = this.createHasManyRepositoryFactoryFor('transacciones', transaccionesRepositoryGetter,);
    this.registerInclusionResolver('transacciones', this.transacciones.inclusionResolver);
    this.tiposCuentas = this.createHasManyRepositoryFactoryFor('tiposCuentas', tiposCuentasRepositoryGetter,);
    this.registerInclusionResolver('tiposCuentas', this.tiposCuentas.inclusionResolver);
    this.categoriasGastos = this.createHasManyRepositoryFactoryFor('categoriasGastos', categoriasGastosRepositoryGetter,);
    this.registerInclusionResolver('categoriasGastos', this.categoriasGastos.inclusionResolver);
  }
}
