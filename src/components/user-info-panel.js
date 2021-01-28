import React from 'react';

function UserInfoPanel(props) {
    const user = props.user;
    return (
        <div>{user.name}</div>
    );
}

export default UserInfoPanel;