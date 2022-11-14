import service from "./config.services";

//edit profile
const adminEditProfileService = (id) => {
    return service.patch(`/profile/${id}/edit`)
}

//update profile
const adminUpdateProfileService = (id, profileChanges) => {
    return service.patch(`/profile/${id}/details`, profileChanges)
}

export {
    adminEditProfileService,
    adminUpdateProfileService
}
