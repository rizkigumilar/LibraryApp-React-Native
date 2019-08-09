import axios from 'axios';

let url = `https://librarymobileapi.herokuapp.com`


export const getBook = () => {
    return {
        type: 'GET_BOOK',
        payload: axios.get(`${url}/book`)
    }
}

export const getMoreBook = (page) => {
    return {
        type: 'GET_PAGE',
        payload: axios.get(`${url}/book/cek/lah?page=${page}`),

    }
};


export const getBookid = (idBook) => {
    return {
        type: 'GET_BOOKID', idBook,
        payload: axios.get(`${url}/book/${idBook}`)
    }
}

export const postBook = (data) => {
    console.log(data)
    return {
        type: 'POST_BOOK',
        payload: axios.post(`${url}/book`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        })
    }
}

export const editBook = (data, idBook) => {
    return {
        type: 'EDIT_BOOK',
        payload: axios.patch(`${url}/book/${idBook}`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        }),
    }
}

export const deleteBook = (idBook) => {
    return {
        type: 'DELETE_BOOK',
        payload: axios.delete(`${url}/${idBook}`, {
            headers: {
                "authorization": "x-control-app",
            }
        }),
    };
}