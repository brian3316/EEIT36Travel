import axios from 'axios'

export async function getmemberallinfo(currentemail) {
    const axiosstar = await axios.get(`http://localhost:8080/member/email=${currentemail}`)
    const axiosdata = await axiosstar.data;
    
    return axiosdata
}