import { createSlice } from '@reduxjs/toolkit';
import { sampleData } from '../../data/sampleData';

const initialState = {
  calendarData: sampleData,
  selectedDate: null,
  showModal: false,
  selectedDateData: null,
  currentView: 'month',
  currentDate: new Date(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
      const dateKey = action.payload.toLocaleDateString('en-GB').replace(/\//g, '-');
      state.selectedDateData = state.calendarData[dateKey] || null;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    setCurrentDate: (state, action) => {
      state.currentDate = action.payload;
    },
    openModalWithDate: (state, action) => {
      const date = action.payload;
      state.selectedDate = date;
      const dateKey = date.toLocaleDateString('en-GB').replace(/\//g, '-');
      state.selectedDateData = state.calendarData[dateKey] || null;
      state.showModal = true;
    },
    closeModal: (state) => {
      state.showModal = false;
      state.selectedDateData = null;
    },
  },
});

export const {
  setSelectedDate,
  setShowModal,
  setCurrentView,
  setCurrentDate,
  openModalWithDate,
  closeModal,
} = calendarSlice.actions;

export default calendarSlice.reducer;
