import { useCalendarStore } from "../../hooks"

export const FabDelete = () => {

  const { startDeletinEvent, hasEventSelected } = useCalendarStore();

  const handleDeleteEvent = () => {
    startDeletinEvent();
  }

  return (
    <button
      onClick={handleDeleteEvent}
      className="btn fab fab-danger"
      style={{ display: hasEventSelected ? '' : 'none' }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
