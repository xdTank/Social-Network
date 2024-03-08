import React, { FC, useState } from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { PostType } from "../../../types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../redux/reduxStore";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/profileReducer";
import { Button, Form, Input } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { selectProfile } from "../../../redux/profileSelector";


export type MyPostsPropsType = {
    posts: Array<PostType>

}
const Myposts: FC = React.memo(() => {
    const posts = useSelector((state: AppStateType) => state.profilePage.posts)
    let postsElements = [...posts].reverse().map(p => <Posts massege={p.massege} likeCount={p.likeCount} id={0} />)

    return (
        <div>
            <div style={{ display: "flex", borderTop: '1px solid grey', }}>
                <div style={{ paddingTop: '20px', marginLeft: '50px' }}>
                    <AddNewPostForm />
                </div>
            </div>
            <div className={s.posts} style={{ height: '60vh', overflowY: 'auto' }}>
                {postsElements}
            </div>
        </div >
    )
})

const Posts: FC<PostType> = (props) => {
    const profile = useSelector(selectProfile)
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '25px' }}>
            <img src={profile?.photos.large || icon} alt="!" style={{ width: '50px', borderRadius: '50%' }} />
            <div style={{ height: '40px', textAlign: 'center', alignItems: 'center', display: 'flex', padding: '5px', color: '#fff' }}>
                {props.massege}
            </div>
            <div style={{ color: '#fff', }}>
                <LikeOutlined />
                {props.likeCount}
            </div>
        </div>
    )
}


const AddNewPostForm = () => {
    const dispatch = useDispatch<any>()
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        dispatch(actions.addPostActionCreator(values.newPostText))
        form.resetFields()
    }
    return (
        <Form
            form={form}
            name="myPost_form"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Form.Item name="newPostText">
                    <Input placeholder="Yuor post" size="small" allowClear />
                </Form.Item>
                <Form.Item>
                    <Button style={{ backgroundColor: '#fff' }} size="small" htmlType="submit" >Add posts</Button>
                </Form.Item>
            </div>
        </Form >
    )
}


export default Myposts