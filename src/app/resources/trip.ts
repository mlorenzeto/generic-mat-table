import { Column } from "../decorators/column";
import { autoserializeAs } from "cerializr";

export class Trip {
  @autoserializeAs(Number)
  @Column({
    name: 'ID',
    canSort: true,
  })
  id: number;

  @autoserializeAs(String)
  @Column({
    name: 'Data da Viagem',
    canSort: true,
  })
  date: string;

  @autoserializeAs(String)
  @Column({
    name: 'Tempo',
    canSort: true,
  })
  time: string;

  @autoserializeAs(String)
  @Column({
    name: 'Motorista',
    canSort: true,
  })
  driver: string;

  @autoserializeAs(Number)
  car_id: number;
}
