import React, { FC, useState } from "react";
import s from "./Myposts.module.css"
import { Button, Form, Input } from "antd";
import { DeleteOutlined, LikeOutlined, UserOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { PostType, profileSlice } from "../../../store/reducers/profile-slice";
import { ProfileType } from "../../../api/profile-api";
import { FaPlus } from "react-icons/fa"
import { FcLike } from "react-icons/fc"


const Myposts: FC<{ isOwner: boolean, profile: ProfileType }> = React.memo(({ isOwner }) => {
    const posts = useAppSelector(state => state.profile.posts)
    const postsElements = [...posts].reverse().map(p => <Posts message={p.message} likeCount={p.likeCount} id={p.id} />)

    return (
        <div>
            <div style={{ display: "flex", borderTop: '1px solid grey', }}>
                <div style={{ paddingTop: '20px', marginLeft: '50px' }}>
                    {isOwner && <AddNewPostForm />}
                </div>
            </div>
            <div className={s.posts} style={{ height: '55vh', overflowY: 'auto', }}>
                {postsElements}
            </div>
        </div >
    )
})

const Posts: FC<PostType> = ({ message, likeCount, id }) => {
    const dispatch = useAppDispatch()
    const [likes, setLikes] = useState(likeCount)
    const [liked, setLiked] = useState(false)
    const hadleLike = () => {
        if (!liked) {
            setLiked(true)
            setLikes(prevLikes => prevLikes + 1)
        } else {
            setLiked(false)
            setLikes(prevLikes => prevLikes - 1)
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '25px' }}>
            <div style={{ height: '40px', textAlign: 'center', alignItems: 'center', display: 'flex', padding: '5px', color: '#fff', gap: '10px' }}>
                {message}
            </div>
            <div style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '5px', }}>
                <FcLike onClick={hadleLike} style={{ cursor: 'pointer' }} />
                {likes}
            </div>
            <div >
                <Button
                    onClick={() => { dispatch(profileSlice.actions.removePost(id)) }}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fff' }} size="small" type="text">
                    <DeleteOutlined />
                </Button>
            </div>
        </div >
    )
}


const AddNewPostForm = () => {
    const dispatch = useAppDispatch()
    const [form] = Form.useForm()

    const onFinish = (value: any) => {
        dispatch(profileSlice.actions.addPost(value))
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
                <Form.Item name="message">
                    <Input placeholder="Yuor post" size="small" allowClear />
                </Form.Item>
                <Form.Item>
                    <Button style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', gap: '5px' }} size="small" htmlType="submit" ><FaPlus />Add posts</Button>
                </Form.Item>
            </div>
        </Form >
    )
}


export default Myposts