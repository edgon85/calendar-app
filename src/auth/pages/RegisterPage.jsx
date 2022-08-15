import React from 'react'

export const RegisterPage = () => {
  return (
    <div className="authPage">
      <div className="card-auth register">
        <h1>Registro</h1>
        <form className="form">
          <input type="text" placeholder="Nombre" />
          <input type="text" placeholder="Correo" />
          <input type="text" placeholder="Contraseña" />
          <input type="text" placeholder="Repita la contraseña" />
          <button className="btn btn-white">Crear cuenta</button>
        </form>
      </div>
    </div>
  )
}
