import {
	getUserInfo,
	logout,
	signInUser,
	signUpUser,
	updateUserInfo,
} from '@/lib/services/userServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { IAuth, IUserInfo } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['User'],
	endpoints: builder => ({
		getUser: builder.query<IUserInfo[], void>({
			queryFn: async () => apiWrapper(() => getUserInfo()),
			providesTags: ['User'],
		}),
		updateUser: builder.mutation<IUserInfo[], Partial<IUserInfo>>({
			queryFn: async userData => apiWrapper(() => updateUserInfo(userData)),
			invalidatesTags: ['User'],
		}),
		signInUser: builder.mutation<any, { email: string; password: string }>({
			queryFn: async credentials => apiWrapper(() => signInUser(credentials)),
			invalidatesTags: ['User'],
		}),
		signUpUser: builder.mutation<any, IAuth>({
			queryFn: async userData => apiWrapper(() => signUpUser(userData)),
			invalidatesTags: ['User'],
		}),
		logout: builder.mutation<
			any,
			{ accessToken: string; refreshToken: string }
		>({
			queryFn: async ({ accessToken, refreshToken }) =>
				apiWrapper(() => logout(accessToken, refreshToken)),
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
