import React from 'react';
import './UserCard.css'; // Import the CSS file
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const UserCard = ({ firstName,lastName, age, mailId, gender,imageurl,_id ,deleteuser}) => {
  const navigate=useNavigate()

  return (
    <div className="user-card">
      <img className="user-image" src={imageurl} alt={`profile`} />
      <div className="user-info">
        <h2 className="username">{`${firstName} ${lastName}`}</h2>
        <p className="age">Age: {age}</p>
        <p className="email">Email: {mailId}</p>
        <p className="gender">Gender: {gender}</p>
      </div>
      <div className="buttons">
        <button className="update-btn btn" >
        <Link  to={`/updateuser/${_id}`} >Update</Link>
        </button>
        <button className="btn delete-btn" onClick={()=>{deleteuser(_id)}} >Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
