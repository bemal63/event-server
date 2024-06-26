import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();
    res.json(posts);
  } catch (err) {
    res.status(400).json({ message: "Не удалось получить статьи" });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneById({ _id: postId }, (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Не удалось получить статью",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Не найдена статья",
        });
      }
      res.json(doc);
    });
  } catch (err) {
    return res.status(400).json({ message: "Не удалось получить статьи" });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete({ _id: postId }, (err, doc) => {
      if (err) {
        return res.status(400).json({
          message: "Не удалось удалить статью",
        });
      }
      if (!doc) {
        return res.status(404).json({
          message: "Не найдена статья",
        });
      }
      res.json({
        message: "Статья удалена",
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось удалить статью",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.title,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId,
    });

    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndUpdate(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
        user: req.userId,
      }
    );
    res.json({
      message: "Статья обновлена",
    });
  } catch (err) {
    return res.status(400).json({ message: "Не удалось обновить статью" });
  }
};
