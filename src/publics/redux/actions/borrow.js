import axios from 'axios';

export const postBorrow = (data) => {
    return {
        type: 'POST_BORROW',
        payload: axios.post(`http://192.168.6.191:3001/borrow`, data)
    }
}

export const getBorrow = () => {
    return {
        type: 'GET_BORROW',
        payload: axios.get(`http://192.168.6.191:3001/borrow`)
    }
}

export const userBorrow = (idNum) => {
    return {
        type: 'USER_BORROW',
        payload: axios.get(`http://192.168.6.191:3001/profile/${idNum}`)
    }
}

export const updateBorrow = (idBook, data) => {
    console.log(idBook)
    return {
        type: 'PATCH_BORROW',
        payload: axios.patch(`http://192.168.6.191:3001/borrow/${idBook}`, { penalty: data })
    }
}