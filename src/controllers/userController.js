import User from '../models/User';
import Status from '../models/Status';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const register = async (req, res) => {
    try {
        const user = new User(req.body);
        bcryptjs.genSalt(10, (err, salt) => {
            bcryptjs.hash(req.body.password, salt, async (err, hash) => {
                user.password = hash;
                await user.save(err => {
                    if (err) {
                        res.send({
                            info: "Failed to create user",
                            error: err
                        })
                    } else {

                        const transport = nodemailer.createTransport({
                            host: "smtp.mailtrap.io",
                            port: 2525,
                            auth: {
                                user: "53c2ab2c1a5302",
                                pass: "a1fc47a1dbdeb3"
                            }
                        });

                        const mailOptions = {
                            from: 'admin@dompetkilat.com',
                            to: 'testemail@gmail.com',
                            subject: 'Thank you for registering!',
                            text: 'That was easy!',
                            html: `<!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cormorant+Garamond" rel="stylesheet" type="text/css"><link 
                            href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Fira+Sans" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Lora" rel="stylesheet" type="text/css"><link 
                            href="https://fonts.googleapis.com/css?family=Quattrocento" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css">
                            <!--<![endif]--><style>*{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}@media (max-width:620px){.icons-inner{text-align:center}.icons-inner td{margin:0 auto}.row-content{width:100%!important}.stack .column{width:100%;display:block}}</style></head><body 
                            style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f7f6f5"><tbody><tr><td><table 
                            class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000" width="600"><tbody><tr><td class="column" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="image_block" width="100%" border="0" cellpadding="0" 
                            cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td style="width:100%;padding-right:0;padding-left:0;padding-top:20px;padding-bottom:20px"><div align="center" style="line-height:10px"><img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/BeeFree/beefree-hxaw5cshjd9/Logo-Dompet-Kilat.png" style="display:block;height:auto;border:0;width:150px;max-width:100%" width="150" alt="your-logo" title="your-logo"></div></td></tr></table></td></tr></tbody></table>
                            </td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f7f6f5"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000" width="600"><tbody><tr><td class="column" width="100%" 
                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="heading_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td style="text-align:center;width:100%;padding-top:35px"><h1 
                            style="margin:0;color:#ff0004;direction:ltr;font-family:Lora,Georgia,serif;font-size:50px;font-weight:400;letter-spacing:1px;line-height:120%;text-align:center;margin-top:0;margin-bottom:0"><strong>Thank you.</strong></h1></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f7f6f5"><tbody><tr><td><table
                             class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000" width="600"><tbody><tr><td class="column" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:0;padding-bottom:0;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block" width="100%" border="0" cellpadding="0" 
                            cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td style="padding-bottom:40px;padding-left:15px;padding-right:15px;padding-top:40px"><div style="font-family:Tahoma,Verdana,sans-serif"><div style="font-size:12px;font-family:Lato,Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:18px;color:#222;line-height:1.5"><p style="margin:0;font-size:16px;text-align:center;mso-line-height-alt:24px"><span style="font-size:16px"><strong>Hey there,
                            </strong></span></p><p style="margin:0;font-size:16px;text-align:center">Thank you for registering. Please enjoy our service!</p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f7f6f5"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" 
                            cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ff0002;color:#000" width="600"><tbody><tr><td class="column" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" 
                            style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td><div style="font-family:Tahoma,Verdana,sans-serif"><div style="font-size:12px;font-family:Lato,Tahoma,Verdana,Segoe,sans-serif;mso-line-height-alt:14.399999999999999px;color:#f7f6f5;line-height:1.2"><p style="margin:0;font-size:12px;text-align:center;mso-line-height-alt:14.399999999999999px">&nbsp;</p><p style="margin:0;text-align:center">© Copyright 2021. DompetKilat All Rights Reserved.</p><p 
                            style="margin:0;text-align:center"><a title="http://www.example.com" href="http://www.example.com/" target="_blank" rel="noopener" style="color:#f7f6f5">Manage Preferences</a> | <a title="http://www.example.com" href="http://www.example.com/" target="_blank" rel="noopener" style="color:#f7f6f5">Unsubscribe</a></p><p style="margin:0;font-size:12px;text-align:center"><span style="color:silver">&nbsp;</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table
                             class="row row-5" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000" width="600"><tbody><tr><td class="column" width="100%" 
                            style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="icons_block" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td style="color:#9d9d9d;font-family:inherit;font-size:15px;padding-bottom:5px;padding-top:5px;text-align:center"><table width="100%" cellpadding="0" 
                            cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td style="text-align:center"><!--[if vml]><table align="left" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]--><!--[if !vml]><!--><table class="icons-inner" style="mso-table-lspace:0;mso-table-rspace:0;display:inline-block;margin-right:-4px;padding-left:0;padding-right:0" cellpadding="0" 
                            cellspacing="0" role="presentation"><!--<![endif]--><tr><td style="text-align:center;padding-top:5px;padding-bottom:5px;padding-left:5px;padding-right:6px"><a href="https://www.designedwithbee.com/"><img class="icon" alt="Designed with BEE" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/53601_510656/Signature/bee.png" height="32" width="34" align="center" style="display:block;height:auto;border:0"></a></td><td 
                            style="font-family:Arial,Helvetica Neue,Helvetica,sans-serif;font-size:15px;color:#9d9d9d;vertical-align:middle;letter-spacing:undefined;text-align:center"><a href="https://www.designedwithbee.com/" style="color:#9d9d9d;text-decoration:none">Designed with BEE</a></td></tr></table></td></tr></table></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End --></body></html>`
                        };

                        transport.sendMail(mailOptions, (err, info) => {
                            if (err) throw err;
                            console.log('Email sent: ' + info.response);
                            res.status(201).json({
                                info: "Data created successfully, please check your registered email!",
                                data: user
                            })
                        });
                    }
                });
            })
        })
    } catch (err) {
        res.send({
            message: "Something went wrong!",
            error: err
        })
    }
}

export const login = async (req, res) => {
    try {
        User.findOne({
            email: req.body.email
        }).then(registeredUser => {
            if (registeredUser === null) {
                res.send({
                    message: 'User not registered!'
                })
            } else {
                bcryptjs.compare(req.body.password, registeredUser.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: registeredUser.email,
                            userId: registeredUser._id,
                            Type: registeredUser.Type
                        }, process.env.SecretKey, {
                            expiresIn: '24h'
                        })
                        res.status(200).json({
                            message: "Authentication successful!",
                            info: "Database for status successfully seeded",
                            token: token
                        })
                    } else {
                        res.status(401).json({
                            message: "Invalid credentials!",
                        });
                    }
                })
            }
        })
    } catch (err) {
        res.send({
            info: 'Something went wrong!',
            error: err
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const users = await User.findOne({
            id: req.params.id
        });
        res.send({
            _id: users._id,
            username: users.username,
            email: users.email,
        });
    } catch (err) {
        res.send({
            message: "Something went wrong!",
            error: err
        })
    }
}

export const seederStatus = async (req, res) => {
    const dataStatus = [{
            _id: 1,
            Label: "Not started",
        },
        {
            _id: 2,
            Label: "Working",
        },
        {
            _id: 3,
            Label: "Waiting for review",
        },
        {
            _id: 4,
            Label: "Completed",
        }
    ]

    try {
        const status = new Status(dataStatus);
        status.insertMany(err => {
            if (err) {
                res.send(err)
            } else {
                res.status(201).json({
                    info: "Status created successfully",
                    data: status
                })
            }
        });
    } catch (err) {
        res.send({
            message: "Something went wrong on status!",
            error: err
        })
    }
}