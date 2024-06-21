import { Sequelize } from "sequelize-typescript";
import User from "../models/User";



const dbConfig = require("../config/database");
const sequelize = new Sequelize(dbConfig);

const models = [
  User
];

sequelize.addModels(models);

export default sequelize;