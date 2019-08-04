import axios from 'axios'

const path = 'https://r-tracker-server.herokuapp.com/api'

export function newDuty(duty){
    return axios({
        url: `${path}/new-duty`,
        method: 'POST',
        data: duty
    })
}

export function getDuties(month, monthHalf){
    return axios({
        url: `${path}/get-duties?month=${month}&half=${monthHalf}`,
        method: 'GET'
    })
}

export function deleteDuty(id){
    return axios({
        url: `${path}/delete-duty/${id}`,
        method: 'DELETE'
    })
}

export function payDuty(id){
    return axios({
        url: `${path}/edit-duty/${id}`,
        method: 'PATCH',
        data: {status: 'paid'}
    })
}

export function transferDuty(id, half){
    return axios({
        url: `${path}/edit-duty/${id}`,
        method: 'PATCH',
        data: {monthHalf: half}
    })
}

export function editDuty(id, duty){
    return axios({
        url: `${path}/edit-duty/${id}`,
        method: 'PATCH',
        data: duty
    })
}

export function cloneDuties(month){
    return axios({
        url: `${path}/clone-duties?prevMonth=${month}`,
        method: 'GET',
    })
}