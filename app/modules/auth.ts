import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { User } from './users/models/user.schema.model';
import { environment } from '../../environments/environment';
import * as passport from "passport";
import * as jwt from 'jsonwebtoken';

export const auth = function(req, res, next) {
  //get the token from the header if present
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  //token = token.replace('Bearer ','');
  //if no token found, return response (without going to the next middleware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, environment.authSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};