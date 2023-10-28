import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../http';

const Logout = ({setIsAuth}) => {
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate("/")
        setIsAuth(false)
    }, [])

    return (<></>);
}
 
export default Logout;