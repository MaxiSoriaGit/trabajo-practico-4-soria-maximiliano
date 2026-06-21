import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('movies', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;