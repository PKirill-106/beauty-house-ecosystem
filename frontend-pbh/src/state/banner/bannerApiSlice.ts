import { getBannerImages, updateBanners } from '@/lib/services/bannerServices'
import { IBanner } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const bannerApi = createApi({
	reducerPath: 'bannerApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Banners'],
	endpoints: builder => ({
		getBanners: builder.query<IBanner[], void>({
			queryFn: async () => getBannerImages(),
			providesTags: ['Banners'],
		}),
		updateBanners: builder.mutation<number, FormData>({
			queryFn: async formData => updateBanners(formData),
			invalidatesTags: ['Banners'],
		}),
	}),
})

export const { useGetBannersQuery, useUpdateBannersMutation } = bannerApi
