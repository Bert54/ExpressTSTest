import Knex from 'knex';

import { ConfigService, SqlDbConfig } from '../../../common/config';

export function newSQLDatabase(config: ConfigService) {
  const dbConfig: SqlDbConfig = config.getConfig<SqlDbConfig>('sql-database');

  const db = Knex({
    client: dbConfig.client,
    connection: {
      host: dbConfig.host,
      database: dbConfig.database,
      user: dbConfig.username,
      password: dbConfig.password,
      port: dbConfig.port,
    },
  });

  return db;
}
