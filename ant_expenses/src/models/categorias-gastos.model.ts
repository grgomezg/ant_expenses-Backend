import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {TiposCuentas} from './tipos-cuentas.model';
import {Transacciones} from './transacciones.model';

@model()
export class CategoriasGastos extends Entity {
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

  @belongsTo(() => TiposCuentas)
  tiposCuentasId: string;

  @hasMany(() => Transacciones)
  transacciones: Transacciones[];

  constructor(data?: Partial<CategoriasGastos>) {
    super(data);
  }
}

export interface CategoriasGastosRelations {
  // describe navigational properties here
}

export type CategoriasGastosWithRelations = CategoriasGastos & CategoriasGastosRelations;
