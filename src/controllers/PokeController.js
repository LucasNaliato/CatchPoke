const Pokedex = require("pokedex"),
  pokedex = new Pokedex();

const user = require("./UserController");

class PokeController {
  FindPokemonView(req, res) {
    res.status(200).render("findPokemon");
  }

  FindPokemonByIdOrName(req, res) {
    if (req.body.id) {
      const id = parseInt(req.body.id);
      const pokemon = pokedex.pokemon(id);
      res.status(200).render("viewPokemon", { pokemon });
      return;
    }

    if (req.body.name) {
      const name = req.body.name.toLowerCase();
      const pokemon = pokedex.pokemon(name);
      res.status(200).render("viewPokemon", { pokemon });
      return;
    }
  }

  FindRandomPokemon(req, res) {
    let randomId = Math.floor(Math.random() * 151);
    let message = "";

    if (randomId == 0) {
      randomId = 1;
    }

    if (
      randomId == 144 ||
      randomId == 145 ||
      randomId == 146 ||
      randomId == 150 ||
      randomId == 151
    ) {
      message = "Pokémon lendário! Capturá-lo será mais difícil!";
    } else {
      message = "Pokémon comum! Capturá-lo será mais fácil";
    }

    console.log(randomId);

    const pokemon = pokedex.pokemon(randomId);

    res.status(200).render("wild", { pokemon, message });
  }

  CatchPokemon(req, res) {
    const id = parseInt(req.params.id);

    const userId = JSON.stringify(req.userId);
    const newId = parseInt(
      userId
        .replace("[", "")
        .replace("{", "")
        .replace('"id"', "")
        .replace("]", "")
        .replace("}", "")
        .replace(":", "")
    );

    const pokename = pokedex.pokemon(id).name;
    const pokemon = pokedex.pokemon(id);
    let legendary = false;
    let lucky = Math.floor(Math.random() * 100);

    if (id == 144 || id == 145 || id == 146 || id == 150 || id == 151) {
      legendary = true;
    }

    if (legendary == true) {
      lucky = Math.floor(Math.random() * 1000);

      if (lucky >= 900) {
        message = `Parabéns, você capturou ${pokename}, ele é um pokémon lendário!`;
        user.CheckPoke1(newId, pokename, res);
        return;
      } else {
        message = `Eita, ${pokename} escapou! Ele era um lendário!`;
        res.status(300).redirect("/wild");
        return;
      }
    }

    if (legendary == false) {
      if (lucky >= 50) {
        user.CheckPoke1(newId, pokename, res);
        return;
      } else {
        res.status(300).redirect("/wild");
        return;
      }
    }
    console.log(lucky);
    res.status(200).render("wild", { pokemon });
  }
}

module.exports = new PokeController();
