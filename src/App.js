import React, { useState } from 'react';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const usersData = [

    { id: uuidv4(), name: 'Tania', username: 'floppydiskette' },
    { id: uuidv4(), name: 'Craig', username: 'siliconeidolon' },
    { id: uuidv4(), name: 'Ben', username: 'benisphere' },

  ];
  //Estado
  const [users, setUSers] = useState(usersData);

  //Agregar usuarios
  const addUser = (user) => {
    user.id = uuidv4();
    setUSers([
      ...users,
      user

    ])
  }

  //Eliminar un usuario
  const deleteUser = (id) => {
    setUSers(users.filter(user => user.id !== id))


  }

  //Editar un usuario
  const [editing, setEditing] = useState(false);

  const [currentUser, setCurrentUSer] = useState({
    id: null,
    name: "",
    username: "",
  });

  const editRow = (user) => {
    setEditing(true);
    setCurrentUSer({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false)
    setUSers(users.map(user => (user.id === id ? updateUser : user)))
  }







  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">

          {editing ? (
            <div>
              <h2>Editar Usuario</h2>
              <EditUserForm currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Agregar Usuario</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>Ver lista de usuarios</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </div>

      </div>
    </div>

  );
}

export default App;
