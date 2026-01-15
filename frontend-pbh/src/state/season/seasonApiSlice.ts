import {
	createSeason,
	getAllSeasons,
	getSeasonById,
	getSeasonBySlug,
	updateSeason,
} from '@/lib/services/seasonServices'
import { ISeason, ISeasonId } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const seasonApi = createApi({
	reducerPath: 'seasonApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Season'],
	endpoints: builder => ({
		getSeasons: builder.query<ISeason[], void>({
			queryFn: async () => getAllSeasons(),
		}),
		getSeasonById: builder.query<ISeason[], ISeason['id']>({
			queryFn: async id => getSeasonById(id),
		}),
		getSeasonBySlug: builder.query<ISeason[], ISeason['slug']>({
			queryFn: async slug => getSeasonBySlug(slug),
		}),
		createSeason: builder.mutation<boolean, Omit<ISeasonId, 'id' | 'slug'>>({
			queryFn: async seasonData => createSeason(seasonData),
		}),
		updateSeason: builder.mutation<boolean, ISeasonId>({
			queryFn: async seasonData => updateSeason(seasonData),
		}),
	}),
})

export const {
	useGetSeasonsQuery,
	useGetSeasonByIdQuery,
	useGetSeasonBySlugQuery,
	useCreateSeasonMutation,
	useLazyGetSeasonByIdQuery,
} = seasonApi
