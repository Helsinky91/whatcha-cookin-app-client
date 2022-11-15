import service from "./config.services";

const uploadImageService = (imageFile) => {
  return service.post("/uploader", imageFile)
}

export {
  uploadImageService
}