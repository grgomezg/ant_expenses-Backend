import {Entity, model, property, hasMany} from '@loopback/repository';
import {Transacciones} from './transacciones.model';

@model()
export class TiposOperaciones extends Entity {
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
  descripcion: string;

  @hasMany(() => Transacciones)
  transacciones: Transacciones[];

  constructor(data?: Partial<TiposOperaciones>) {
    super(data);
  }
}

export interface TiposOperacionesRelations {
  // describe navigational properties here
}

export type TiposOperacionesWithRelations = TiposOperaciones & TiposOperacionesRelations;
