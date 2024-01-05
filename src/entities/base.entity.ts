import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
@Entity({ abstract: true })
export abstract class NestBaseEntity {
  @PrimaryKey()
  id = uuid();

  @Property({ hidden: true })
  deleted_at?: Date | null;

  @Property()
  created_at = new Date();

  @Property({
    onUpdate: () => new Date(),
  })
  updated_at = new Date();
}
