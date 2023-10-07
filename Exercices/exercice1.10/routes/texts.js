const express = require('express');
const {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
} = require('../models/text');

const router = express.Router();

/* Read all the pizzas from the menu
   GET /pizzas?order=title : ascending order by title
   GET /pizzas?order=-title : descending order by title
*/
router.get('/', (req, res) => {
  const allTextPotentiallyOrdered = readAllTexts(req?.query?.level);

  return res.json(allTextPotentiallyOrdered);
});

// Read the pizza identified by an id in the menu
router.get('/:id', (req, res) => {
  const foundText = readOneText(req.params.id);

  if (!foundText) return res.sendStatus(404);

  return res.json(foundText);
});

// Create a pizza to be added to the menu.
router.post('/', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;

  if (!title || !content || !level) return res.sendStatus(400); // error code '400 Bad request'

  if (level !== "easy" && level !== "medium" && level !== "hard") {
    return res.status(400).json({ erreur: "Le level n'existe pas." });
  }
  

  const createdText = createOneText(title, content, level);

  return res.json(createdText);
});

// Delete a pizza from the menu based on its id
router.delete('/:id', (req, res) => {
  const deletedText = deleteOneText(req.params.id);

  if (!deletedText) return res.sendStatus(404);

  return res.json(deletedText);
});

// Update a text based on its id and new values for its parameters
router.put('/:id', (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const content = req?.body?.content?.length !== 0 ? req.body.content : undefined;
  const level = req?.body?.level?.length !== 0 ? req.body.level : undefined;

  if (!title || !content || !level) return res.sendStatus(400); // error code '400 Bad request'

  const updatedText = updateOneText(req.params.id, { title, content, level });

  if (!updatedText) return res.sendStatus(404);

  return res.json(updatedText);
});

module.exports = router;
