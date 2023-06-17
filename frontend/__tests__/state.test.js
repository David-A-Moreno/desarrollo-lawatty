import { answersSlice } from '../src/app/features/answers/answersSlice.js'

describe('answersSlice reducers', () => {
  it('should set lastInterface correctly', () => {
    const initialState = { lastInterface: 7 }
    const action = { payload: 10 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setLastInterface(action.payload))
    expect(nextState.lastInterface).toEqual(10)
  })

  it('should set sessionTime correctly', () => {
    const initialState = { sessionTime: 60 }
    const action = { payload: 45 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setSessionTime(action.payload))
    expect(nextState.sessionTime).toEqual(45)
  })

  it('should set sessionTime correctly', () => {
    const initialState = { sessionTime: 60 }
    const action = { payload: 45 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setSessionTime(action.payload))
    expect(nextState.sessionTime).toEqual(45)
  })

  it('should set timeSystem correctly', () => {
    const initialState = { timeSystem: null }
    const action = { payload: 'UTC' }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setTimeSystem(action.payload))
    expect(nextState.timeSystem).toEqual('UTC')
  })

  it('should set book correctly', () => {
    const initialState = { book: null }
    const action = { payload: 'Book Title' }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setBook(action.payload))
    expect(nextState.book).toEqual('Book Title')
  })

  it('should set bookPage correctly', () => {
    const initialState = { bookPage: null }
    const action = { payload: 5 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setBookPage(action.payload))
    expect(nextState.bookPage).toEqual(5)
  })

  it('should set currentInfoPrincipalPage correctly', () => {
    const initialState = { currentInfoPrincipalPage: 0 }
    const action = { payload: 1 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setCurrentInfoPrincipalPage(action.payload))
    expect(nextState.currentInfoPrincipalPage).toEqual(1)
  })

  it('should set breakTime correctly', () => {
    const initialState = { breakTime: 10 }
    const action = { payload: 15 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setBreakTime(action.payload))
    expect(nextState.breakTime).toEqual(15)
  })

  it('should set intervalBreak correctly', () => {
    const initialState = { intervalBreak: 15 }
    const action = { payload: 20 }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setIntervalBreak(action.payload))
    expect(nextState.intervalBreak).toEqual(20)
  })

  it('should set breakButton correctly', () => {
    const initialState = { breakButton: false }
    const action = { payload: true }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setBreakButton(action.payload))
    expect(nextState.breakButton).toEqual(true)
  })

  it('should set necessaryBreakButton correctly', () => {
    const initialState = { necessaryBreakButton: false }
    const action = { payload: true }
    const nextState = answersSlice.reducer(initialState, answersSlice.actions.setNecessaryButton(action.payload))
    expect(nextState.necessaryBreakButton).toEqual(true)
  })

  // Add more test cases for other reducers
})
