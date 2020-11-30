const router = require("express").Router();
const { Comment, User, Vote, Post } = require("../../models");
const sequelize = require("../../config/connection");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, (req, res) => {
  Comment.findAll({
    attributes: [
      "id",
      "created_at",
      "comment_text",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE comment.id = user.id)"
        ),
        "comment_text",
      ],
    ],
    order: [["created_at", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["username"],
      }
    ]
  })
  .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // check the session
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

router.delete("/:id", withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
