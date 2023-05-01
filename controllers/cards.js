const Card = require('../models/card')
const { forbidden, created } = require('../utils/requestStatusCodes')
const errors = require('../middlewares/centralErrorHandler')
// GET ALL CARDS
module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => errors(err, res))
}
// CREATE NEW CARD
module.exports.createCard = (req, res) => {
  const id = req.user._id
  const { name, link } = req.body
  Card.create({ name, link, owner: id })
    .then((card) => res.status(created).send({ data: card }))
    .catch((err) => errors(err, res, 'при создании карточки'))
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
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => errors(err, res))
}
// DISLIKE CARD BY ID
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch((err) => errors(err, res))
}
