import service from "./config.services";

//connects with BE profile.routes.js  

//for profile of logged user
const getMyProfile = () => {
    return service.get("/profile/my-profile")
}

//for friend's profile
const getProfile= (id) => {
    return service.get(`/profile/${id}/details`)
}

//for add-friend button
const addFriend = (friendId, userId) => {
    return service.patch(`/profile/${friendId}/add-friend`, userId )
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//for add-friend button
const unFriend = (friendId, userId) => {
    return service.patch(`/profile/${friendId}/un-friend`, userId )
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//delete profile 
const deleteProfile = (id) => {
    return service.delete(`/profile/${id}/delete-profile`)
}

//edit profile
const editProfile = (id) => {
    return service.patch(`/profile/${id}/edit`)
}


export {
    getMyProfile,
    getProfile,
    addFriend,
    unFriend,
    deleteProfile,
    editProfile
}