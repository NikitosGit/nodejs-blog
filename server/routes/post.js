const express = require("express");
const models = require("../models");
const router = express.Router();

router.get("/", (req, res) => {
  models.Post.find()
    .select("title body _id createdAt updatedAt")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        posts: docs.map(doc => {
          return {
            title: doc.title,
            body: doc.body,
            _id: doc._id,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
            request: {
              type: "GET",
              url: "http://localhost:3000/post/" + doc._id
            }
          };
        })
      };
      res.status(200).json({
        response
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:postId", (req, res) => {
  const id = req.params.postId;
  models.Post.findById(id)
    .select("title body _id createdAt updatedAt")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          post: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/post"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  const post = new models.Post({
    title: req.body.title,
    body: req.body.body
  });
  post
    .save()
    .then(result => {
      res.status(201).json({
        message: "Created post successfully",
        createdPost: {
          title: result.title,
          body: result.body,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/post/" + result._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.patch("/:postId", (req, res) => {
  const id = req.params.postId;
  const updateOps = {};
  console.log(req.body);
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  models.Post.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/post/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:postId", (req, res) => {
  const id = req.params.postId;
  models.Post.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/post",
          body: { title: "String", body: "String" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
