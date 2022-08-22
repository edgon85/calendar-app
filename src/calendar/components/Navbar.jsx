import { useAuthStore } from "../../hooks"


export const Navbar = () => {

  const { user, startLogOut } = useAuthStore();

  return (
    <div className="navbar">
      <div className="brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        <span>{user.name}</span>
      </div>

      <button
        onClick={startLogOut}
        className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}
