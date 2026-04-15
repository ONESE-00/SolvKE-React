import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        name: '',
        email: '',
        token: '',
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
              console.log("Redux setUser triggered:", action.payload);
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.name = '';
            state.email = '';
            state.token = '';
            state.isAuthenticated = false;
        }
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;