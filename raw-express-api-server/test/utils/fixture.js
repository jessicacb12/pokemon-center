const sequelizeFixtures = require("sequelize-fixtures");
const models = require("../../models");

module.exports = {
  truncate,
  reload,
  load,
};

async function truncate() {
  const promises = [];
  const sequelizeModelsEntries = Object.entries(models.sequelize.models);
  for (let i = 0; i < sequelizeModelsEntries.length; i += 1) {
    const sequelizeModel = sequelizeModelsEntries[i][1];
    promises.push(sequelizeModel.destroy({
      truncate: true,
      where: {},
    }));
  }
  await Promise.all(promises);
}

async function reload(name) {
  await truncate();
  await sequelizeFixtures.loadFile(`${__dirname}/../fixtures/base/*.fixture.js`, models, {
    log: logger,
  });
  if (name) {
    await load(name);
  }
}

async function load(name) {
  const uri = `${__dirname}/../fixtures/custom/${name}.fixture.js`;
  await sequelizeFixtures.loadFile(uri, models, {
    log: logger,
  });
}

function logger() { }
