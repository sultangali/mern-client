import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './slices/user.js'
import { todoReducer } from './slices/todo.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        todo: todoReducer
    }
})

export default store