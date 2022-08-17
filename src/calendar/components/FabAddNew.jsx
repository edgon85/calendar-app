import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

const emptyEvent = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Camargo'
  }
};

export const FabAddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {

    setActiveEvent(emptyEvent);

    openDateModal();
  }

  return (
    <button
      onClick={handleClickNew}
      className="btn fab fab-primary ">
      <i className="fas fa-plus"></i>
    </button>
  )
}
