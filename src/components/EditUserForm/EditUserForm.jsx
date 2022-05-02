import React from "react";
import { useForm } from "react-hook-form";

const EditUserForm = (props) => {

    const { register, errors, handleSubmit, setValue } = useForm({
        defaultValues: props.currentUser,
    });

    setValue("name", props.currentUser.name);
    setValue("username", props.currentUser.username);

    const onSubmit = (data, e) => {
        data.id = props.currentUser.id
        props.updateUser(props.currentUser.id, data);
        e.target.reset();
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            
            <label>Name</label>
            <div>{errors?.name?.message}</div>
            <input
                type="text"
                name="name"
                {...register("name", { required: true, message: "Campo Requerido" })}
            />
            <span className="text-danger text-small d-block mb-2"></span>

            <label>Username</label>
            <input
                type="text"
                name="username"
                {...register("username", {
                    required: { value: true, message: "Campo Requerido" },
                })}
            />
            <button>Editar Usuario</button>
        </form>
    );
};

export default EditUserForm;
