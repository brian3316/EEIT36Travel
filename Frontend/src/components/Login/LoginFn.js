
import axios from "axios"
import { child, get, getDatabase, ref, update } from "firebase/database";

export async function getuseremail(useremail) {
    try {
        const axiosgetdata = await axios.get(`http://localhost:8080/member/email=${useremail}`);
        const axiosresult = await axiosgetdata.data;

        //console.log("GetUserInfo", axiosresult.memberemail);
        return axiosresult.memberemail;
    } catch (error) {
        const c1 = false;
        return c1;
    }


}

export async function setregmemberid() {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const getfirebasebackendinfo = await get(child(dbRef, `currentreg/num`));
    const getprevnum = await getfirebasebackendinfo.val();
    await update(ref(db, `currentreg/`), { num: getprevnum + 1 });
    const getnewinfo = await get(child(dbRef, `currentreg/num`));
    const getnewnum = await getnewinfo.val();

    return getnewnum;
}

export async function getmemberid(currentuseremail) {
    const axiosget = await axios.get(`http://localhost:8080/member/email=${currentuseremail}`);
    const axiosdata = await axiosget.data;
    const memberid = await axiosdata.memberid;

    console.log("這是memberID", memberid);
    return memberid

}
export async function getmemberrigtime(currentuseremail) {
    const axiosget = await axios.get(`http://localhost:8080/member/email=${currentuseremail}`);
    const axiosdata = await axiosget.data;
    const memberrigtime = await axiosdata.memberregistertime;
    return memberrigtime
}

export async function getmemberimgurl(memberid) {

    const axiosgetdata = await axios.get(`http://localhost:8080/member/${memberid}`);
    const axiosresult = await axiosgetdata.data;
    const memberimgurl = await axiosresult.membericon;

    return memberimgurl;

}

export async function createnewuser(currentuseremail, currentusername, currentuserprofileURL) {
    const axiospostdata = await axios.post("http://localhost:8080/member/", {
        membername: currentusername,
        memberemail: currentuseremail,
        membericon: currentuserprofileURL,
        // memberregistertime: new Date()
    })

    //const axiosres = await axiospostdata.data;   

    return console.log("return cureateuser status", axiospostdata.status);

}


export async function existenceemaillpassword(currentemail, currentpassword) {

    let errormessage = { open: true, message: 'hey hey 見鬼啦' };
    //write useremail error message 

    if (!currentemail === !null && !!currentpassword === !!null) {
        errormessage = { open: true, message: '請輸入您的信箱或密碼!!!' }
        return errormessage;
    } else if (!currentemail.includes("@")) {
        errormessage = { open: true, message: '請填寫正確格式的信箱地址!!!' }
        return errormessage;
    } else if (currentpassword.length < 6) {
        errormessage = { open: true, message: '密碼必須6位數以上!!!' }
        return errormessage;
    }
    else {
        errormessage = { open: false, message: '這個其實是正確的訊息hahaha請填寫正確格式的信箱地址和密碼!!!' }
        return errormessage;
    }



}

export async function getcityid(memberid) {
    try {
        const axiosdata = await axios.get(`http://localhost:8080/city/memberid=${memberid}`);

        const axiosresult = await axiosdata.data;

        return axiosresult
    } catch (error) {
        const ercityid = "8";
        return ercityid;
    }

}







