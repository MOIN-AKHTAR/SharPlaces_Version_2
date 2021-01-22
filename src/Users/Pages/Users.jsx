import React,{useEffect,useState} from 'react';
import UserList from '../Components/UserList';
import Loader from '../../Share/Components/UiElements/Loader';
import ErrorModal from '../../Share/Components/UiElements/ErrorModel';
import useHttpHook from '../../Share/Hooks/httpHooks'

export default function Users() {
    const {isLoading,error,sendRequest,errorHandler}=useHttpHook();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        ( (async ()=>{
           try {
            const usersData=await sendRequest("http://localhost:5000/api/v1/user");
            setUsers(usersData);
           } catch (error) {}
        } )())
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading&&<Loader/>}
            {!isLoading&&users&&(
                <UserList 
                 users={users} />
            )}
        </React.Fragment>
         
         
    )
}
