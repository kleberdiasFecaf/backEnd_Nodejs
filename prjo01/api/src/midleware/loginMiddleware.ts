import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { env } from 'process';
import { decode } from 'punycode';

config();

export const verifyJWT = (req,res,next) =>{
    let token = req.headers['x-access-token'];

    jwt.verify(token, process.env.SECRET,(err, decoded) => {

    if(err) return res.status(401).end()

        req.userId = decoded.userId;
        next()

    })
}