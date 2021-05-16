import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { changePage } from '../user/user.actions';
import UserCharts from '../_components/UserCharts';

const MainUserPage = () => {
    let dispatch = useDispatch();

    useEffect(() => {
      dispatch(changePage("Home"))
    }, []);




    return (
        <>
            <UserCharts />
            <hr/>
        </>
    );
}

export default MainUserPage;