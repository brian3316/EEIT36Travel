import React, { useEffect, useState } from "react";
import axios from "axios";
<<<<<<< HEAD
import { async } from "@firebase/util";
import { set } from "date-fns";
=======
>>>>>>> origin/feature/googlemap
function Test3() {
  const [data, setData] = useState();
  const [address, setAddress] = useState([]);

<<<<<<< HEAD
  const [useremail, setUserEmail] = useState("");
  const [showemail, setShowEmail] = useState("");

  const [exist, setExist] = useState("");

  const [open, setOpen] = useState(true);

  const getuseremail = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

=======
>>>>>>> origin/feature/googlemap
  useEffect(() => {
    // const axiosdata = async () => {
    //   const result = await axios.get(
    //     "https://api.github.com/users/hadley/orgs"
    //   );

    //   const resdata = await result.data[0].id;
    //   setData(resdata);
    // };

<<<<<<< HEAD
=======


>>>>>>> origin/feature/googlemap
    // const handleProxy = async () => {
    //   const axiosgoogledata = await axios.get("/maps/api/place/textsearch/json?key=AIzaSyA1A_ajOEo-A7Mpuhm000U4zK-sGAvlTQc&language=zh-TW&query=台中百貨公司");

    //   const axiosgoogleresult = await axiosgoogledata.data.results;

    //   const googleaddress = await axiosgoogleresult.map((item) => item.formatted_address)

    //   setAddress(googleaddress)

<<<<<<< HEAD
    // }
    // axiosdata();
    // handleProxy();
    const connectmemberdetail = async () => {
      try {
        const axiosmember = await axios.get(
          "http://localhost:8080/member/email=bntt5533@gmail.com"
        );
        const memberdata = await axiosmember.data;
        console.log(memberdata.memberemail);
        setShowEmail(memberdata.memberemail);
      } catch (error) {
        console.log(error);
      }
    };
    connectmemberdetail();
  }, [exist]);
  const handleauth = async () => {
    setOpen(!open);
    try {
      const axiosmember = await axios.get(
        `http://localhost:8080/member/email=${useremail}`
      );
      const memberdata = await axiosmember.data;
      console.log(memberdata.memberemail);
      if (useremail === showemail) {
        setExist("帳號已經存在");
      } 
      // setShowEmail(memberdata.memberemail);
    } catch (error) {
      
      setExist("此帳號不存在");
      console.log(error);
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <h1>AXIOS</h1>

      <input type="email" name="" id="" onChange={getuseremail} />
      <button onClick={handleauth}>Auth</button>
      {/* <h3>{showemail}</h3> */}
      <h3>{exist}</h3>
      {/* 請使用map()渲染出你要的畫面 */}
    </div>
=======


    // }
    // axiosdata();
    // handleProxy();



  }, []);



  return (

    <div style={{ height: '100vh' }}>
      <h1>AXIOS</h1>


      {/* 請使用map()渲染出你要的畫面 */}




    </div>

>>>>>>> origin/feature/googlemap
  );
}

export default Test3;
