import Validator from 'fastest-validator';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import User from '../models/User';

export const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const decodedToken = jwt.verify(token, process.env.SecretKey);
        // console.log(decodedToken);
        req.userData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            'message': "Invalid or expired token provided!",
            'error': e
        })
    }
}

export const registerValidator = async (req, res, next) => {
    const user = new User(req.body);

    // Validasi data menggunakan fastest-validator
    const schema = {
        username: {
            type: "string",
            optional: false,
            max: "100"
        },
        email: {
            type: "string",
            optional: false,
            max: "500",
            unique: true
        },
        password: {
            type: "string",
            optional: false,
            min: 6
        }
    }

    // Inisiasi dan Validasi inputan user terhadap schema
    const v = new Validator();
    const validationResponse = v.validate(user, schema);

    // Jika validasi tidak true maka kembalikan error
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    } else {
        // Validasi apakah user sudah terdaftar

        next()
    }



}

export const loginValidator = async (req, res, next) => {
    const user = new User(req.body);

    // Validasi data menggunakan fastest-validator
    const schema = {
        email: {
            type: "string",
            optional: false,
            max: "500",
            unique: true
        },
        password: {
            type: "string",
            optional: false,
            min: 6
        }
    }

    // Inisiasi dan Validasi inputan user terhadap schema
    const v = new Validator();
    const validationResponse = v.validate(user, schema);

    // Jika validasi tidak true maka kembalikan error
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    } else {
        next()
    }


}