import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onDisableActiveEvent, onLoadingEvents, onSetActiveEvent, onUpdateEvent } from "../store";



export const useCalendarStore = () => {

  const dispatch = useDispatch();

  const { events, activeEvent } = useSelector(state => state.calendar);
  const { user } = useSelector(state => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  }

  const setDisableEvent = () => {
    dispatch(onDisableActiveEvent());
  }

  const startSavingEvent = async (calendarEvent) => {

    try {
      if (calendarEvent.id) {
        // actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }

      //  creando
      const { data } = await calendarApi.post('/events', calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {

      Swal.fire('Error al guardar', error.response.data?.msg, 'error');
    }



  }

  const startDeletinEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeleteEvent());

    } catch (error) {
      Swal.fire('Error al eliminar', error.response.data?.msg, 'error');
    }
  }

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadingEvents(events));

    } catch (error) {
      console.log('error cargando eventos');
      console.log(error);
    }
  }

  return {
    // * Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    // * Metodos
    setActiveEvent,
    setDisableEvent,
    startDeletinEvent,
    startLoadingEvents,
    startSavingEvent,

  }
}
