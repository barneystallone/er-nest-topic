import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
@Entity({ abstract: true })
export abstract class NestBaseEntity {
  @PrimaryKey()
  id = uuid();

  @Property()
  deleted_at?: Date | null;

  @Property({ hidden: true })
  created_at = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updated_at = new Date();
}
