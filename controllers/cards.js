const Card = require('../models/card')
const { forbidden, created } = require('../utils/requestStatusCodes')
const errors = require('../middlewares/centralErrorHandler')
// GET ALL CARDS
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next)
}
// CREATE NEW CARD
module.exports.createCard = (req, res, next) => {
  const id = req.user._id
  const { name, link } = req.body
  Card.create({ name, link, owner: id })
    .then((card) => res.status(created).send({ data: card }))
    .catch((err) => errors(err, req, res, next, 'при создании карточки'))
}
// DELETE CARD BY ID
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      const owner = card.owner.toString()
      if (req.user._id === owner) {
        card.deleteOne()
          .then(() => res.send({ message: 'Карточка успешно удалена.' }))
          .catch(next)
      } else {
        res.status(forbidden).send({ message: 'Нельзя удалять чужие карточки.' })
      }
    })
    .catch((err) => errors(err, req, res, next))
}
// LIKE CARD BY ID
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => errors(err, req, res, next))
}
// DISLIKE CARD BY ID
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => errors(err, req, res, next))
}
