import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { sequelizeOperationsAPI } from "./operations-api.js";

//realizare conexiune la BD
const sequelizeConnection = new Sequelize(
  "movie_manager",
  "root",
  "demo",
  sequelizeConfigProps
);

//creare tabela Movies
export const Movies = sequelizeConnection.define("Movies", {
  movieId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      min: 3
    }
  },
  category: {
    type: Sequelize.ENUM,
    values: ['Action', 'Comedy', 'Thriller', 'Horror', 'Drama']
  },
  publication_date: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: true
    }
  }
});


//creare tabela CrewMembers
export const CrewMembers = sequelizeConnection.define("CrewMembers", {
  memberId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
      min: 5
    }
  },
  role: {
    type: Sequelize.ENUM,
    values: ["Director", "Producer", "Writer", "Actor"]
  }
});


//realizare legatura One to Many intre cele 2 tabele:
Movies.hasMany(CrewMembers, {
  foreignKey: "movieId",
  onDelete: "CASCADE", //cand stergem o inreg din CrewMembers sa se stearga inregistrarile aferente din Movies
  onUpdate: "RESTRICT",
  foreignKeyConstraint: true,
});

//autentificare in BD
sequelizeOperationsAPI.init(sequelizeConnection);

export { sequelizeConnection };