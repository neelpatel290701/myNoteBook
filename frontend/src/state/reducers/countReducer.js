const reducer = (state = 0, action) => {
    switch (action.type) {
        case "like":
            return state + action.payload;
        case "disLike":
            return state - action.payload;
        default:
            return state;
    }
};

export default reducer;