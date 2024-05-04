import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProfileType } from "../../api/profile-api";

export type Post = {
    id: number
    content: string
    author: ProfileType
    authorId: string
    likes: Like[]
    comments: Comment[]
    likedByUser: boolean
    createdAt: Date
    updatedAt: Date
}

export type Like = {
    id: number
    user: ProfileType
    userId: string
    post: Post
    postId: string
}

export type Comment = {
    id: number
    content: string
    user: ProfileType
    userId: string
    post: Post
    postId: string
}

const initialState = {
    posts: [
        {
        },
    ] as Array<Post>,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPost(state, action: PayloadAction<{ content: string }>) {
            state.posts.push({
                id: Date.now(),
                content: action.payload.content,
                author: {} as ProfileType,
                authorId: '',
                likes: [],
                comments: [],
                likedByUser: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        },
        deletePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.filter(p => p.id !== action.payload)
        },
        updatePost(state, action: PayloadAction<{ id: number, content: string }>) {
            state.posts = state.posts.map(p => p.id === action.payload.id ? { ...p, content: action.payload.content } : p)
        },
        likePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.map(p => p.id === action.payload ? { ...p, likedByUser: !p.likedByUser } : p)
        },
        deleteComment(state, action: PayloadAction<{ postId: number, commentId: number }>) {
            state.posts = state.posts.map(p => p.id === action.payload.postId ? { ...p, comments: p.comments.filter(c => c.id !== action.payload.commentId) } : p)
        },
        unlikePost(state, action: PayloadAction<number>) {
            state.posts = state.posts.map(p => p.id === action.payload ? { ...p, likedByUser: !p.likedByUser } : p)
        }

    },
})

export const { actions, reducer } = postSlice