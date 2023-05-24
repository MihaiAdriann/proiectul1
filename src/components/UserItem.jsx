import React from 'react';

function UserItem(props) {
  const { id, name, email, salariu, image, isGoldClient, deleteUser } = props;


  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>{salariu}</p>
      <img src={image} alt="NoImage" style={{ width: '100px' }} />
      {isGoldClient ? <h3>Client GOLD</h3> : null}
      <button onClick={() => deleteUser(id)}>Delete</button>
    </div>
  );
}

export default UserItem;
