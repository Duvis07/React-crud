import React, { useState, useEffect } from 'react';
import UserTable from './components/UserTable/UserTable';
import AddUserForm from './components/AddUserForm/AddUserForm';
import EditUserForm from './components/EditUserForm/EditUserForm';
import { v4 as uuidv4 } from 'uuid';
const KEY = "Users_Save";

function App() {

  const localStorageUser = localStorage.getItem(KEY)
  let parsedUsers;

  if (!localStorageUser) {
    localStorage.setItem(KEY, JSON.stringify([{}]))
    parsedUsers = [{}];
  } else {
    parsedUsers = JSON.parse(localStorageUser)
  }

  //Estado

  const [users, setUSers] = useState(parsedUsers);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(users))
  }, [users])

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
      <h1 className= "titulo">CRUD USUARIOS</h1>
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
            <div >
              <h3>Agregar Usuario</h3>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h3>Ver lista de usuarios</h3>
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
