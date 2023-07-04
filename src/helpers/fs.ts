import fs from 'fs';

export function deleteFile(filePath:string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      } else {
        console.log('file deleted successfully');
      }
    });
  }