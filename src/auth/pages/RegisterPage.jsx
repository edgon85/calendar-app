
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks'


const registerFormField = {
  name: '',
  email: '',
  password: '',
  password2: ''

}

export const RegisterPage = () => {

  const { name, email, password, password2, onInputChange } = useForm(registerFormField);
  const { startRegister, errorMessage } = useAuthStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      Swal.fire('Error  en registro', 'Contraseñas no son iguales', 'error');
      return;
    }

    startRegister({ name, email, password });
  }

  useEffect(() => {
    if (errorMessage != undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])

  return (
    <div className="authPage">
      <div className="card-auth register">
        <h1>Registro</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            name="name"
            value={name}
            onChange={onInputChange}
          />
          <input
            type="email"
            placeholder="Correo"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="Repita la contraseña"
            name="password2"
            value={password2}
            onChange={onInputChange}
          />
          <button className="btn btn-white">Crear cuenta</button>
          <Link className="link" to={'/auth/login'}>Crear cuenta</Link>
        </form>
      </div>
    </div>
  )
}
