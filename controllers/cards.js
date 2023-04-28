const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  internalServerError, badRequest, notFound, forbidden,
} = require('../utils/errors');
const errors = require('../middlewares/errors')
// GET ALL CARDS
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' }));
};
// CREATE NEW CARD
module.exports.createCard = (req, res) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequest).send({ message: 'Переданы некорректные данные при создании карточки.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// DELETE CARD BY ID
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString()
      if (req.user._id === owner) {
        Card.deleteOne(card)
          .then(() => res.send({ message: 'Карточка успешно удалена.' }))
          .catch(next)
      } else {
        res.status(forbidden).send({ message: 'Нельзя удалять чужие карточки.' })
      }
    })
    .catch((err) => errors(err, res))
}
// LIKE CARD BY ID
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => errors(err, res))
};
// DISLIKE CARD BY ID
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res.status(notFound).send({ message: 'Передан несуществующий id карточки.' });
      } else if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Некорректный формат id карточки.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
