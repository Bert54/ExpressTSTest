import Knex from 'knex';

import { ConfigService, SqlDbConfig } from '../../../common/config';

export class SQLDatabase {
  private db;

  constructor(config: ConfigService) {
    const dbConfig: SqlDbConfig = config.getConfig<SqlDbConfig>('sql-database');
    this.db = Knex({
      client: dbConfig.client,
      connection: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.username,
        password: dbConfig.password,
        port: dbConfig.port,
      },
    });
    // Test the connection to ensure it is working. This throws an error if that's not the case
    this.testConnection().then();
  }

  async testConnection() {
    await this.runQuery('SELECT now()').catch((err: Error) => {
      throw new Error(
        `Database connection has not been established properly. Ensure connection is valid. [error: ${err.message}]`,
      );
    });
  }

  async runQuery<T>(query: string, parameters?: string[]): Promise<T[]> {
    if (parameters === undefined) {
      parameters = [];
    }
    return this.db.raw(query, parameters).then((resp) => {
      const results: T[] = [];
      if (!!resp.rows && Array.isArray(resp.rows)) {
        resp.rows.forEach((elem: T) => results.push(elem));
      }
      return results;
    });
  }
}
