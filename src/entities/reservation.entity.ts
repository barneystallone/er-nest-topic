import { Entity, Property } from '@mikro-orm/core';
import { NestBaseEntity } from './base.entity';

/**
 * @todo refactor userId, placeId, invoiceId later
 */
@Entity({ tableName: 'reservations' })
export class Reservation extends NestBaseEntity {
  @Property()
  start_date!: Date;

  @Property()
  end_date!: Date;

  @Property()
  place_id!: string;

  @Property()
  user_id!: string;

  @Property()
  invoice_id!: string;
}
