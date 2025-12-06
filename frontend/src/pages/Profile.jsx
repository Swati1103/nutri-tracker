import React from "react";
import heroImage from "../../src/assets/images/heroImage.png";


const Profile = () => {
  return (
    <div className="flex justify-center my-10">
      <div className="hover-3d ">
        {/* content */}
        <figure className="max-w-100 rounded-2xl shadow-2xl">
          <img
            src={heroImage}
            className="h-96"
            alt="3D card"
          />
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Profile;
