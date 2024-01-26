import { GetItemsType, ResponseType, instance } from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get<GetItemsType>(`users?page=${currentPage}?count=${pageSize}`);
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