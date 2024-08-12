module.exports = (app) => {
    const flashcards = require("../controllers/flashcard.controller.js");
    const router = require("express").Router();
  
    router.post("/", flashcards.create);
    router.get("/", flashcards.findAll);
    router.get("/:id", flashcards.findOne);
    router.put("/:id", flashcards.update);
    router.delete("/:id", flashcards.delete);
  
    app.use("/api/flashcards", router);
  };
  