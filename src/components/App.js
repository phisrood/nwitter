import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService, updateProfile} from "fBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        updateProfile(user, {displayName : user.displayName??"User"});
        setUserObj(user);
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = ()=>{
    const user = authService.currentUser;
    setUserObj(Object.assign({},user));
  }
  return (
    <>
      { init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser}/> : "Initializing..."}
    </>
  );
}

export default App;
