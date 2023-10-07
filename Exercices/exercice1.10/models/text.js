const path = require('node:path');
const { v4: uuidv4 } = require('uuid');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/text.json');

const TEXTS_BASE = [
  {
    id: 1,
    content: "Je ne sais pas , c'est un test",
    level: 'easy',
  },
  {
    id: 2,
    content: "Je ne sais pas , c'est un test 2",
    level: 'hard',
  },
  {
    id: 3,
    content: "Je ne sais pas , c'est un test 3",
    level: 'medium',
  },
];

function readAllTexts(levelorder) {
  const orderLevel = levelorder;
  let orderedTexts;
  const texts = parse(jsonDbPath, TEXTS_BASE);

  if(orderLevel && (orderLevel !== "easy" && orderLevel !== "hard" && orderLevel !== "medium" )){
    const error = "Le level n'existe pas"

    return error;
  }

  if (orderLevel) {
   
    orderedTexts = texts.filter((text) => text.level === levelorder);
    return orderedTexts;
  }

  return texts;
}

function readOneText(id) {
  const idNumber = id;
  const texts = parse(jsonDbPath, TEXTS_BASE);
  const indexOfTextFound = texts.findIndex((film) => film.id === idNumber);
  if (indexOfTextFound < 0) return undefined;

  return texts[indexOfTextFound];
}

function createOneText(title, content, level) {
  const texts = parse(jsonDbPath, TEXTS_BASE);

  const newText = {
    id: uuidv4(),
    title,
    content,
    level,
  };

  texts.push(newText);

  serialize(jsonDbPath, texts);

  return newText;
}

function deleteOneText(id) {
  const idNumber = parseInt(id, 10);
  const texts = parse(jsonDbPath, TEXTS_BASE);
  const foundIndex = texts.findIndex((text) => text.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedTexts = texts.splice(foundIndex, 1);
  const deletedText = deletedTexts[0];
  serialize(jsonDbPath, texts);

  return deletedText;
}

function updateOneText(id, propertiesToUpdate) {
  const idNumber = id;
  const texts = parse(jsonDbPath, TEXTS_BASE);

  const foundIndex = texts.findIndex((text) => text.id === idNumber);

  if (texts[foundIndex] === undefined) {
    const {title} = propertiesToUpdate;
    const {content} = propertiesToUpdate;
    const {level} = propertiesToUpdate;
    
    const newText = {
      id,
     title,
     content,
     level
    };

    texts.push(newText);
    serialize(jsonDbPath, texts);
    return newText;
  }
  const updatedText = { ...texts[foundIndex], ...propertiesToUpdate };

  texts[foundIndex] = updatedText;

  serialize(jsonDbPath, texts);

  return updatedText;
}

module.exports = {
  readAllTexts,
  readOneText,
  createOneText,
  deleteOneText,
  updateOneText,
};
