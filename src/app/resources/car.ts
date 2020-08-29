import { Column } from "../decorators/column";
import { autoserializeAs } from "cerializr";
import { MatButton } from '@angular/material/button';

export class Car {
  @autoserializeAs(Number)
  @Column({
    name: 'ID',
    canSort: true,
  })
  id: number;

  @autoserializeAs(String)
  @Column({
    name: 'Fabricante',
    canSort: true,
  })
  maker: string;

  @autoserializeAs(String)
  @Column({
    name: 'Modelo',
    order: 1,
    canSort: true,
  })
  model: string;

  @autoserializeAs(Number)
  @Column({
    name: 'Ano',
    canSort: true,
  })
  year: number;

  @Column({
    name: 'Detalhes',
    icon: 'text_snippet',
    isButton: true,
    order: 1,
  })
  detail: MatButton;
}
