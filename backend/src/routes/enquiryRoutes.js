const express = require('express');
const {
    createEnquiry,
    getEnquiries,
    getEnquiry,
    updateEnquiry,
    deleteEnquiry,
    exportEnquiries,
    replyToEnquiry
} = require('../controllers/enquiryController');
const { protect } = require('../middlewares/authAdmin');

const router = express.Router();

// Public route
router.post('/', createEnquiry);

// Admin routes
router.use(protect); // All routes below are protected

router.get('/admin/list', getEnquiries); // Changed path to avoid conflict if mounted at /api/enquiries
// Actually, better structure might be:
// GET /api/enquiries (Admin List)
// POST /api/enquiries (Public Create)
// But to separate admin concern clearly:
// Public: POST /api/enquiries
// Admin: GET /api/admin/enquiries, GET /api/admin/enquiries/:id, etc.
// But usually REST uses same resource.
// Let's stick to the plan:
// POST /api/enquiries (Public)
// GET /api/admin/enquiries (Admin) - wait, plan said GET /api/admin/enquiries
// So I should mount this router at /api/enquiries and check permissions inside or split routers.
// Splitting routers is cleaner.
// Public router: /api/enquiries (POST)
// Admin router: /api/admin/enquiries (GET, PUT, DELETE)

// Let's make this file handle BOTH or just one?
// I'll make this handle /api/enquiries and /api/admin/enquiries if I mount it twice? No.
// I will structure this file to export a router that serves /api/enquiries (public POST) and another for admin?
// Or just put everything here and handle paths.

// Let's assume this router is mounted at /api/enquiries
// router.route('/')
//     .post(createEnquiry);

// But getting list is Admin only.
// router.route('/')
//     .get(protect, getEnquiries);

// This works.

router.route('/')
    .post(createEnquiry)
    .get(protect, getEnquiries);

router.get('/export', protect, exportEnquiries);

router.route('/:id/reply').post(protect, replyToEnquiry);

router.route('/:id')
    .get(protect, getEnquiry)
    .patch(protect, updateEnquiry)
    .delete(protect, deleteEnquiry);

module.exports = router;
