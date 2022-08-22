import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuthStore, useForm } from "../../hooks"

const loginFormField = {
  email: '',
  password: ''
}


export const LoginPage = () => {

  const { email, password, onInputChange } = useForm(loginFormField);
  const { startLogin, errorMessage }  = useAuthStore();


  const handleSubmit = (e) => {
    e.preventDefault();
    startLogin({ email, password });

  }

  useEffect(() => {
    if(  errorMessage != undefined) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [errorMessage])


  return (
    <div className="authPage">
      <div className="card-auth">
        <h1>Ingreso</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="correo"
            name="email"
            value={email}
            onChange={onInputChange}
          />
          <input
            type="password"
            placeholder="contraseña"
            name="password"
            value={password}
            onChange={onInputChange}
          />
          <button type="submit" className="btn btn-blue">Login</button>
          <Link className="link" to={ '/auth/register'}>Crear cuenta</Link>
        </form>
      </div>
    </div>

  )
}
