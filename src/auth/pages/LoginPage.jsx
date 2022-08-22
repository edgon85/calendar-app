import { Link } from "react-router-dom";
import { useForm } from "../../hooks"

const loginFormField = {
  email: '',
  password: ''
}


export const LoginPage = () => {

  const { email, password, onInputChange } = useForm(loginFormField);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  }

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
          <Link className="link" compo to={ '/auth/register'}>Crear cuenta</Link>
        </form>
      </div>
    </div>

  )
}
