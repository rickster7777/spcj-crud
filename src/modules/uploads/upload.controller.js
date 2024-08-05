import XLSXPopulate from 'xlsx-populate';
import fs from 'fs';
import uploadRepository from '../../database/upload/uploadRepository';

export const uploadXlsxFile = async (req, res) => {
  const filePath = req.file.path;
  console.log(`File uploaded to: ${filePath}`); // Logging the file path

  const workbook = await XLSXPopulate.fromFileAsync(filePath);
  const sheet = workbook.sheet(0); // Assuming you want to read the first sheet
  const rows = sheet.usedRange().value();

  console.log('Rows read from file:', rows.length); // Log the number of rows read

  const headers = rows[0];
  let records = rows.slice(1).map(row => {
    let record = {};
    row.forEach((cell, index) => {
      record[headers[index]] = cell;
    });
    return record;
  });

  // Process records as needed, e.g., save to database
  
  console.log("record", records);
  await uploadRepository.get().create(records); // Assuming create method accepts an array of records

  res.create(200, 'File processed and data saved successfully', records);

  res.on('finish', () => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file', err);
      } else {
        console.log(`File deleted: ${filePath}`);
      }
    });
  });
};
