const router = require('express').Router();
// const { Joi, celebrate } = require('celebrate')
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardDataValidate, cardIdValidate } = require('../middlewares/validate')

router.get('/', getCards);
router.post('/', cardDataValidate, createCard);
router.delete('/:cardId', cardIdValidate, deleteCard);
router.put('/:cardId/likes', cardIdValidate, likeCard);
router.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;
