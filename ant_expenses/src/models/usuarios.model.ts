import {Entity, model, property, hasMany} from '@loopback/repository';
import {CategoriasGastos} from './categorias-gastos.model';
import {TiposCuentas} from './tipos-cuentas.model';
import {Transacciones} from './transacciones.model';

@model()
export class Usuarios extends Entity {
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
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => CategoriasGastos)
  categoriasGastos: CategoriasGastos[];

  @hasMany(() => TiposCuentas)
  tiposCuentas: TiposCuentas[];

  @hasMany(() => Transacciones)
  transacciones: Transacciones[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
