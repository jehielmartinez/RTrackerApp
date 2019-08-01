import axios from 'axios'

const path = 'https://r-tracker-server.herokuapp.com/api'

export function newDuty(duty){
    return axios({
        url: `${path}/new-duty`,
        method: 'POST',
        data: duty
    })
}