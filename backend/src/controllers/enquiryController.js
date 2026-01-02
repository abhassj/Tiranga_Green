const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');
const exportToExcel = require('../utils/exportToExcel');

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
exports.createEnquiry = async (req, res, next) => {
    try {
        const lead = await Lead.create(req.body);

        // Send email alert to admin
        const message = `
            New Enquiry Received!
            
            Name: ${lead.name}
            Phone: ${lead.phone}
            Email: ${lead.email || 'N/A'}
            Type: ${lead.leadType}
            City: ${lead.city || 'N/A'}
            Message: ${lead.message || 'N/A'}
            
            Log in to admin panel to view details.
        `;

        try {
            await sendEmail({
                email: process.env.ALERT_EMAIL_TO,
                subject: `New Lead: ${lead.name} - ${lead.leadType}`,
                message
            });
        } catch (error) {
            console.error('Email send failed:', error);
            // Don't fail the request if email fails
        }

        res.status(201).json({
            success: true,
            data: lead
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get all enquiries with filtering and pagination
// @route   GET /api/admin/enquiries
// @access  Private (Admin)
exports.getEnquiries = async (req, res, next) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
        removeFields.forEach(param => delete reqQuery[param]);

        // Create query string
        let queryStr = JSON.stringify(reqQuery);

        // Create operators ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        // Parsing query
        let parsedQuery = JSON.parse(queryStr);

        // Search feature (name, phone, email)
        if (req.query.search) {
            const searchRegex = { $regex: req.query.search, $options: 'i' };
            parsedQuery.$or = [
                { name: searchRegex },
                { phone: searchRegex },
                { email: searchRegex }
            ];
        }

        query = Lead.find(parsedQuery);

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Lead.countDocuments(parsedQuery);

        query = query.skip(startIndex).limit(limit);

        // Executing query
        const leads = await query;

        // Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        res.status(200).json({
            success: true,
            count: leads.length,
            total,
            pagination,
            data: leads
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Get single enquiry
// @route   GET /api/admin/enquiries/:id
// @access  Private (Admin)
exports.getEnquiry = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Leads not found' });
        }

        res.status(200).json({
            success: true,
            data: lead
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Update enquiry
// @route   PATCH /api/admin/enquiries/:id
// @access  Private (Admin)
exports.updateEnquiry = async (req, res, next) => {
    try {
        let lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Leads not found' });
        }

        lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: lead
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Delete enquiry
// @route   DELETE /api/admin/enquiries/:id
// @access  Private (Admin)
exports.deleteEnquiry = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Leads not found' });
        }

        await lead.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        next(err);
    }
};

// @desc    Export enquiries to Excel
// @route   GET /api/admin/export/enquiries
// @access  Private (Admin)
exports.exportEnquiries = async (req, res, next) => {
    try {
        const leads = await Lead.find({}).sort('-createdAt');
        await exportToExcel(res, leads, 'Enquiries');
    } catch (err) {
        next(err);
    }
};
// @desc    Reply to enquiry via email
// @route   POST /api/admin/enquiries/:id/reply
// @access  Private (Admin)
exports.replyToEnquiry = async (req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);

        if (!lead) {
            return res.status(404).json({ success: false, message: 'Lead not found' });
        }

        const { subject, message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Please provide a message' });
        }

        if (!lead.email) {
            return res.status(400).json({ success: false, message: 'This lead has no email address associated with it.' });
        }

        try {
            await sendEmail({
                email: lead.email,
                subject: subject || `Re: Enquiry regarding ${lead.leadType}`,
                message: `Dear ${lead.name},\n\n${message}\n\nBest Regards,\nTiranga Green Team`
            });

            // Optional: Update internal notes to log that a reply was sent
            lead.internalNotes = (lead.internalNotes ? lead.internalNotes + '\n' : '') +
                `[Replied on ${new Date().toLocaleString()}]: ${message.substring(0, 50)}...`;
            await lead.save();

            res.status(200).json({
                success: true,
                message: 'Email sent successfully'
            });
        } catch (error) {
            console.error('Reply email failed:', error);
            return res.status(500).json({ success: false, message: 'Email could not be sent' });
        }
    } catch (err) {
        next(err);
    }
};
