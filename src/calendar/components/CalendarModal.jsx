import { useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import Swal from 'sweetalert2';
import { useMemo } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';
import { useEffect } from 'react';

registerLocale('es', es)

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    /*     marginRight: '-50%',
        transform: 'translate(-50%, -50%)', */
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();


  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  })

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { title, notes, start, end } = formValues;

  const onCloseModal = () => {
    closeDateModal();
  }

  const handleInputChnage = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChange = (event, changin) => {
    setFormValues({
      ...formValues,
      [changin]: event
    })
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(end, start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar fechas ingresadas', 'error');
      return;
    }

    if (title.length <= 0) return;

    await startSavingEvent( formValues );
    closeDateModal();
    setFormSubmitted(false);
  }

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (title.length > 0) ? '' : 'is-invalid';
  }, [title, formSubmitted])


  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({...activeEvent});
    }

  }, [activeEvent])


  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h2 className='modal-title'>Nuevo evento</h2>
      <hr />
      <form className="modal-wrapper" onSubmit={onSubmit}>
        <div className="group-form">
          <label>Fecha y hora de inicio</label>
          <DatePicker
            className="picker"
            onChange={(event) => onDateChange(event, 'start')}
            selected={formValues.start}
            minDate={formValues.start}
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption='hora'
          />
        </div>

        <div className="group-form">
          <label>Fecha y hora de fin</label>
          <DatePicker
            className="picker"
            onChange={(event) => onDateChange(event, 'end')}
            selected={formValues.end}
            dateFormat="Pp"
            minDate={formValues.start}
            showTimeSelect
            locale="es"
            timeCaption='hora'
          />
        </div>
        <hr />
        <div className="group-form">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`control-form ${titleClass}`}
            placeholder="Fecha de inicio"
            name='title'
            value={formValues.title}
            onChange={handleInputChnage}
          />
          <small className='muted-text'>Una descripción corta</small>
        </div>

        <div className="group-form">
          <textarea
            type="text"
            name="notes"
            placeholder="notas"
            value={formValues.notes}
            onChange={handleInputChnage}

          ></textarea>
          <small className="text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-blue"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  )
}
