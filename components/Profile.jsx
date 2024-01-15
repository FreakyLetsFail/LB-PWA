import React from 'react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <div className="profile-container">
      <h1>{name}</h1> {/* Display the user's name */}
      <p>{desc}</p> {/* Display the description */}
      
      {/* Additional elements to display data (if necessary) */}
      <div className="data-section">
        {data && data.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      {/* Action buttons */}
      <button onClick={handleEdit}>Edit Profile </button>
        {/* Action buttons */}
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  )
}

 {/* Add Users*/}

  {/* Add Verbindungen */}

   {/* Add Termine*/}

 {/* Delete Users*/}

  {/* Delete Verbindungen */}

   {/* Delete Termine*/}


export default Profile;
