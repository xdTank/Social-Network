import React from 'react';
import { connect } from 'react-redux';
import {
    follow,
    unfollow,
    requestUsers,
    FilterType
} from '../../redux/usersReducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter
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
    filter: FilterType
}
type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}
type PropsType = MapStatePropsType & MapDispatchPropsType
type OwnProps = {}

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        let { currentPage, pageSize, filter } = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        let { pageSize, filter } = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    }
    onFilterChanged = (filter: FilterType) => {
        let { pageSize } = this.props
        this.props.getUsers(1, pageSize, filter)
    }
    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
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
        followingInProgress: getFollowingInProgress(state),
        filter: getUsersFilter(state)
    }
}


export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnProps, AppStateType>(mapStateToProps, { follow, unfollow, getUsers: requestUsers }),
)(UsersContainer)