import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TiposCuentas, TiposCuentasRelations, Usuarios, CategoriasGastos, Cuentas} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {CategoriasGastosRepository} from './categorias-gastos.repository';
import {CuentasRepository} from './cuentas.repository';

export class TiposCuentasRepository extends DefaultCrudRepository<
  TiposCuentas,
  typeof TiposCuentas.prototype.id,
  TiposCuentasRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof TiposCuentas.prototype.id>;

  public readonly categoriasGastos: HasManyRepositoryFactory<CategoriasGastos, typeof TiposCuentas.prototype.id>;

  public readonly cuentas: HasManyRepositoryFactory<Cuentas, typeof TiposCuentas.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('CategoriasGastosRepository') protected categoriasGastosRepositoryGetter: Getter<CategoriasGastosRepository>, @repository.getter('CuentasRepository') protected cuentasRepositoryGetter: Getter<CuentasRepository>,
  ) {
    super(TiposCuentas, dataSource);
    this.cuentas = this.createHasManyRepositoryFactoryFor('cuentas', cuentasRepositoryGetter,);
    this.registerInclusionResolver('cuentas', this.cuentas.inclusionResolver);
    this.categoriasGastos = this.createHasManyRepositoryFactoryFor('categoriasGastos', categoriasGastosRepositoryGetter,);
    this.registerInclusionResolver('categoriasGastos', this.categoriasGastos.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
