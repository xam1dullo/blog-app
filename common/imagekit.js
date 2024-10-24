export function uploadImage(filePath, fileName) {
  return imagekit.upload({
    file: filePath, // Path to the file or base64 encoded string. We'll use the file path.
    fileName: fileName, // Name to be given to the uploaded file
    folder: '/uploads', // Optional: Folder path at your ImageKit media library
    tags: ['tag1', 'tag2'], // Optional: Tags for the file
    useUniqueFileName: true // Optional: Whether to use a unique filename
  });
}
