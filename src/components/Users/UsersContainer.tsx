import React from 'react';
import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    requestUsers
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/usersSelectors";
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    users: Array<UserType>,
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    followingInProgress: Array<number>,
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number,) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}
type PropsType = MapStatePropsType & MapDispatchPropsType
type OwnProps = {

}

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

function mapStateToProps(state: AppStateType): MapStatePropsType {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, { follow, unfollow, getUsers: requestUsers }),
)(UsersContainer)