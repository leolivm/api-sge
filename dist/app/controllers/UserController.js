"use strict"; function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } } function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: "Validation fails" });
    }

    const userExists = await _User2.default.findOne({ where: { name: req.body.name } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { id, name, password } = await _User2.default.create(req.body);
    return res.json({ id, name, password });
  }
}

exports. default = new UserController();
