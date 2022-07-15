import "reflect-metadata"
import { DataSource } from "typeorm"
import dataSourceOptions from "../config/dataSourceOptions"

export const AppDataSource = new DataSource(dataSourceOptions)