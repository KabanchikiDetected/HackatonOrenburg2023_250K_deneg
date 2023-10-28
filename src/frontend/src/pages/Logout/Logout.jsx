import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { logout } from '../../http';

const Logout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        logout()
        navigate("/")
    })

    return (<></>);
}
 
export default Logout;