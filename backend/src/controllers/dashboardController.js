const Lead = require('../models/Lead');

// @desc    Get dashboard stats
// @route   GET /api/admin/dashboard
// @access  Private (Admin)
exports.getDashboardStats = async (req, res, next) => {
    try {
        const totalLeads = await Lead.countDocuments();

        // New leads this week
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

        const newLeadsThisWeek = await Lead.countDocuments({
            createdAt: { $gte: startOfWeek }
        });

        // Leads by type
        const leadsByType = await Lead.aggregate([
            {
                $group: {
                    _id: '$leadType',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Leads by source
        const leadsBySource = await Lead.aggregate([
            {
                $group: {
                    _id: '$source',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Conversion by status
        const conversionByStatus = await Lead.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Time series (last 30 days)
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);

        const timeSeries = await Lead.aggregate([
            {
                $match: {
                    createdAt: { $gte: last30Days }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                totalLeads,
                newLeadsThisWeek,
                leadsByType,
                leadsBySource,
                leadsByStatus: conversionByStatus,
                recentLeads: await Lead.find().sort({ createdAt: -1 }).limit(5),
                leadsNeedingAttention: await Lead.countDocuments({ status: 'new' }),
                conversionRate: totalLeads > 0 ? ((await Lead.countDocuments({ status: 'closed' })) / totalLeads * 100).toFixed(1) : 0,
                timeSeries
            }
        });
    } catch (err) {
        next(err);
    }
};
