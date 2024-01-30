import React, { FC } from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { InjectedFormProps, reduxForm } from "redux-form";

import { GetStringKeys, Input, createField } from "../../../FormsControl/FormsControl";
import { PostType } from "../../../types/types";


const Posts: FC<PostType> = (props) => {
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
export type MyPostsPropsType = {
    posts: Array<PostType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}
const Myposts: FC<MyPostsPropsType & DispatchPropsType> = React.memo(props => {
    let postsElements = [...props.posts].reverse().map(p => <Posts massege={p.massege} likeCount={p.likeCount} id={0} />)
    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText)
    }
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
type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesKeysType = GetStringKeys<AddPostFormValuesType>
const AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<AddPostFormValuesKeysType>("Yuor post", 'newPostText', [], Input)}
            <button>Add posts</button>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default Myposts