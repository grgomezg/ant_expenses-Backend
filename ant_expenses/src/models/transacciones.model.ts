import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuarios} from './usuarios.model';
import {CategoriasGastos} from './categorias-gastos.model';
import {TiposOperaciones} from './tipos-operaciones.model';
import {Cuentas} from './cuentas.model';

@model()
export class Transacciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaTransaccion: string;

  @property({
    type: 'number',
    required: true,
  })
  monto: number;

  @property({
    type: 'string',
    required: true,
  })
  nota: string;

  @belongsTo(() => Usuarios)
  usuariosId: string;

  @belongsTo(() => CategoriasGastos)
  categoriasGastosId: string;

  @belongsTo(() => TiposOperaciones)
  tiposOperacionesId: string;

  @belongsTo(() => Cuentas)
  cuentasId: string;

  constructor(data?: Partial<Transacciones>) {
    super(data);
  }
}

export interface TransaccionesRelations {
  // describe navigational properties here
}

export type TransaccionesWithRelations = Transacciones & TransaccionesRelations;
