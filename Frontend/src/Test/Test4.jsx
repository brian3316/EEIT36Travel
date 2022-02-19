import axios from 'axios';
import { addDays, format } from 'date-fns/esm';
import { logEvent } from 'firebase/analytics';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { analytics, auth } from '../Firebase/firebase-config';


function Test4() {
    // const db = getDatabase();
    // const dbRef = ref(getDatabase());
    const [data2, setData2] = useState([]);
    const [show, setShow] = useState(false);
    const [testgender, setTestGender] = useState("");

    const handleClick = async () => {
        // const getfirebasebackendinfo = await get(child(dbRef, `currentreg/num`));
        // const getprevnum = await getfirebasebackendinfo.val();
        // await update(ref(db, `currentreg/`), { num: getprevnum + 1 });
        // const getnewinfo = await get(child(dbRef, `currentreg/num`));
        // const getnewnum = await getnewinfo.val();




    };
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        const changename = "bntt 5533";
        const changephotourl = "https://previews.123rf.com/images/pandavector/pandavector1605/pandavector160500618/56794127-icono-de-ni%C3%B1o-avatar-de-ilustraci%C3%B3n-vectorial-para-dise%C3%B1o-web-y-m%C3%B3vil.jpg"
        const changephotourl2 = "https://lh3.googleusercontent.com/a/AATXAJy7phPYZQ_u-doPHut4LjlSHUeq90r_6D6KCBs=s96-c"
        test5(changename, changephotourl2);

    }
    const test5 = (changename, changephotourl) => {
        updateProfile(auth.currentUser, {
            displayName: changename, photoURL: changephotourl
        }).then(() => {

            console.log("修改成功");
            // Profile updated!
            // ...
        }).catch((error) => {
            console.log(error.message);
            // An error occurred
            // ...
        });
    };

    useEffect(() => {
        // onAuthStateChanged(auth, (currentUser) => {
        //     if (currentUser != null) {
        //         console.log(currentUser);
        //         console.log(currentUser.providerId);

        //     }

        // })
        const today = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
        console.log("this is today", today);

    }, [])


    useEffect(() => {
        const test2 = async () => {
            const axiosdata = await (await axios.get("http://localhost:8080/member/")).data;
            // const axiosresult = await axiosdata.data;
            setData2(axiosdata);

        }
        test2();
        console.log(data2);

    }, [])

    return <div>
        <button onClick={handleClick}>Click</button>
        <button onClick={handleShow}>Show</button>
        <button onClick={handleUpdateUser}>Updateuser</button>
        {/* {JSON.stringify(data2)} */}
        {/* {console.log(data2)} */}
        <div style={{ width: '80%', height: '80vh', overFlow: 'scroll' }}>
            <div style={{ display: (show ? '' : 'none') }}>
                {data2.map((item, index) => <ul key={index}>
                    <li>memid：{item.memberid}<br />
                        name：{item.membername}<br />
                        email：{item.memberemail}
                    </li>
                </ul>)
                }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <input
                    type="radio"
                    name="gender2"
                    id=""
                    value="boy"
                    defaultChecked={localStorage.getItem("testgender") === "boy" && true}
                    onChange={(e) => {
                        setTestGender(e.target.value)
                        localStorage.setItem("testgender", e.target.value);

                    }} />男生<br />
                <input
                    type="radio"
                    name="gender2"
                    id=""
                    value="girl"
                    onChange={(e) => {
                        setTestGender(e.target.value)
                        localStorage.setItem("testgender", e.target.value);

                    }

                    } />  女生<br />
                <button onClick={() => console.log(testgender)}>Show Gender</button>
            </div>
        </div>

    </div>;
}

export default Test4;
