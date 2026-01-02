const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phone: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    whatsapp: {
        type: String
    },
    companyName: {
        type: String
    },
    leadType: {
        type: String,
        enum: ['commercial', 'housing_society', 'residential', 'general'],
        default: 'general'
    },
    city: String,
    pincode: String,
    state: String,
    avgMonthlyBill: {
        type: mongoose.Schema.Types.Mixed // Can be number or string range
    },
    source: {
        type: String,
        default: 'website-form'
    },
    message: String,
    internalNotes: String,
    status: {
        type: String,
        enum: ['new', 'in_progress', 'closed'],
        default: 'new'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
