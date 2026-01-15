import {
	getUserInfo,
	logout,
	signInUser,
	signUpUser,
	updateUserInfo,
} from '@/lib/services/userServices'
import { IAuth, IAuthResponse, IUserInfo } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUser: builder.query<IUserInfo, void>({
			queryFn: async () => getUserInfo(),
			providesTags: ['User'],
		}),
		updateUser: builder.mutation<boolean, Partial<IUserInfo>>({
			queryFn: async userData => updateUserInfo(userData),
			invalidatesTags: ['User'],
		}),
		signInUser: builder.mutation<
			IAuthResponse,
			{ email: string; password: string }
		>({
			queryFn: async credentials => signInUser(credentials),
			invalidatesTags: ['User'],
		}),
		signUpUser: builder.mutation<boolean, IAuth>({
			queryFn: async userData => signUpUser(userData),
			invalidatesTags: ['User'],
		}),
		logout: builder.mutation<
			boolean,
			{ accessToken: string; refreshToken: string }
		>({
			queryFn: async ({ accessToken, refreshToken }) =>
				logout(accessToken, refreshToken),
			invalidatesTags: ['User'],
		}),
	}),
})

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useSignInUserMutation,
	useSignUpUserMutation,
	useLogoutMutation,
} = userApi
