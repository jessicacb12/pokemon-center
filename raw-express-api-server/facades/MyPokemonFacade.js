const { MyPokemon } = require("../models");

module.exports = {
    list,
    create,
    del,
    count
}

async function list(data) {
    const records = await MyPokemon.findAll({
        attributes: ['numb', 'id', 'nickname'],
        offset: parseInt(data.offset),
        limit: 50
    });
    return records;
}

async function create(data) {
    const record = await MyPokemon.create(data);
    return record;
}

async function get(numb) {
    const record = await MyPokemon.findByPk(numb);
    if (!record) { throw new NotFoundException(numb, "MyPokemon"); }
    return record;
}

async function del(data) {
    const record = await get(data.numb);
    await record.destroy();
    return {
        success: true,
    };
}

async function count(data) {
    const total = await MyPokemon.count({
        where: data
    });
    return {owned: total};
}