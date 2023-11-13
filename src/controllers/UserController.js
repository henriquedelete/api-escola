class UserController {
  index(req, res) {
    return res.status(200).send(`Index`);
  }
}

module.exports = new UserController();
