import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: { counter: 0 },
    reducers: {
        increment(state, action) {
            state.counter++
        },
        decrement(state, action) {
            state.counter--

        },
        addBy(state, action) {
            state.counter += action.payload
        }
    }
})
export const actions = counterSlice.actions;
const store = configureStore({
    reducer: counterSlice.reducer
})

export default store


// const counter = useSelector((state) => state.counter)
// const dispatch = useDispatch()
// const increment = () => {
//     dispatch(actions.increment())
// }
// const decrement = () => {
//     dispatch(actions.decrement())
// }
// const addBy = () => {
//     dispatch(actions.addBy(20))
// }

// import { actions } from "../../redux/store";
// import { useSelector, useDispatch } from "react-redux";

