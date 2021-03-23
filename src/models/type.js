import { DataTypes } from 'sequelize';

export const noteType = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    key: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.STRING
}

