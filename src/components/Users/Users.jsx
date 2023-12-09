import React from "react";

let Users = (props) => {
    if (props.users.length === 0){
        props.setUsers(
            [
                
            ]
        )
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} alt="" />
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button> : <button onClick={props.follow(u.id)}>Follow</button>}
                    </div>
                </span>
                <span>
                    <div>
                        {u.fullName}
                    </div>
                    <div>
                        {u.status}
                    </div>
                </span>
                <span>
                    <div>
                        {u.location.country}
                    </div>
                    <div>
                        {u.location.city}
                    </div>
                </span>
            </div>)
        }
    </div>
}
export default Users