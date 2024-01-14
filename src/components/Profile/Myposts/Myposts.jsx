import React from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators/validators";
import { Textarea } from "../../../FormsControl/FormsControl";


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


const Myposts = React.memo(props => {
    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }


    let postsElements = [...props.posts].reverse().map(p => <Posts massege={p.massege} likeCount={p.likeCount} />)
    return (
        <div className={s.postsBlock}>
            <div>
                <h3>My posts</h3>
            </div>
            <div>
                <AddNewPostReduxForm onSubmit={onAddPost} />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})
const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name="newPostText" component={Textarea} validate={[required, maxLengthCreator(10)]} />
            <button>Add posts</button>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default Myposts