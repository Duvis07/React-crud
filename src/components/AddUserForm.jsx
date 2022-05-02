import React from 'react';
import { useForm } from 'react-hook-form';

const AddUserForm = (props) => {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = (data, e) => {
        props.addUser(data);
        //limpiar campos
        e.target.reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name</label>
            <input type="text" name="name"
                {...register('name', { required: true, message: 'Campo Requerido' })} />
            <div>
                {errors?.name?.message}
            </div>

            <label>UserName</label>
            <input type="text" name="username"
                {...register('username', { required: true, message: 'Campo Requerido' })} />
            <div>
                {errors?.name?.message}
            </div>
            
            <button>Agregar usuario</button>

        </form>
    );

}
export default AddUserForm;