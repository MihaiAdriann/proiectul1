
import React from 'react';
import UserItem from './UserItem';

function UserList(props) {
  const { users, deletePost } = props;

  return (
    <div>
      <h2>Lista utilizatorilor:</h2>
      {users.map((user, index) => {
        return (
          <UserItem
            id={user.id}
            name={user.name}
            email={user.email}
            salariu={user.salariu}
            image={user.image}
            isGoldClient={user.isGoldClient}
            key={index}
            deletePost={deletePost} // Adăugăm funcția deletePost ca prop pentru UserItem
          />
        );
      })}
    </div>
  );
}

export default UserList;
