import nc from "next-connect";
import db from "../../../../utils/db";
import User from "../../../../models/User";
import bcrypt from "bcrypt";
import { validateEmail } from "../../../../utils/validation";
import { createActivationToken } from "../../../../utils/tokens";
import { sendEmail } from "../../../../utils/sendEmails";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email." });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be atleast 6 charecters" });

    const cryptedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const addedUser = await newUser.save();

    const activationToken = createActivationToken({
      id: addedUser._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activationToken}`;

    sendEmail(email, url, "", "Shoppy - Account Activation");

    await db.disconnectDb();

    res.status(201).json({
      message: "Registration success. Activation mail sent to email",
      user: addedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default handler;
