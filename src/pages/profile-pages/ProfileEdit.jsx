import React from 'react'

function ProfileEdit() {

  //states 

  //hanglechanges..

  
  return (
    <div>

    <h1>Edit your profile</h1>

     <div>
                                                        {/* enctype is used for Cloudinary */}
     <form action="/profile/{id}/edit/" method="POST" enctype="multipart/form-data">
        
        <label for="profilePicImage">Upload a profile pic:</label>
        <input  type="file" name="profilePicImage"/>
            {/* type="file" and class is  is used for Cloudinary */}
        <br/>
        <label for="firstName">Username:</label>
        <input type="text" name="firstName" value="{{firstName}}"/>
        <br/>
        <label for="email">Email:</label>
        <input type="email" name="email" value="{{email}}"/>
        <br/>
        <label for="tags">Tags:</label>
        <input type="text" name="tags" value="{{tags}}"/>
    
        <br/>
        {/* functionality */}
        <button>Submit changes</button>

    </form>

        {/* functionality */}
    
      <button>delete</button>
      
     </div>


    </div>
  )
}

export default ProfileEdit