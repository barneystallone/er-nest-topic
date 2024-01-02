import { Options } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const baseConfig = () =>
  ({
    type: 'mysql',
    entities: ['dist/entities/*.entity.js'],
    entitiesTs: ['src/entities/*.entity.ts'],
    debug: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    seeder: {
      path: 'dist/databases/seeders',
      pathTs: 'src/databases/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
      defaultSeeder: 'DatabaseSeeder', // default seeder class name
      glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
      emit: 'ts', // seeder generation mode
      fileName: (className: string) => className, // seeder file naming convention
    },
    migrations: {
      tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
      glob: '!(*.d).{js,ts}',
      path: './migrations', // path to the folder with migrations
      pathTs: './migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: true, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: true, // allow to disable table and column dropping
      snapshot: true, // save snapshot when creating new migrations
      emit: 'ts', // migration generation mode
    },
  }) as Options;

export default baseConfig();
