import React from 'react';

const UserComp = ({user}) => {
      return (
            <div className='text-xl'>
                  <p>Username :<span className='bg-orange-500'>{user.username?user.username:"No Name"}</span></p>
                  <p>Email :<span className='bg-orange-500'>{user.email?user.email:"No Email"}</span></p>
            </div>
      );
};

export default UserComp;