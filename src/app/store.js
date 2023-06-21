import { configureStore } from '@reduxjs/toolkit'
import crudSlice from '../features/crudSlice'

export const store = configureStore({
  reducer: {
    crud:crudSlice,
  },
})