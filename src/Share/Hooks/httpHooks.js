import {useState,useEffect,useCallback,useRef} from "react";

export default function useHttpHook() {
    const [isLoading, setIsLoading] = useState(false);
    const [error,setError]=useState(null);
    const activeHttpRequest=useRef([]);

    useEffect(() => {
        return () => {
            activeHttpRequest.current.map(controller=>controller.abort())
        }
    }, [])

    const sendRequest=useCallback(async (url,method="GET",body=null,headers={})=>{
        try {
         const activeContoller=new AbortController();
         activeHttpRequest.current.push(activeContoller);
          setIsLoading(true);
            const resData=await fetch(url,{
                method,
                headers,
                body,
                signal:activeContoller.signal
            });
  
            const data=await resData.json();
            activeHttpRequest.current=activeHttpRequest.current.filter(controller=>controller!==activeContoller);
            
            if(!resData.ok){
                throw new Error(data.message) 
            }
            setIsLoading(false); 
            return data;
      }
      catch (error) {
         setIsLoading(false); 
          setError(error.message);
          throw error;
      }
            
    },[]);

    const errorHandler=()=>setError(null)

    return {isLoading,error,sendRequest,errorHandler}
}
