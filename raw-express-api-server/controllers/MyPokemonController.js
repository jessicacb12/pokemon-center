const {MyPokemonFacade} = require("../facades");

async function list(req){
    return MyPokemonFacade.list(req);
}

async function create(req){
    return MyPokemonFacade.create(req.body);
}

async function del(req){
    return MyPokemonFacade.del(req.body);
}

async function count(req){
    return MyPokemonFacade.count(req.body);
}

module.exports = {
    list,
    create,
    del,
    count
};