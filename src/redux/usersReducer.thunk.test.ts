import { ResponseType, ResultCodes } from "../api/api"
import { usersAPI } from "../api/users-api"
import { actions, follow, unfollow } from "./usersReducer"

jest.mock('../api/users-api')

let usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

let dispatchMock = jest.fn()
let getStateMock = jest.fn()
beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

let result: ResponseType = {
    resultCode: ResultCodes.Success,
    messages: [],
    data: {}
}
usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

test("follow thunk should be success", async () => {
    let thunk = follow(1)



    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})
test("unfollow thunk should be success", async () => {
    let thunk = unfollow(1)


    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toHaveBeenCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
})