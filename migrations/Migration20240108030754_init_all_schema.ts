import { Migration } from '@mikro-orm/migrations';

export class Migration20240108030754_init_all_schema extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `reservations` (`id` varchar(255) not null, `deleted_at` datetime null, `created_at` datetime not null, `updated_at` datetime not null, `start_date` datetime not null, `end_date` datetime not null, `place_id` varchar(255) not null, `user_id` varchar(255) not null, `invoice_id` varchar(255) not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');

    this.addSql('create table `users` (`id` varchar(255) not null, `deleted_at` datetime null, `created_at` datetime not null, `updated_at` datetime not null, `name` varchar(255) null, `avatar` varchar(255) null, `email` varchar(255) not null, `password` varchar(255) not null, `is_verified` tinyint(1) not null default false, `roles` text not null, primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add index `users_email_index`(`email`);');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
  }

}
