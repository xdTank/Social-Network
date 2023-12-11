import React from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"


const Posts = (props) => {
    return (
        <div className={s.likeCountBlock}>
            <img src={icon} alt="!" />
            <div className={s.massegeBlock}>
                {props.massege}
            </div>
            <div className="likeCount">
                {props.likeCount}
            </div>
        </div>
    )
}


const Myposts = (props) => {
    let newPostElement = React.createRef();
    let onAddPost = () => {
        props.addPost()
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text)
    }

    let postsElements = props.posts.map(p => <Posts massege={p.massege} likeCount={p.likeCount} />)
    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <div>
                <textarea
                    onChange={onPostChange}
                    value={props.newPostText}
                    ref={newPostElement} />
                <button onClick={onAddPost}>Add posts</button>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default Myposts