import { getBannerImages, updateBanner } from '@/lib/services/bannerServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { IBanner } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const bannerApi = createApi({
	reducerPath: 'bannerApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Banners'],
	endpoints: builder => ({
		getBanners: builder.query<IBanner[], void>({
			queryFn: async () => apiWrapper(() => getBannerImages()),
			providesTags: ['Banners'],
		}),
		updateBanners: builder.mutation<IBanner[], FormData>({
			queryFn: async formData => apiWrapper(() => updateBanner(formData)),
			invalidatesTags: ['Banners'],
		}),
	}),
})

export const { useGetBannersQuery, useUpdateBannersMutation } = bannerApi
