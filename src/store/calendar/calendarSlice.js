import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Pagar impuesos',
  notes: 'pagar antes de 30 de cada mes',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Camargo'
  }
};


export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    addNewEvent: (state) => {
      console.log('nuevo evento');
    },
  }

});


export const { addNewEvent } = calendarSlice.actions;