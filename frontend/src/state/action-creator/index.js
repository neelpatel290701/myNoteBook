const like = (count)=>{
    return (dispatch)=>{
        dispatch({
            type : "like",
            payload : count
        })
    }
}

const disLike = (count)=>{
    return (dispatch)=>{
        dispatch({
            type : "disLike",
            payload : count
        })
    }
}

export {like,disLike} ;