import { GetItemsType, ResponseType, instance } from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
        const response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`));
        return response.data;
    },
    async follow(userId: number) {
        const response = await instance.post<ResponseType>(`follow/${userId}`)
        return response.data
    },
    async unfollow(userId: number) {
        const response = await instance.delete<ResponseType>(`follow/${userId}`)
        return response.data
    }
}