import service from "./config.services";

//connects with BE profile.routes.js  

//for profile of logged user
const getMyProfileService = () => {
    return service.get("/profile/my-profile")
}

//for friend list
const getProfilesListService = (id) => {
    return service.get(`/profile/search-friend`)
}

//for friend's profile
const getProfileService = (id) => {
    return service.get(`/profile/${id}/details`)
}

//for add-friend button
const addFriendService = (friendId, userId) => {
    return service.patch(`/profile/${friendId}/add-friend`, userId )
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//for add-friend button
const unFriendService = (friendId, userId) => {
    return service.patch(`/profile/${friendId}/un-friend`, userId )
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//delete profile 
const deleteProfileService = (id) => {
    return service.delete(`/profile/${id}/delete-profile`)
}

//edit profile
const editProfileService = (id) => {
    return service.patch(`/profile/${id}/edit`)
}


export {
    getMyProfileService,
    getProfileService,
    addFriendService,
    unFriendService,
    deleteProfileService,
    editProfileService,
    getProfilesListService
}