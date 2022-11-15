import service from "./config.services";

//connects with BE profile.routes.js  

//for profile of logged user
const getMyProfileService = () => {
    return service.get("/profile/my-profile")
}

//for friend list
const getProfilesListService = () => {
    return service.get(`/profile/search-friends`)
}

//for friend's profile
const getProfileService = (id) => {
    return service.get(`/profile/${id}/details`)
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//for add-friend button
const addFriendService = (userId) => {
    return service.patch(`/profile/${userId}/add-friend`)
}

//!Profile.jsx changeAndUpdate que venga de friendId y userId 
//for add-friend button
const unFriendService = (userId) => {
    return service.patch(`/profile/${ userId }/un-friend`)
}

//delete profile 
const deleteProfileService = (id) => {
    return service.delete(`/profile/${id}/delete-profile`)
}

//edit profile
const editProfileService = (userId, profileChanges) => {
    return service.patch(`/profile/${userId}/edit`, profileChanges)
}

// //update profile
// const updateProfileService = (id, profileChanges) => {
//     return service.patch(`/profile/${id}/details`, profileChanges)
// }

//update profile
const updateProfileService = (id, profileChanges) => {
    return service.patch(`/profile/${id}/details`, profileChanges)
}

//recipes createds by user
const myCreatedRecipesService = () => {
    return service.get(`/profile/my-recipes`)
}

// reciebe the favourites recipes of user
const favouriteUserRecipesService = () => {
    return service.get(`/profile/fav-recipes`)
}

// reciebe a populate list of user friends
const myFriendsService = (userId) => {
    return service.get(`/profile/${userId}/friends`)
}
export {
    getMyProfileService,
    getProfileService,
    addFriendService,
    unFriendService,
    deleteProfileService,
    editProfileService,
    getProfilesListService,
    updateProfileService,
    favouriteUserRecipesService,
    myCreatedRecipesService,
    myFriendsService

}


