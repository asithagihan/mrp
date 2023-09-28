import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "nubpew-ryxto7-hYnxaz",
  database: process.env.DB_NAME,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
  migrations: ["migration/*"],
  migrationsTableName: "custom_migration_table",
});

export { dataSource };
