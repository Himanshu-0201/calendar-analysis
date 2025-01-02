import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '../../app/store.ts';
import SingIn from '../SignIn/SignIn.tsx';
import Avatar from './Avatar/Avatar.tsx';

const Nav = () => {

    // const isUserSignedIn = useSelector((state: RootState) => state.userInfo.isSingedIn);
    const isUserSignedIn = true;


    return (

        <div className="border-2 _nav-container">
            <div className="place-self-end _nav-avatar-container flex items-center space-x-4">

                {isUserSignedIn ?
                    <>
                        <div className="flex items-center space-x-4 border-2 border-gray-300 p-3 rounded-md">
                            <p className="text-gray-700 font-medium">See registered time till now</p>
                            {/* <CheckInCheckOut /> */}
                        </div>

                        <Avatar />
                    </>

                    : <SingIn /> }
            </div>
        </div>
    )

};


export default Nav;