const ExcelJS = require('exceljs');

const exportToExcel = async (res, data, fileName) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Leads');

    // Define columns
    worksheet.columns = [
        { header: 'ID', key: '_id', width: 25 },
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Email', key: 'email', width: 25 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Lead Type', key: 'leadType', width: 15 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'City', key: 'city', width: 15 },
        { header: 'Date', key: 'createdAt', width: 20 },
    ];

    // Add rows
    data.forEach(item => {
        worksheet.addRow(item);
    });

    // Set response headers
    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + fileName + '.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
};

module.exports = exportToExcel;
