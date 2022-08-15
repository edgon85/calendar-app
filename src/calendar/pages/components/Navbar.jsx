

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp;
        <span>Edgon</span>
      </div>

      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  )
}
