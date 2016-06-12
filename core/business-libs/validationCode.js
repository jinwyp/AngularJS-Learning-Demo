/**
 * Created by jinwyp on 6/12/16.
 */



var validationCode = {
    user : {
        usernameWrong : {code:1001, message:"Field validation error,  username length must be 4-30", field:'username'},
        passwordWrong : {code:1002, message:"Field validation error,  password length must be 6-30", field:'password'},
        emailWrong : {code:1003, message:"Field validation error, Email format wrong", field:'email'},
        mobileWrong : {code:1004, message:"Field validation error, mobile number format wrong", field:'mobile'},

        usernameExist : {code:1011, message:"Field validation error,  username already exist", field:'username'},
        passwordExist : {code:1012, message:"Field validation error,password already exist", field:'password'},
        emailExist : {code:1013, message:"Field validation error,  email already exist", field:'email'},
        mobileExist : {code:1014, message:"Field validation error, mobile number already exist", field:'mobile'},

        userNotFound :  {code:1101, message:"User Unauthorized, user not found", field:'username'},
        passwordNotMatch :  {code:1102, message:"User Unauthorized, password not match", field:'password'},

        businessMessageTypeWrong : {code:1201, message: "Field validation error, businessMessageTypeWrong wrong", field:'messageType'},
        SMSCodeLengthWrong : {code:1203, message:  "Field validation error,  SMS code length must be 6-6", field:'smscode'},
        SMSCodeNotFound : {code:1204, message: "Field validation error, SMS code not found", field:'smscode'},
        SMSCodeExpired : {code:1205, message: "Field validation error, SMS code expired", field:'smscode'}
    },

    token : {
        tokenLengthWrong : {code:4001, message:"Field validation error,  accessToken length must be 4-30", field:'accessToken'},
        tokenNotFound : {code:4003, message:"User Unauthorized, token not found", field:'X-Access-Token'},
        userNotFound : {code:4004, message:"User Unauthorized, user not found", field:'X-Access-Token'},
        tokenDecodeWrong : {code:4008, message:"User Unauthorized, token wrong", field:'X-Access-Token'},
        tokenExpired : {code:4009, message:"User Unauthorized, token expired", field:'X-Access-Token'}

    }
};


module.exports = validationCode;

