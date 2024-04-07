import React, { FC, useState } from "react";
import s from "./Myposts.module.css"
import icon from "../../../assets/img/44884218_345707102882519_2446069589734326272_n.jpg"
import { PostType } from "../../../types/types";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../store/store";
import { useDispatch } from "react-redux";
import { Button, Form, Input } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { profileSlice } from "../../../store/reducers/profile-slice";


export type MyPostsPropsType = {
    posts: Array<PostType>

}
const Myposts: FC = React.memo(() => {
    const posts = useAppSelector(state => state.profile.posts)
    const postsElements = [...posts].reverse().map(p => <Posts massege={p.massege} likeCount={p.likeCount} id={0} />)

    return (
        <div>
            <div style={{ display: "flex", borderTop: '1px solid grey', }}>
                <div style={{ paddingTop: '20px', marginLeft: '50px' }}>
                    <AddNewPostForm />
                </div>
            </div>
            <div className={s.posts} style={{ height: '55vh', overflowY: 'auto' }}>
                {postsElements}
            </div>
        </div >
    )
})

const Posts: FC<PostType> = (props) => {
    const photos = useAppSelector(state => state.profile.profile?.photos?.small)
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '25px' }}>
            <img src={photos || icon} alt="!" style={{ width: '50px', borderRadius: '50%' }} />
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
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        dispatch(profileSlice.actions.addPost(values))
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