import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useStore from '../../store/store';
import UpdateProfile from './UpdateProfile';

function UpdateProfileHandler() {
    const { id } = useParams();
    const { setUser } = useStore();
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(response => response.json())
            .then(json => {
                setUser(json);
                setIsLoading(false);
            })
            .catch(err => {
                throw Error('User Not Found')
            })
    }, [id])

    if (!isLoading) {
       return  <UpdateProfile />
    } 
}

export default UpdateProfileHandler;