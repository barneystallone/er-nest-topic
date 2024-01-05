import { CryptoHelper, ROLES } from '@/common';
import {
  BeforeCreate,
  BeforeUpdate,
  BeforeUpsert,
  Entity,
  Enum,
  EventArgs,
  Property,
} from '@mikro-orm/core';
import { NestBaseEntity } from './base.entity';

/**
 * @todo refactor userId, placeId, invoiceId later
 */
@Entity({ tableName: 'users' })
export class User extends NestBaseEntity {
  @Property()
  name?: string;

  @Property()
  avatar?: string; // url

  @Property({ unique: true, index: true })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property()
  isVerified: boolean = false;

  @Enum(() => ROLES)
  roles: ROLES[] = [ROLES.USER];

  /**
   * @see https://mikro-orm.io/docs/events#eventargs
   */
  @BeforeCreate()
  @BeforeUpdate()
  @BeforeUpsert()
  async hashPassword(args: EventArgs<this>) {
    if (args.changeSet?.payload?.password) {
      this.password = await CryptoHelper.bcryptHash(this.password);
    }
  }
}
