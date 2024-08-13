import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, //cookie cannot be accessed by client side scripts
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days
    sameSite: "Strict", //cookie will only be sent in a first-party context
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
