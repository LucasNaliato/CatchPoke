require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const db = require("../data/db");
const Pokedex = require("pokedex"),
  pokedex = new Pokedex();
const LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./src/scratch");

class UserController {
  Home(req, res) {
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

    db.all(`SELECT username FROM users WHERE id=${newId}`, (err, results) => {
      const username = results[0].username;
      res.status(200).render("home", { username });
    });
  }

  FindAll(req, res) {
    db.all(`SELECT * from users`, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (results.length == 0) {
        res.status(200).send("Nenhum usuário foi cadastrado!");
        return;
      }

      res.status(200).render("users", { results });
    });
  }

  CreateUser(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    db.run(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`,
      (err, results) => {
        if (err) {
          console.log(err);
        }

        res.status(300).redirect("/login");
      }
    );
  }

  Login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    db.all(
      `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`,
      (err, results) => {
        if (err) {
          console.log(err);
        }

        if (results == 0) {
          res.status(500).json({ message: "Login inválido" });
          return;
        }

        const id = results;
        const token = jwt.sign({ id }, process.env.SECRET, {
          expiresIn: 5000,
        });

        localStorage.setItem("jwt", token);
        res.status(300).redirect("/");
        return;
      }
    );
  }

  Bag(req, res) {
    const id = JSON.stringify(req.userId);

    const newId = parseInt(
      id
        .replace("[", "")
        .replace("{", "")
        .replace('"id"', "")
        .replace("]", "")
        .replace("}", "")
        .replace(":", "")
    );

    db.all(`SELECT poke1 from users WHERE id = ${newId}`, (err, results) => {
      if (err) {
        console.log(err);
      }

      const poke1 = results[0].poke1;

      db.all(`SELECT poke2 from users WHERE id = ${newId}`, (err, results) => {
        if (err) {
          console.log(err);
        }

        const poke2 = results[0].poke2;

        db.all(
          `SELECT poke3 from users WHERE id = ${newId}`,
          (err, results) => {
            if (err) {
              console.log(err);
            }

            const poke3 = results[0].poke3;

            db.all(
              `SELECT poke4 from users WHERE id = ${newId}`,
              (err, results) => {
                if (err) {
                  console.log(err);
                }

                const poke4 = results[0].poke4;

                db.all(
                  `SELECT poke5 from users WHERE id = ${newId}`,
                  (err, results) => {
                    if (err) {
                      console.log(err);
                    }

                    const poke5 = results[0].poke5;

                    db.all(
                      `SELECT poke6 from users WHERE id = ${newId}`,
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        }

                        const poke6 = results[0].poke6;

                        const pokemon1 = pokedex.pokemon(poke1);
                        const pokemon2 = pokedex.pokemon(poke2);
                        const pokemon3 = pokedex.pokemon(poke3);
                        const pokemon4 = pokedex.pokemon(poke4);
                        const pokemon5 = pokedex.pokemon(poke5);
                        const pokemon6 = pokedex.pokemon(poke6);

                        let pokemons = [
                          pokemon1,
                          pokemon2,
                          pokemon3,
                          pokemon4,
                          pokemon5,
                          pokemon6,
                        ];

                        res.status(200).render("bag", { pokemons });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  }

  LoginPage(req, res) {
    res.status(200).render("login");
  }

  RegisterPage(req, res) {
    res.status(200).render("register");
  }

  RemovePoke(req, res) {
    const pokename = req.params.pokename;

    const id = JSON.stringify(req.userId);

    const newId = parseInt(
      id
        .replace("[", "")
        .replace("{", "")
        .replace('"id"', "")
        .replace("]", "")
        .replace("}", "")
        .replace(":", "")
    );

    db.all(`SELECT poke1 FROM users WHERE id = ${newId}`, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (JSON.stringify(results[0]) == `{"poke1":"${pokename}"}`) {
        db.run(
          `UPDATE users SET poke1 = null WHERE id = ${newId}`,
          (err, results) => {}
        );
        res.status(300).redirect("/bag");
        return;
      } else {
        db.all(
          `SELECT poke2 FROM users WHERE id = ${newId}`,
          (err, results) => {
            if (err) {
              console.log(err);
            }

            if (JSON.stringify(results[0]) == `{"poke2":"${pokename}"}`) {
              db.run(
                `UPDATE users SET poke2 = null WHERE id = ${newId}`,
                (err, results) => {}
              );
              res.status(300).redirect("/bag");
              return;
            } else {
              db.all(
                `SELECT poke3 FROM users WHERE id = ${newId}`,
                (err, results) => {
                  if (err) {
                    console.log(err);
                  }

                  if (JSON.stringify(results[0]) == `{"poke3":"${pokename}"}`) {
                    db.run(
                      `UPDATE users SET poke3 = null WHERE id = ${newId}`,
                      (err, results) => {}
                    );
                    res.status(300).redirect("/bag");
                    return;
                  } else {
                    db.all(
                      `SELECT poke4 FROM users WHERE id = ${newId}`,
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        }

                        if (
                          JSON.stringify(results[0]) ==
                          `{"poke4":"${pokename}"}`
                        ) {
                          db.run(
                            `UPDATE users SET poke4 = null WHERE id = ${newId}`,
                            (err, results) => {}
                          );
                          res.status(300).redirect("/bag");
                          return;
                        } else {
                          db.all(
                            `SELECT poke5 FROM users WHERE id = ${newId}`,
                            (err, results) => {
                              if (err) {
                                console.log(err);
                              }

                              if (
                                JSON.stringify(results[0]) ==
                                `{"poke5":"${pokename}"}`
                              ) {
                                db.run(
                                  `UPDATE users SET poke5 = null WHERE id = ${newId}`,
                                  (err, results) => {}
                                );
                                res.status(300).redirect("/bag");
                                return;
                              } else {
                                db.all(
                                  `SELECT poke6 FROM users WHERE id = ${newId}`,
                                  (err, results) => {
                                    if (err) {
                                      console.log(err);
                                    }

                                    if (
                                      JSON.stringify(results[0]) ==
                                      `{"poke6":"${pokename}"}`
                                    ) {
                                      db.run(
                                        `UPDATE users SET poke6 = null WHERE id = ${newId}`,
                                        (err, results) => {}
                                      );
                                      res.status(300).redirect("/bag");
                                      return;
                                    } else {
                                      res.status(300).redirect("/bag");
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  }

  CheckPoke1(id, pokemon, res) {
    db.all(`SELECT poke1 FROM users WHERE id = ${id}`, (err, results) => {
      if (err) {
        console.log(err);
      }

      if (JSON.stringify(results[0]) == '{"poke1":null}') {
        db.run(
          `UPDATE users SET poke1 = ('${pokemon}') WHERE id = ${id}`,
          (err, results) => {
            console.log("Adicionou");
          }
        );
        res.status(200).render("congrats", { pokemon });
        return;
      } else {
        console.log("Posição 1 já ocupada");
        db.all(`SELECT poke2 FROM users WHERE id = ${id}`, (err, results) => {
          if (err) {
            console.log(err);
          }

          if (JSON.stringify(results[0]) == '{"poke2":null}') {
            db.run(
              `UPDATE users SET poke2 = ('${pokemon}') WHERE id = ${id}`,
              (err, results) => {
                console.log("Adicionou");
              }
            );
            res.status(200).render("congrats", { pokemon });
            return;
          } else {
            console.log("Posição 2 já ocupada");
            db.all(
              `SELECT poke3 FROM users WHERE id = ${id}`,
              (err, results) => {
                if (err) {
                  console.log(err);
                }

                if (JSON.stringify(results[0]) == '{"poke3":null}') {
                  db.run(
                    `UPDATE users SET poke3 = ('${pokemon}') WHERE id = ${id}`,
                    (err, results) => {
                      console.log("Adicionou");
                    }
                  );
                  res.status(200).render("congrats", { pokemon });
                  return;
                } else {
                  console.log("Posição 3 já ocupada");
                  db.all(
                    `SELECT poke4 FROM users WHERE id = ${id}`,
                    (err, results) => {
                      if (err) {
                        console.log(err);
                      }

                      if (JSON.stringify(results[0]) == '{"poke4":null}') {
                        db.run(
                          `UPDATE users SET poke4 = ('${pokemon}') WHERE id = ${id}`,
                          (err, results) => {
                            console.log("Adicionou");
                          }
                        );
                        res.status(200).render("congrats", { pokemon });
                        return;
                      } else {
                        console.log("Posição 4 já ocupada");
                        db.all(
                          `SELECT poke5 FROM users WHERE id = ${id}`,
                          (err, results) => {
                            if (err) {
                              console.log(err);
                            }

                            if (
                              JSON.stringify(results[0]) == '{"poke5":null}'
                            ) {
                              db.run(
                                `UPDATE users SET poke5 = ('${pokemon}') WHERE id = ${id}`,
                                (err, results) => {
                                  console.log("Adicionou");
                                }
                              );
                              res.status(200).render("congrats", { pokemon });
                              return;
                            } else {
                              console.log("Posição 5 já ocupada");
                              db.all(
                                `SELECT poke6 FROM users WHERE id = ${id}`,
                                (err, results) => {
                                  if (err) {
                                    console.log(err);
                                  }

                                  if (
                                    JSON.stringify(results[0]) ==
                                    '{"poke6":null}'
                                  ) {
                                    db.run(
                                      `UPDATE users SET poke6 = ('${pokemon}') WHERE id = ${id}`,
                                      (err, results) => {
                                        console.log("Adicionou");
                                      }
                                    );
                                    res
                                      .status(200)
                                      .render("congrats", { pokemon });
                                    return;
                                  } else {
                                    console.log("Posição 6 já ocupada");
                                    res.status(200).render("fullbag");
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    });
  }
}

module.exports = new UserController();
