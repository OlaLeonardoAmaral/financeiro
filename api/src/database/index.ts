import { Sequelize } from "sequelize-typescript";
import User from "../models/User";
import Transacoes from "../models/Transacoes";
import Categorias from "../models/Categorias";
import Parcelas from "../models/Parcelas";



const dbConfig = require("../config/database");
const sequelize = new Sequelize(dbConfig);

const models = [
  User,
  Transacoes,
  Categorias,
  Parcelas
];

sequelize.addModels(models);

export default sequelize;