import { createSlice, configureStore } from '@reduxjs/toolkit';
const storedToken = localStorage.getItem('token');

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLogin: storedToken, 
        token: storedToken || null,

    },
    reducers: {
        login(state, action) {
            state.isLogin = true
            state.token = action.payload; // Set the token received from the action payload

        },
        logout(state) {
            state.isLogin = false
            state.token = null; // Clear the token on logout

        }
    }
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
})