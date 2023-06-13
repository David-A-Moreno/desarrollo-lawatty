'use client'
import React,{ useState } from "react";
import axios from "axios";
import ExitButton from "../components/exitButton";
import swal from "sweetalert";

export default function Modal() {
    const [showModal, setShowModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.nombre === '' || form.email === '' || form.password === '' || form.confirmPassword === '') {
          setErrorMessage("Por favor llene todos los campos");
          return;
        }
        if (form.password !== form.confirmPassword) {
          setErrorMessage("Las contraseñas no coinciden");
          return;
        }
      
        setErrorMessage("");
      
        const nombre = form.nombre;
        const email = form.email;
        const password = form.password;
      
        axios.post("http://localhost:4000/api/usuarios", { nombre, password, email })
          .then(async () => {
            await swal({
              title: "Registro exitoso",
              icon: "success"
            });
            setShowModal(false);
            setForm({
              nombre: '',
              email: '',
              password: '',
              confirmPassword: ''
            });
          })
          .catch(async (error) => {
            await swal({
              title: error.response.data.msg,
              icon: "warning",
              button: "Aceptar"
            });
          });
      };
    return (
        <>
            {/*<ButtonBack texto='abrir' onClick={() => { setShowModal(true) }} />*/}
            <div className="text-sm">
                <a
                    onClick={() => { setShowModal(true) }}
                    className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                >
                    Registrate
                </a>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        data-testid="modal"
                    >
                        <div className="relative w-auto mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                                <section className="bg-gray-50">
                                    <div className="flex flex-col items-center justify-center px-6 ">
                                        <div className="w-full bg-white xl:p-0">
                                            <div className="flex justify-end mt-4" > 
                                                <ExitButton  onClick={() => setShowModal(false)} data-testid = "exitt"/>
                                            </div>
                                            <div className="pl-6 pr-6 pb-6 space-y-4 ">
                                                <h1 className="text-xl font-bold leading-tight tracking-tight text-black text-center">
                                                    Registro
                                                </h1>
                                                <form data-testid="registration-form" className="space-y-6" action="#" onSubmit={handleSubmit}>
                                                    <div>
                                                        <label htmlFor="nombre" className="block mb-2 text-sm font-medium  text-black">Nombre</label>
                                                        <input type="text" name="nombre" id="nombre" value={form.nombre} onChange={handleChange} className="bg-gray-50 border border-gray-300
                                                        rounded-xl focus:ring-primary-600 text-sm focus:border-primary-600 block w-full p-2.5 text-black " placeholder="Tu nombre" required="" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className="block mb-2 text-sm font-medium  text-black">Correo electrónico</label>
                                                        <input type="email" name="email" id="email" value={form.email} onChange={handleChange} className="bg-gray-50 border border-gray-300  rounded-xl focus:ring-primary-600 text-sm focus:border-primary-600 block w-full p-2.5 text-black " placeholder="nombre@compañia.com" required="" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="password" className="block mb-2 text-sm font-medium  text-black">Contraseña</label>
                                                        <input type="password" name="password" value={form.password} onChange={handleChange} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300  text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-black" required="" />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium  text-black">Confirmar Contraseña</label>
                                                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} className="bg-gray-50 border border-gray-300  text-sm rounded-xl focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  text-black" required="" />
                                                    </div>

                                                    {errorMessage && (
                                                        <div data-testid="error-message" className="text-suspend-session-button-color mb-4">{errorMessage}</div>
                                                    )}

                                                    <button data-testid='boton-registro' type="submit" className="w-full text-white font-medium rounded-xl text-sm px-5 py-2.5 text-center bg-blue-text-button ">Registrarse</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}