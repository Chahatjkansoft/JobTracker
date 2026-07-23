const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    name: { type: String, require: true },
    surName: { type: String },
    mobileNo: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true, unique: true },
    issdeleted: { type: Boolean },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Profile", ProfileSchema);