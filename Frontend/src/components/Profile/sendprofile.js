import axios from 'axios';

export async function senddatatosql(profiledata, area) {

    await axios.put(
        `http://localhost:8080/member/${area}`,
        profiledata
    );
    console.log("put in databasse complete", profiledata.memberrgitime);


}