import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/Task";

// ini config datase

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todo",
    synchronize: true,
    logging: false,
    entities: [Task],
    migrations: [],
    subscribers: [],
})
