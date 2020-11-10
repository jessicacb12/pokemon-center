const {
  Router,
} = require("../modules");
const {
  MyPokemonController
} = require("../controllers");

const router = new Router();

// my pokemon list
router.post("/pokemon-release", MyPokemonController.del);
router.post("/pokemon-caught", MyPokemonController.create);
router.post("/pokemon-count", MyPokemonController.count);
router.get("/my-list", function (req) {
  return MyPokemonController.list(req.query)
});

module.exports = router;
