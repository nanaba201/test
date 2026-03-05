const Form = require("../model/form");

exports.submit = async (req, res) => {
    try{

        const {type, data} = req.body;

        const form = await Form.create({type, data});

        res.status(200).json({success: true, form});

    }catch(err){
        console.log(err)
    }
}

exports.fetch = async (req, res) => {
    try{
        const forms = await Form.find({type:"admission"});

        res.status(200).json({success: true, forms});
    }catch(err){
        console.log(err)
    }
}