import{createSlice} from '@reduxjs/toolkit'

const initialState = {
    token : null,
    isLogIn : false
}

const authSlice = createSlice({
    name:'auth',
    initialState ,
    reducers:{
        login : (state, action) => {

            state.token = action.payload;
            state.isLogIn = true;

        }, 
        logout: (state) => {
            state.token = null;
            state.isLogIn = false;

        },
    },

});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;