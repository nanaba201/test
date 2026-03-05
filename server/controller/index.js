const User = require("../model/user");
const News = require("../model/news");
const Class = require("../model/class");
const Fee = require("../model/fee");
const Result = require("../model/result");

exports.fetchUser = async (req, res) => {
    try {
        const {role} = req.query;

        const users = await User.find({role}, {password: 0})

        return res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        console.log(err)
    }
}

exports.fetchUserByClass = async (req, res) => {
    try {
        const {classId} = req.params;
        const {role} = req.query;

        const users = await User.find({classId, role}, {password: 0})

        return res.status(200).json({
            success: true,
            users
        });

    } catch (err) {
        console.log(err)
    }
}

exports.addNews = async (req, res) => {
    try {
        const {date, body} = req.body;

        const news = await News.create({date, body});

        res.status(200).json({news})

    } catch (err) {
        console.log(err)
    }
}

exports.fetchNews = async (req, res) => {
    try {
        const {latest} = req.query;

        let news;

        if (latest) {
            news = await News.find()
                .sort({date: -1})
                .limit(5); // Limit to 5 documents;
        } else {
            news = await News.find().sort({date: -1})
        }

        res.status(200).json({news})

    } catch (err) {
        console.log(err)
    }
}

exports.addClass = async (req, res) => {
    try {
        const {name, section, subjects} = req.body;

        const newClass = await Class.create({name, section, subjects});

        res.status(200).json({success: true, class: newClass})

    } catch (err) {
        console.log(err)
    }
}


exports.fetchClass = async (req, res) => {
    try {
        const {classId} = req.params;


        if (classId) {
            const indieClass = await Class.findOne({_id: classId})
            return res.status(200).json({success: true, class: indieClass})

        } else {
            const classes = await Class.find()
            return res.status(200).json({success: true, classes})
        }

    } catch (err) {
        console.log(err)
    }
}

exports.assignToClass = async (req, res) => {
    try {

        const {classId, userName} = req.body;

        const user = await User.findOne({userName})

        if (user) {

            if (user.role === "teacher") {
                const alreadyAssignedTeacher = await User.findOne({classId});
                if (alreadyAssignedTeacher) {
                    alreadyAssignedTeacher.classId = null;
                    await alreadyAssignedTeacher.save()
                }
            }

            user.classId = classId;
            await user.save();

            return res.status(200).json({success: true})
        }

        res.status(200).json({success: false, message: "No User Found with provided Id"})


    } catch (err) {
        console.log(err)
    }
}

exports.addMarks = async (req, res) => {
    try {

        const {studentId, subjectId, marks} = req.body;

        const student = await User.findOne({_id: studentId})

        if (student) {
            student.marks = {...student.marks, [subjectId]: Number(marks)};
            await student.save()
            return res.status(200).json({success: true})
        }

        res.status(200).json({success: false, message: "No Student Found with provided Id"})


    } catch (err) {
        console.log(err)
    }
}

exports.searchStudentFee = async (req, res) => {
    try {

        const {userName} = req.params;
        const {session} = req.query;

        const student = await User.findOne({userName}).populate("classId").lean()

        if (student) {

            let fees = await Fee.findOne({studentId: student._id, session})

            if(!fees){

                const heads = returnFeesRows(student.classId?.name);
                const feeStructures = heads.map((head) => ({name: head, amount: 0}))
                const receipts = Array.from({length: feeStructures.length}).map((_) => ({receiptNo: '', date: '', receivedAmount: 0}))

                fees = await Fee.create({studentId: student._id, session, feesList: feeStructures, receipts, rebate: 0});
            }

            return res.status(200).json({success: true, data: {student: {...student, password: undefined}, fees}})
        }

        res.status(200).json({success: false, message: "No Student Found with provided Id"})


    } catch (err) {
        console.log(err)
    }
}

exports.calculateOverallDueAmount = async (req, res) => {
    try {
        // Get all fee documents from the collection
        const allFeeDocuments = await Fee.find({});

        if (!allFeeDocuments || allFeeDocuments.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No fee records found',
                data: {
                    totalDueAmount: 0,
                    totalFeeAmount: 0,
                    totalReceivedAmount: 0,
                    documentCount: 0
                }
            });
        }

        let overallTotalFeeAmount = 0;
        let overallTotalReceivedAmount = 0;
        let documentDetails = [];

        // Process each document
        allFeeDocuments.forEach((document, docIndex) => {
            const { feesList, receipts, studentId, session } = document;

            // Calculate totals for this document
            const documentTotalFeeAmount = feesList.reduce((sum, fee) => sum + (fee.amount || 0), 0);
            const documentTotalReceivedAmount = receipts.reduce((sum, receipt) => sum + (receipt.receivedAmount || 0), 0);
            const documentDueAmount = documentTotalFeeAmount - documentTotalReceivedAmount;

            // Add to overall totals
            overallTotalFeeAmount += documentTotalFeeAmount;
            overallTotalReceivedAmount += documentTotalReceivedAmount;

            // Store document details for response
            documentDetails.push({
                documentId: document._id,
                studentId: studentId,
                session: session,
                totalFeeAmount: documentTotalFeeAmount,
                totalReceivedAmount: documentTotalReceivedAmount,
                dueAmount: documentDueAmount,
                feeBreakdown: feesList.map((fee, index) => ({
                    feeName: fee.name,
                    feeAmount: fee.amount || 0,
                    receivedAmount: receipts[index]?.receivedAmount || 0,
                    individualDue: (fee.amount || 0) - (receipts[index]?.receivedAmount || 0)
                }))
            });
        });

        const overallDueAmount = overallTotalFeeAmount - overallTotalReceivedAmount;

        return res.status(200).json({
            success: true,
            message: 'Overall due amount calculated successfully',
            data: {
                overallDueAmount: overallDueAmount,
                overallTotalFeeAmount: overallTotalFeeAmount,
                overallTotalReceivedAmount: overallTotalReceivedAmount,
                totalDocuments: allFeeDocuments.length,
                documentDetails: documentDetails
            }
        });

    } catch (error) {
        console.error('Error calculating overall due amount:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while calculating due amount',
            error: error.message
        });
    }
};

exports.saveFee = async (req, res) => {
    try {

        const {studentId, session, feesList, receipts, rebate} = req.body;

        let fee = await Fee.findOne({studentId, session});

        fee.feesList = feesList;
        fee.receipts = receipts;
        fee.rebate = rebate;

        fee.save();

        return res.status(200).json({success: true})

    } catch (err) {
        console.log(err)
    }
}


exports.searchStudentResult = async (req, res) => {
    try {

        const {userName} = req.params;
        const {session} = req.query;

        const student = await User.findOne({userName}).populate("classId").lean()

        if (student) {

            let result = await Result.findOne({studentId: student._id, session});

            if (!result) {
                result = await Result.create({studentId: student._id, session});
            }

            return res.status(200).json({success: true, data: {student: {...student, password: undefined}, result}})
        }
        res.status(200).json({success: false, message: "No Student Found with provided Id"})

    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, err})
    }
}

exports.saveResult = async (req, res) => {
    try {
        const {studentId, session, term1, term2} = req.body;


        let result = await Result.findOne({studentId, session});

        result.term1 = term1;
        result.term2 = term2;

        result.save();

        return res.status(200).json({success: true})

        // res.status(200).json({success: false, message: "No Student Found with provided Id"})

    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, err})
    }
}
exports.saveProfile = async (req, res) => {
    try {
        const {userName, name, fName, mName, dob, penNo, aadharNo, rollNo, contactNo} = req.body;

        console.log("userName", userName)

        const student = await User.findOne({userName});

        student.name = name;
        student.fName = fName;
        student.dob = dob;
        student.penNo = penNo;
        student.rollNo = rollNo;
        student.contactNo = contactNo;
        student.mName = mName;
        student.aadharNo = aadharNo;

        await student.save()

        return res.status(200).json({success: true})

        // res.status(200).json({success: false, message: "No Student Found with provided Id"})

    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, err})
    }
}

//Helpers
const returnFeesRows = (className) => {
    if (["Nursery", "PG", "LKG", "UKG", "I", "II", "III", "IV", "V", "VI", "VII", "VIII"].includes(className)) {

        return ["Admission Form", "School Fee", "School Level Exam Fee", "1st Term Fee", "2nd Term Fee", "3rd Term Fee", "Other Fee", "Old Due "]
    } else if (["IX", "X"].includes(className)) {

        return ["Admission Form", "School Fee", "School Level Exam Fee", "1st Term Fee", "2nd Term Fee", "3rd Term Fee", "Other Fee", "Registration Fee", "Old Due "]


    } else if (["XI", "XII"].includes(className)) {
        return ["Admission Form", "School Fee", "School Level Exam Fee", "1st Term Fee", "2nd Term Fee", "3rd Term Fee", "Other Fee", "Board Fee", "Old Due "]

    }
}
