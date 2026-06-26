export const uploadFile = async (file: File) => {
  console.log("Uploading:", file.name);
};

export const deleteFile = async (fileName: string) => {
  console.log("Deleting:", fileName);
};