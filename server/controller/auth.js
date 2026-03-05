const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const User = require("../model/user");
const Class = require("../model/class");

const romanNumerals = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
    "2ND": "II",
    "3RD": "III",
    "4TH":"IV",
    "5TH": "V",
    "6TH":"VI",
    "7TH": "VII",
    "8TH": "VIII",
    "9TH": "IX",
    "10TH": "X",
    "LKG":"LKG",
    "UKG":"UKG",

};

exports.removeClass = async (req, res) => {

    const users = await User.find({classId: "67e1ab2c164ed2cf9b533c16"});

    for(let user of users) {
        user.classId = null;
        user.save();
    }

    res.status(200).json({success: true});

}

exports.registerBulk = async (req, res) => {

    try {

        const {usersData} = req.body;

        for (let newUser of usersData) {
            const {name, userName, password, penNo, fName, mName, dob, classId, contactNo} = newUser;

            const existingUser = await User.findOne({userName});
            if (existingUser) {
                continue;
            }

            const encPassword = await bcrypt.hash(String(password), 10);

            // const foundClass = await Class.findOne({name: "XI", section: "A"})

            await User.create({
                name,
                userName: String(userName),
                password: encPassword,
                role:"student",
                fName,
                mName,
                penNo,
                dob,
                classId,
                contactNo
            });
        }

        res.status(201).json({success: true});

    } catch (e) {
        console.log(e);
    }

}

exports.register = async (req, res) => {

    try {

        const {name, userName, password, role, fName, mName} = req.body;

        if (!(name && userName && password && role)) {
            res.status(404).send("All fields are required");
        }

        const existingUser = await User.findOne({userName});
        if (existingUser) {
            res.status(401).send("User already exist");
        }

        const encPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            userName: userName.toLowerCase(),
            password: encPassword,
            role,
            fName,
            mName
        });

        user.password = undefined;

        res.status(201).json(user);

    } catch (e) {
        console.log(e);
    }

}

exports.login = async (req, res) => {

    try {

        const {userName, password} = req.body;

        const user = await User.findOne({userName});

        if (user && (await bcrypt.compare(password, user.password))) {

            //token
            const token = jwt.sign(
                {user_id: user._id, userName},
                process.env.SECRET_KEY,
                {
                    expiresIn: 24 * 60 * 60
                }
            );

            user.password = undefined;

            // Setting Up cookies
            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            return res.status(200).cookie('token', token, options).json({
                success: true,
                token,
                user
            });

        }

        res.status(400).send("Email or password incorrect");

    } catch (err) {
        console.log(err);
    }

}
