const mongoose = require('mongoose');

const envVarSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true }
});

const EnvVar = mongoose.model('EnvVar', envVarSchema);

module.exports = EnvVar;
const mongoose = require('mongoose');

const envVarSchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('EnvVar', envVarSchema);
