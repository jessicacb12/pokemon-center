'use strict';
module.exports = (sequelize, DataTypes) => {
  const MyPokemon = sequelize.define('MyPokemon', {
    numb: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    id: DataTypes.INTEGER,
    nickname: DataTypes.STRING
  }, {});
  MyPokemon.associate = function(models) {
    // associations can be defined here
  };
  return MyPokemon;
};