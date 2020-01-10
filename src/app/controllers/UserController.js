import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().min(6)
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: "Validation fails" });
    }

    const userExists = await User.findOne({ where: { name: req.body.name } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const { id, name, password } = await User.create(req.body);
    return res.json({ id, name, password });
  }
}

export default new UserController();
