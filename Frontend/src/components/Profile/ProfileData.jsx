import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import { getmemberid } from "../Login/LoginFn";
import ProfileMessage from "./ProfileMessage";
import { uploadtofirebase } from "../../Firebase/firebasefn";
import { senddatatosql } from "./sendprofile";
import { async } from "@firebase/util";
import { auth } from "../../Firebase/firebase-config";
import { updateProfile } from "firebase/auth";
import { getmemberallinfo } from './getmemberinfo';
import { addDays, format } from "date-fns";


Date.prototype.addDays = function (birthdate, days) {
  var date = new Date(birthdate);
  date.setDate(date.getDate() + days);
  return date
};





export default function ProfileData({
  profilesend,
  setProfileSend,
  emailref,
  nicknameref,
  realnameref,
  curgender,
  birthdayref,
  profileURL,
  arearef,
  signref,
  editfile,
  setEdit
}) {
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [frimgupdate, setFrImgUpdate] = useState(true);

  const [durl, setDurl] = useState("");

  let memberid = localStorage.getItem("memberid");
  let email = emailref.current.value;
  let nickname = nicknameref.current.value;
  let birthday = birthdayref.current.value;
  let gender = curgender;
  let area = `cityid=${parseInt(arearef.current.value)}`;
  let sign = signref.current.value;
  let realname = realnameref.current.value;
  let initialprofileURL = localStorage.getItem("profileURL");
  let memberrgitime = localStorage.getItem("memberregistertime");
  // realname, email, profileURL, nickname, birthday, area, sign
  let profiledata = {
    memberid: memberid,
    membername: realname,
    memberemail: email,
    membericon: initialprofileURL,
    membernickname: nickname,
    memberbirth: birthday,
    membergender: gender,
    memberintro: sign,
    memberregistertime: memberrgitime,

  };



  //console.log("this is memberid", localStorage.getItem("memberregistertime"));

  //系統提示訊息
  const [suopen, setSuOpen] = useState(false);
  const [sumessage, setSuMessage] = useState("");


  // const handleClickOpen = () => {
  //   setOpen(true);
  //   setProfileSend(true);
  //   setAgree(false);
  // };

  const handleClose = () => {
    setProfileSend(false);
    setEdit(false);
    setAgree(false);
  };

  const handleAgree = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!!editfile !== !!null) {

      await uploadtofirebase(editfile, setDurl, setFrImgUpdate);
    }
    //firebase userprofile
    await updateProfile(auth.currentUser, {
      displayName: profiledata.membername
    });
    await senddatatosql(profiledata, area);
    console.log("this membericon", profiledata.membericon);
    localStorage.setItem("name", profiledata.membername);

    await msgfn();
    //console.log("this is durl", durl);
  };
  useEffect(() => {
    if (frimgupdate === false) {
      setTimeout(() => {
        window.location.reload();

      }, 2300);
    }

  }, [frimgupdate])
  const msgfn = async () => {
    setTimeout(() => {

      setLoading(false);
      setSuOpen(true);

      const str = "修改成功";
      setSuMessage(() => str);
      console.log("修改成功");
      window.location.reload();
    }, 2300);

  };

  //設定用戶圖片到網頁
  useEffect(() => {
    if (!!durl !== !!null) {
      profiledata.membericon = durl;
      senddatatosql(profiledata, area);
      console.log("this is area", area);
      console.log("this is durl", durl);
      //console.log("durl not null!!", !!durl !== !!null);
      localStorage.setItem("profileURL", durl);

    }
  }, [durl, area, profiledata])

  return (
    <div>
      {suopen && <ProfileMessage suopen={suopen} setSuOpen={setSuOpen} sumessage={sumessage} />}
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        開啟對話窗
      </Button> */}
      <Dialog
        open={profilesend}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={() => setProfileSend(false)}
      >
        <DialogTitle id="alert-dialog-title">
          <h3>提示視窗</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h5> 確定要把表單送出嗎?</h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {loading ? (
            <LoadingButton
              loadingPosition="center"
              loading={loading}
              variant="outlined"
              disabled


            >
              等待中
            </LoadingButton>
          ) : (
            <>
              <Button onClick={handleAgree} autoFocus>
                確認送出
              </Button>
              <Button onClick={handleClose}>再想想</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
