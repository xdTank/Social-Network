import React, { FC } from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { InjectedFormProps, reduxForm } from "redux-form";

import { GetStringKeys, Input, createField } from "../../../FormsControl/FormsControl";
import { PostType } from "../../../types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import { Button } from "antd";


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
const Myposts: FC = React.memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    const dispatch = useDispatch<any>()
    let postsElements = [...posts].reverse().map(p => <Posts massege={p.massege} likeCount={p.likeCount} id={0} />)
    let onAddPost = (values: AddPostFormValuesType) => {
        dispatch(actions.addPostActionCreator(values.newPostText))
    }
    return (
        <div  >
            <h3 style={{ textAlign: 'center' }}>My posts</h3>
            <div style={{ display: "flex", }}>
                <div>
                </div>
                <div>
                    <AddNewPostReduxForm onSubmit={onAddPost} />
                </div>
            </div>
            <div className={s.posts} style={{ height: '300px', overflowY: 'auto' }}>
                {postsElements}
            </div>
        </div >
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
        <form >
            <div style={{ display: 'flex' }}>
                {createField<AddPostFormValuesKeysType>("Yuor post", 'newPostText', [], Input)}
                <Button onClick={props.handleSubmit}>Add posts</Button>
            </div>
        </form>
    )
}

const AddNewPostReduxForm = reduxForm<AddPostFormValuesType, PropsType>({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default Myposts