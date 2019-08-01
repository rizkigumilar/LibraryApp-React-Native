import axios from 'axios';
import { AsyncStorage } from 'react-native'

export const getUsers = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://192.168.6.191:3001/user`,
            {
                headers: {
                    "authorization": "x-control-app",
                    "x-access-token": `token: ${localStorage.jwToken}`,
                    "x-control-user": localStorage.userid
                }
            })
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`http://192.168.6.191:3001/register`, data)
    }
}

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`http://192.168.6.191:3001/user/member/${userid}`)
    }

};

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://192.168.6.191:3001/user/login`, data, {
            headers: {
                "authorization": "x-control-app",
            }
        }).then(res => {
            console.log(res)
            const token = res.data.result.token
            const userid = res.data.result.userid
            const name = res.data.result.fullname
            const status = res.data.result.status
            const idNum = res.data.result.idNum
            AsyncStorage.setItem('idNum', idNum)
            AsyncStorage.setItem('status', status)
            AsyncStorage.setItem('userid', userid)
            AsyncStorage.setItem('jwToken', token)
            AsyncStorage.setItem('name', name)

        })
    }
}
