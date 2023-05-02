const Card = require('../models/card')
const { created } = require('../utils/requestStatusCodes')
const Forbidden = require('../utils/customErrors/forbidden')
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
    .catch(next)
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
        next(new Forbidden('Нельзя удалять чужие карточки.'))
      }
    })
    .catch(next)
}

// CARD REACTION FUNC
function cardReaction(req, res, reaction, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    reaction,
    { new: true },
  )
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => res.send({ data: card }))
    .catch(next)
}
// like card ctrl
module.exports.likeCard = (req, res, next) => {
  const putLike = { $addToSet: { likes: req.user._id } }
  cardReaction(req, res, putLike, next)
}
// dislike card ctrl
module.exports.dislikeCard = (req, res, next) => {
  const deleteLike = { $pull: { likes: req.user._id } }
  cardReaction(req, res, deleteLike, next)
}
