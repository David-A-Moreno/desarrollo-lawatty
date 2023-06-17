import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lastInterface: 7,
  currentInfoPrincipalPage: 0,
  sessionTime: 60,
  timeSystem: null,
  book: null,
  bookPage: null,
  breakTime: 10,
  intervalBreak: 15,
  breakButton: false,
  necessaryBreakButton: false
}

export const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {
      setLastInterface: (state, action) => {
        state.lastInterface = action.payload
      },
      setSessionTime: (state, action) => {
        state.sessionTime = action.payload
      },
      setTimeSystem: (state, action) => {
        state.timeSystem = action.payload
      },
      setBook: (state, action) => {
        state.book = action.payload
      },
      setBookPage: (state, action) => {
        state.bookPage = action.payload
      },
      setCurrentInfoPrincipalPage: (state, action) => {
        state.currentInfoPrincipalPage = action.payload
      },
      setBreakTime: (state, action) => {
        state.breakTime = action.payload
      },
      setIntervalBreak: (state, action) => {
        state.intervalBreak = action.payload
      },
      setBreakButton: (state, action) => {
        state.breakButton = action.payload
      },
      setNecessaryButton: (state, action) => {
        state.necessaryBreakButton = action.payload
      }
    },
  })

  // Action creators are generated for each case reducer function
  export const {setLastInterface, setSessionTime, setTimeSystem, setBook, setBookPage
  ,setCurrentInfoPrincipalPage, setBreakTime, setIntervalBreak, setBreakButton, setNecessaryButton} = answersSlice.actions

  export default answersSlice.reducer