const FileManager = {
  getFileUrl({ fileName, user_id }) {
    fileName = fileName.replace(new RegExp(" ", "g"), "%20");
    return `http://localhost:3002/download?filename=${fileName}&id=${user_id}`;
  }
};

export default FileManager;
