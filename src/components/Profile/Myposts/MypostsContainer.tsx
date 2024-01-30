import { actions } from "../../../redux/profileReducer"
import { AppStateType } from "../../../redux/reduxStore";
import Myposts, { DispatchPropsType, MyPostsPropsType } from "./Myposts";
import { connect } from "react-redux";



const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MypostsContainer = connect<MyPostsPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPostActionCreator })(Myposts)

export default MypostsContainer