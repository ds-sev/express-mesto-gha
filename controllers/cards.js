const mongoose = require('mongoose');
const Card = require('../models/card');
const { internalServerError, badRequest, notFound } = require('../utils/errors');
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
    .then((card) => card.populate('owner'))
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
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(notFound).send({ message: 'Карточка с указанным id не найдена. ' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// LIKE CARD BY ID
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(notFound).send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
// DISLIKE CARD BY ID
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('Not found');
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(notFound).send({ message: 'Передан несуществующий id карточки.' });
      } else {
        res.status(internalServerError).send({ message: 'На сервере произошла ошибка.' });
      }
    });
};
