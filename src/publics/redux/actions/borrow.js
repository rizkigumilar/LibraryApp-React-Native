import axios from 'axios';

export const postBorrow = (data) => {
    return {
        type: 'POST_BORROW',
        payload: axios.post(`http://192.168.6.191:3001/borrow`, data,
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            }
        )
    }
}

export const getBorrow = () => {
    return {
        type: 'GET_BORROW',
        payload: axios.get(`http://192.168.6.191:3001/borrow`,
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            })
    }
}

export const userBorrow = (idNum) => {
    return {
        type: 'USER_BORROW',
        payload: axios.get(`http://192.168.6.191:3001/profile/${idNum}`,
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            })
    }
}

export const updateBorrow = (idBook, data) => {
    console.log(idBook)
    return {
        type: 'PATCH_BORROW',
        payload: axios.patch(`http://192.168.6.191:3001/borrow/${idBook}`, { penalty: data },
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            })
    }
}