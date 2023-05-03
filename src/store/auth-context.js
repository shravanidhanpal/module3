import React,{useState,useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: ()=>{} ,
    isLoggedout : (email,password)=>{}
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    useEffect(() => {
      if (storedUserLoggedInInformation === "1") {
        setIsLoggedIn(true);
        //  console.log("working");
      }
    }, []);


     const loginHandler = (email, password) => {
       localStorage.setItem("isLoggedIn", "1");
       setIsLoggedIn(true);
    };


     const logoutHandler = () => {
       setIsLoggedIn(false);
       localStorage.removeItem("isLoggedIn");
     };


    return (<AuthContext.Provider value={
        {
            isLoggedIn: isLoggedIn,
            isLoggedout: logoutHandler,
            onLogout: logoutHandler,
            onLogin: loginHandler
        }}>
        {props.children}
    </AuthContext.Provider>
    )
}

export default AuthContext;