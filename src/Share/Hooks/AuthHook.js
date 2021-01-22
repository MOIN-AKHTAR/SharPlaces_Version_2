import {useCallback,useEffect,useState} from 'react'

let logoutTimer;

export default function AuthHook() {
    const [token, setToken] = useState(null);
    const [userId,setUserId]=useState(null);
    const [expirationTime,setExpirationTime]=useState(null);

    const login=useCallback((id,token,remainingTime)=>{
      const expirationTime=remainingTime || new Date(new Date().getTime()+(10000*60*58));
      setToken(token);
      setUserId(id);
      setExpirationTime(expirationTime);
      localStorage.setItem("userData",JSON.stringify({
        userId:id,
        token,
        expiration:expirationTime.toISOString()
      }))
    },[]);


    const logout=useCallback(()=>{
      setToken(null);
      setUserId(null);
      setExpirationTime(null);
      localStorage.removeItem("userData");
    },[]);


    useEffect(() => {
      if (token && expirationTime) {
        const remainingTime = expirationTime.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, expirationTime]);


    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);

    return {
        token,
        userId,
        expirationTime,
        login,
        logout
    }

}
