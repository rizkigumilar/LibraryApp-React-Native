import axios from 'axios';

let url = `https://librarymobileapi.herokuapp.com`

export const postBorrow = (data) => {
    return {
        type: 'POST_BORROW',
        payload: axios.post(`${url}/borrow`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}

export const getBorrow = () => {
    return {
        type: 'GET_BORROW',
        payload: axios.get(`${url}/borrow`, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}

export const userBorrow = (idNum) => {
    return {
        type: 'USER_BORROW',
        payload: axios.get(`${url}/profile/${idNum}`, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}

export const updateBorrow = (bookid, data) => {
    console.log(bookid)
    return {
        type: 'PATCH_BORROW',
        payload: axios.patch(`${url}/borrow/${bookid}`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}