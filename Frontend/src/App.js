import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import React, { Component, createContext, useContext } from 'react';
import Prac from "./components/Practice/Prac";
import Student from "./components/Practice/Student";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./components/Homepage/HomePage";
import Footer from "./components/Footer/Footer";

import ScrollTop from "./components/Homepage/ScrollTop";
import Favorite from "./components/Favorite/Favorite";

import Login from "./components/Login/Login";

import NavbarGuest from "./components/Navbar/NavbarGuest";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase-config";
import { useEffect, useState } from "react";
import Profile3 from "./components/Profile/Profile3";
import JourneyHome from "./components/JourneyPlanning/JourneyHome";

import Map from "./components/JourneyPlanning/Map";
import About from "./components/About/About";

import Blog from "./components/Blog/Blog";
import Myblog from "./components/Myblog/Myblog";
import BlogShow from "./components/Blog-show/BlogShow";

import Blogeditor from "./components/Blogeditor/Blogeditor";
import Dashboard from './components/Dashboard/Dashboard';
import QuestionAnswer from './components/QA/QuestionAnswer';
import DashBoardLogin from './components/DashBoardLogin/DashBoardLogin';
import Github from "./components/Dashboard/Github";
import Member from './components/Dashboard/Member'
import { getadminloginpage, getisadmin, setisadmin } from "./components/DashBoardLogin/DBoardLoginInfo";
import PageNotFound from "./components/PageNF/PageNotFound";
import LoginSuccessPage from "./components/Login/LoginSuccessPage";
import Test4 from "./Test/Test4";
import Crud from './components/Dashboard/Crud'
import SearchPage from "./components/SearchPage/SearchPage";
import FirebaseTest1 from "./Test/FirebaseDatabase/FirebaseTest1";




export const AppContext = createContext();


function App() {
  const [user, setUser] = useState({});


  //登入登出狀態 監聽
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  //判斷地圖進入
  const [openMap, setOpenMap] = useState(false);



  //判斷後台和後台登入
  const location = useLocation();

  // const isdashboardRendering = (location.pathname === "/dashboard" || "/members" || "reports" || "employee") || (location.pathname === "/dashboardlogin");
  const ismap = location.pathname === "/map";

  const [isadmin, setIsAdmin] = useState("");
  const [adname, setAdName] = useState("");
  // const [adminloginpage, setAdminLoginPage] = useState("")
  useEffect(() => {
    const conditionbackendlogin = async () => {
      setIsAdmin(await getisadmin())
    }

    conditionbackendlogin();

  }, [isadmin])
  const adminlogin = localStorage.getItem("adminloginpage");
  console.log("adminloginpage", adminlogin);




  //用戶搜尋值
  const [search, setSearch] = useState("");

  //console.log("App",isadmin);
  console.log("App用戶搜尋值", search);
  return (
    <AppContext.Provider value={{ user, isadmin, setIsAdmin }}>
      <div className="App">

        {(isadmin === "false" && adminlogin === "false") && <ScrollTop />}
        {/* isadmin === "false" &&  */}{(adminlogin === "false") && (user ? <Navbar user={user} setSearch={setSearch} /> : <NavbarGuest user={user} setSearch={setSearch} />)}


        <Routes>
          {/* need write route */}
          <Route path="*" element={< PageNotFound />} />

          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginsuccess" element={<LoginSuccessPage />} />

          <Route path="/about" element={<About />} />
          <Route path="/qa" element={<QuestionAnswer />} />
          <Route path="/test" element={<FirebaseTest1 />} />
          <Route path="/searchpage" element={<SearchPage search={search} />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/myblog" element={<Myblog />} />
          <Route path="/blogshow" element={<BlogShow user={user} />} />

          <Route path="/blogeditor" element={<Blogeditor />} />
          {user && <Route path="/profile" element={<Profile3 />} />}
          {user && <Route path="/favorite" element={<Favorite />} />}

          <Route path={"/journeyplanhome"} element={localStorage.getItem("email") != null ? <JourneyHome openMap={openMap} setOpenMap={setOpenMap} /> : <Login />} />

          {user && <Route path="/map" element={<Map />} />}
          <Route path="/dashboardlogin/*" element={<DashBoardLogin isadmin={isadmin} setIsAdmin={setIsAdmin} setAdName={setAdName} />} />
          {isadmin === "true" &&
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/github" element={<Github />} />
              <Route path="/dashboard/member" element={<Member />} />
              <Route path="/dashboard/crud" element={<Crud />} />
            </>
          }
          <Route path="/dashboard/*" element={<BackendLoading />} />
        </Routes>
        {(adminlogin === "false" && !ismap) && <Footer />}



      </div >
    </AppContext.Provider >
  );
}
{
  /* <Prac /> */
}
export default App;

const BackendLoading = () => {
  return (
    <div className="backendloading" style={{ backgroundColor: 'whitesmoke' }}>

    </div>
  )
}
