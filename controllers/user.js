const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();
const MOT_SECRET = process.env.MOT_SECRET



// Creer de noveaux utilisateur
exports.signup = (req , res , next)  =>{
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User ( {
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(()=> res.status(201).json({ message: 'utilisateur creer avec sucess'}))
        .catch(error => res.status(400).json({ error}))
    })
    .catch(error => res.status(500).json({ error }));

};

// Conection avec de utilisateur existent
exports.login = (req , res , next) => {
    User.findOne ( { email: req.body.email})
    .then(user => {
        if(user === null){
            return res.status(401).json({message : 'Paire incorrect'})
        }else {
            bcrypt.compare(req.body.password , user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message : 'mot pas incorrect/email incorrect'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId:user._id},
                            MOT_SECRET,
                        {expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}))
        }
    })
    .catch(error => res.status(500).json({error}))
}

