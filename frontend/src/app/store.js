import { configureStore } from '@reduxjs/toolkit'
import answersReducer from './features/answers/answersSlice'

export const store = configureStore({
  reducer: {
    answers: answersReducer,
  },
}) 