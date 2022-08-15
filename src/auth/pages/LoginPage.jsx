

export const LoginPage = () => {
  return (
    <div className="authPage">
      <div className="card-auth">
        <h1>Ingreso</h1>
        <form className="form">
          <input type="text" placeholder="correo" />
          <input type="text" placeholder="contraseña" />
          <button className="btn btn-blue">Login</button>
        </form>
      </div>
    </div>

  )
}
