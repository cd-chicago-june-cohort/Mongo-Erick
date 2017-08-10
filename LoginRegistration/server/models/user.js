var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Email not valid format. Please try again."],
    },
    first_name: {
        type: String,
        required: [true, "first name is required!"],
        trim: true,
    },
    last_name: {
        type: String,
        required: [true, "last name is required!"],
        trim: true,
    },
    pass_word: {
        type: String,
        required: [true, "password is required!"],
        minlength: 8,
        maxlength: 32,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,32}/.test(value);
            },
            message: "Password failed validation, you must have at least 1 number, uppercase and special character"
        }
    },
    birthday: Date,
})
mongoose.model('User', UserSchema);