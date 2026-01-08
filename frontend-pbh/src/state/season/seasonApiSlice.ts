import {
	createSeason,
	getAllSeasons,
	getSeasonById,
	getSeasonBySlug,
	updateSeason,
} from '@/lib/services/seasonServices'
import { apiWrapper } from '@/lib/utils/api/helpers'
import { ISeason, ISeasonId } from '@/types/interfacesApi'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'

export const seasonApi = createApi({
	reducerPath: 'seasonApi',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['Season'],
	endpoints: builder => ({
		getSeasons: builder.query<ISeason[], void>({
			queryFn: async () => apiWrapper(() => getAllSeasons()),
		}),
		getSeasonById: builder.query<ISeason[], ISeason['id']>({
			queryFn: async id => apiWrapper(() => getSeasonById(id)),
		}),
		getSeasonBySlug: builder.query<ISeason[], ISeason['slug']>({
			queryFn: async slug => apiWrapper(() => getSeasonBySlug(slug)),
		}),
		createSeason: builder.mutation<ISeason[], Omit<ISeasonId, 'id' | 'slug'>>({
			queryFn: async seasonData => apiWrapper(() => createSeason(seasonData)),
		}),
		updateSeason: builder.mutation<ISeason[], ISeasonId>({
			queryFn: async seasonData => apiWrapper(() => updateSeason(seasonData)),
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
