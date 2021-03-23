
import Sequelize, { DataTypes, Model } from "sequelize";

import { con } from '../config';

export let sequelize = new Sequelize(con.database, con.username, con.password, con);

  const userType = {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_name: DataTypes.STRING,
    user_password: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  };

//export const users = sequelize.define('users',userType);

export default class User extends Model {
  static init(sequelize) {
    return super.init(
      userType,
      {
        sequelize: sequelize,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        tableName: "users"
      }
    );
  }
}

