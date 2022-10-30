import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Transacciones, TransaccionesRelations, Usuarios, CategoriasGastos, TiposOperaciones, Cuentas} from '../models';
import {UsuariosRepository} from './usuarios.repository';
import {CategoriasGastosRepository} from './categorias-gastos.repository';
import {TiposOperacionesRepository} from './tipos-operaciones.repository';
import {CuentasRepository} from './cuentas.repository';

export class TransaccionesRepository extends DefaultCrudRepository<
  Transacciones,
  typeof Transacciones.prototype.id,
  TransaccionesRelations
> {

  public readonly usuarios: BelongsToAccessor<Usuarios, typeof Transacciones.prototype.id>;

  public readonly categoriasGastos: BelongsToAccessor<CategoriasGastos, typeof Transacciones.prototype.id>;

  public readonly tiposOperaciones: BelongsToAccessor<TiposOperaciones, typeof Transacciones.prototype.id>;

  public readonly cuentas: BelongsToAccessor<Cuentas, typeof Transacciones.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>, @repository.getter('CategoriasGastosRepository') protected categoriasGastosRepositoryGetter: Getter<CategoriasGastosRepository>, @repository.getter('TiposOperacionesRepository') protected tiposOperacionesRepositoryGetter: Getter<TiposOperacionesRepository>, @repository.getter('CuentasRepository') protected cuentasRepositoryGetter: Getter<CuentasRepository>,
  ) {
    super(Transacciones, dataSource);
    this.cuentas = this.createBelongsToAccessorFor('cuentas', cuentasRepositoryGetter,);
    this.registerInclusionResolver('cuentas', this.cuentas.inclusionResolver);
    this.tiposOperaciones = this.createBelongsToAccessorFor('tiposOperaciones', tiposOperacionesRepositoryGetter,);
    this.registerInclusionResolver('tiposOperaciones', this.tiposOperaciones.inclusionResolver);
    this.categoriasGastos = this.createBelongsToAccessorFor('categoriasGastos', categoriasGastosRepositoryGetter,);
    this.registerInclusionResolver('categoriasGastos', this.categoriasGastos.inclusionResolver);
    this.usuarios = this.createBelongsToAccessorFor('usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
