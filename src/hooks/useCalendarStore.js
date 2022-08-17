import { useSelector } from "react-redux"



export const useCalendarStore = () => {


  const { events, actveEvent } = useSelector(state => state.calendar);

  return {
    // * Propiedades
    events

    // * Metodos
  }
}
