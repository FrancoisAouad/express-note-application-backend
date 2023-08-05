/*******************************************************************************
 *
 * Copyright (c) {2022-2023} Francois J. Aouad.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU General Public License v3.0
 * which accompanies this distribution, and is available at
 * https://www.gnu.org/licenses/gpl-3.0.en.html
 *
 *******************************************************************************/

import { verify, sign } from 'jsonwebtoken';
import createError from 'http-errors';
// import client from '../db/redis.service.js';

export class JwtService {
  setAccessToken = (userId) => {
    //access token body
    const payload = {};
    const secret = process.env.SECRET_ACCESS_TOKEN;
    const options = {
      expiresIn: '15m',
      issuer: 'eurisko-test.com',
      audience: userId,
    };
    //we sign and create the token and return its value
    const token = sign(payload, 'secret', options);
    return token;
  };

  setRefreshToken = async (userId) => {
    try {
      //refresh token body
      const payload = {};
      const secret = process.env.SECRET_REFRESH_TOKEN;
      const options = {
        expiresIn: '1y',
        issuer: 'express-note.com',
        audience: userId,
      };
      //we save and create the token
      const token = sign(payload, 'secret', options);
      //we save the refrsh token inside of redis
      // await client.SET(userId, token, 'EX', 365 * 24 * 60 * 60);
      //we return its value
      return token;
    } catch (err) {
      // console.log(err.message);
      throw createError.InternalServerError();
    }
  };

  setResetPasswordToken = async (userId) => {
    try {
      //reset password token body and payload
      const payload = {};
      const secret = process.env.SECRET_RESETPASSWORD_TOKEN;
      const options = {
        expiresIn: '10m',
        issuer: 'express-note.com',
        audience: userId,
      };
      //we sign the token
      const token = sign(payload, 'secret', options);
      //we return its value
      return token;
    } catch (error) {
      // console.log(error.message);
      return createError.InternalServerError();
    }
  };

  verifyAccessToken = (req, res, next) => {
    if (!req.headers['authorization']) return createError.Unauthorized();
    //we split the headers to get the jwt from the bearer token
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    //we verify if the token is valid
    verify(token, 'process.env.SECRET_ACCESS_TOKEN', (err, payload) => {
      if (err) {
        const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
        return next(new createError.Unauthorized(message));
      }
      req.payload = payload;
      //go the next middleware if the token passes
      next();
    });
  };

  // verifyRefreshToken = async (refreshToken) => {
  //   try {
  //     // console.log('INSIDE JWT VERIFY');
  //     //verify refresh token
  //     const payload = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
  //     // console.log('PAYLOAD: ', payload);
  //     console.log(payload);
  //     // const userId = payload.aud;
  //     // console.log(userId);
  //     // console.log(Id);
  //     // console.log(Id.toString());
  //     // console.log('USERID'.yellow.bold, userId);
  //     //fetch saved refrsh token from cache
  //     // const result = await client.GET(userId);
  //     const result = await client.GET(payload.aud);
  //     // console.log('INSIDE JWT', refreshToken);
  //     console.log('RESULT'.green.bold, result);
  //     // console.log('XXX: ', x);
  //     // console.log('RESULT: '.green.bold, result);
  //     // console.log('REFRESHTOKEN: '.cyan.bold, refreshToken);
  //     //if refresh token is equal to the cached token, return id
  //     // console.log(refreshToken === result);
  //     if (refreshToken === result) return payload.aud;
  //     //else throw error
  //     throw createError.Unauthorized();
  //     // return res.json({message:'no'})
  //   } catch (error) {
  //     console.log('error is here bcz of redis cache'.red.bold);
  //     console.log(error.message);
  //     // throw createError.InternalServerError();
  //   }
  // };

  verifyResetPasswordToken = async (refreshToken) => {
    try {
      //verify jwt token
      const payload: any = verify(refreshToken, 'process.env.SECRET_RESETPASSWORD_TOKEN');
      //get user id from payload
      const userId = payload.aud;
      if (!userId) {
        //throw error if user doesnt exist
        throw createError.Unauthorized();
      } else {
        //if user exists return id
        return userId;
      }
    } catch (error) {
      throw createError.Unauthorized();
    }
  };

  public async decodeToken(jwtToken: string, options?: object) {
    const token = jwtToken.split(' ')[1];
    const decoded: any = verify(token, 'process.env.SECRET_ACCESS_TOKEN');
    const id = decoded.aud;
    return id;
  }
}
