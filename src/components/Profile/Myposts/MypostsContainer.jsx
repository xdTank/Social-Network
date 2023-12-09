import { addPostActionCreator, updateNewPostTextActionCreator } from "../../../redux/profileReducer"
import Myposts from "./Myposts";
import { connect } from "react-redux";



const mapStateToProps = (state) => {
    return {
        posts: state.rofilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {
            let action = updateNewPostTextActionCreator(text)
            dispatch(action)
        },
        addPost: () => {
            dispatch(addPostActionCreator())
        }

    }
}
const MypostsContainer = connect(mapStateToProps, mapDispatchToProps)(Myposts)

export default MypostsContainer