import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import RoleTabs from '../../components/Tabs/RoleTabs';
import { getUser } from '../../http';

const Profile = ({setIsAuth}) => {
    const navigate = useNavigate()

    useEffect(() => {
        const func = async () => {
            const user = await getUser()
            
            if (Object.keys(user).length === 0) {
                setIsAuth(false)
                navigate("/")
            } else {
                setIsAuth(true)
            }
        }
        func()
    }, [])

    return ( 
        <>
            <RoleTabs/>
        </>
    );
}
 
export default Profile;