import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Transacciones} from './transacciones.model';
import {TiposCuentas} from './tipos-cuentas.model';

@model()
export class Cuentas extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  balance: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => Transacciones)
  transacciones: Transacciones[];

  @belongsTo(() => TiposCuentas)
  tiposCuentasId: string;

  constructor(data?: Partial<Cuentas>) {
    super(data);
  }
}

export interface CuentasRelations {
  // describe navigational properties here
}

export type CuentasWithRelations = Cuentas & CuentasRelations;
