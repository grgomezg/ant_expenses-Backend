import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {CategoriasGastos} from './categorias-gastos.model';
import {Cuentas} from './cuentas.model';

@model()
export class TiposCuentas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @hasMany(() => CategoriasGastos)
  categoriasGastos: CategoriasGastos[];

  @hasMany(() => Cuentas)
  cuentas: Cuentas[];

  constructor(data?: Partial<TiposCuentas>) {
    super(data);
  }
}

export interface TiposCuentasRelations {
  // describe navigational properties here
}

export type TiposCuentasWithRelations = TiposCuentas & TiposCuentasRelations;
