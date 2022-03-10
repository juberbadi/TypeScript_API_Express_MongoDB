import { RequestHandler } from 'express';
import createHttpError,{ InternalServerError } from 'http-errors';
import User from '../model/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_KEY, FRONTEND_URL, transporter } from "../config";
import nodemailer from 'nodemailer';

export const signupUser: RequestHandler = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if(existingUser) return next(createHttpError(422, "Email already exists"));

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ status: 200, message: "User Created" })
  } catch (error) {
    return next(InternalServerError);
  }
}

export const signinUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
   try {
     const user = await User.findOne({ email });
     if(!user) return next(createHttpError(404, "User not found!"));

     if(!user.isUserVerified) return next(createHttpError(406, "User not verified!"));

     const isValidPassword = await bcrypt.compare(password, user.password);
     if(!isValidPassword) return next(createHttpError(401, "Not a valid password!"));

     const token = jwt.sign(
       {
         name: user.name,
         email: user.email,
         userId: user.id
       },
       JWT_KEY,
       {
         expiresIn: "7d",
       }
     );

     res.cookie("jwt", token);

     res.status(200).json({ name: user.name, token});
   } catch (error) {
     return next(InternalServerError);
   }
}

export const sendVerificationMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return next(createHttpError(404, "Email not valid!"));

    if(user.isUserVerified) return next(createHttpError(406, "User already verified"));

    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = await jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "60m"
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <jb@example.com>', // sender address
      to: `${ email }`, // list of receivers
      subject: "For Email Verification", // Subject line
      // text: "Hello world?", // plain text body
      html: `Your Verification Link <a href="${FRONTEND_URL}/email-verify/${jwtToken}">Link</a>`, // html body
    });

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    await user.updateOne({ $set: { verifyToken: encryptedToken }});

    res.status(200).json({ message: `Preview URL: %s, ${ nodemailer.getTestMessageUrl(info) }` });
  } catch (error) {
    return next(InternalServerError);
  }
}

export const verifyUserMail: RequestHandler = async (req, res, next) => {
  const { token }:{ token:string } = req.body;
  try {
    const decodedToken: any = jwt.verify(token, JWT_KEY);

    const user = await User.findById(decodedToken.userId)
    if(!user) return next(createHttpError(401, "Token Invalid"))

    await user.updateOne({
      $set: { isUserVerified: true },
      $unset: { verifyToken: 0 }
    });

    res.status(200).json({ message: "Email verified" })
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"))
  }
}

export const sendForgotPasswordMail: RequestHandler = async (req, res, next) => {
  const { email }: { email: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return next(createHttpError(404, "Email not valid!"));


    const encryptedToken = await bcrypt.hash(user._id.toString(), 8);

    const jwtToken = await jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: "60m"
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <jb@example.com>', // sender address
      to: `${ email }`, // list of receivers
      subject: "For Forgot Password Verification Mail", // Subject line
      // text: "Hello world?", // plain text body
      html: `Your Verification for Forgot Password Link <a href="${FRONTEND_URL}/forgot-password-verify/${jwtToken}">Link</a>`, // html body
    });

    await user.updateOne({ $set: { verifyToken: encryptedToken }});

    res.status(200).json({ message: `Preview URL: %s, ${ nodemailer.getTestMessageUrl(info) }` });
  } catch (error) {
    return next(InternalServerError);
  }
}

export const verifyForgotMail: RequestHandler = async (req, res, next) => {
  const { token, password }:{ token:string, password:string } = req.body;
  try {
    const decodedToken: any = jwt.verify(token, JWT_KEY);

    const user = await User.findById(decodedToken.userId)
    if(!user) return next(createHttpError(401, "Token Invalid"))

    const encryptedPassword = await bcrypt.hash(password, 8);

    await user.updateOne({
      $set: { password: encryptedPassword },
      $unset: { verifyToken: 0 }
    });

    res.status(201).json({ message: "Password Changed!" })
  } catch (error) {
    return next(createHttpError(401, "Token Invalid"))
  }
}
