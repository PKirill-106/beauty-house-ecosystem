import { IArea, ICity, IWarehouse } from '@/types/interfacesApi'
import { api } from '../api/axios'

const API_URL = process.env.NOVA_POST_API_URL!
const apiKey = process.env.NOVA_POST_API_KEY!

interface INovaPostRequest {
	apiKey: string
	modelName: string
	calledMethod: string
	methodProperties?: Record<string, string | number>
}

async function fetchNovaPost<T>(body: INovaPostRequest): Promise<T[]> {
	const { data } = await api
		.post(API_URL, JSON.stringify(body))
		.catch(error => {
			throw new Error('NovaPost error: ', error)
		})

	return data.data as T[]
}

export async function getAreas() {
	return fetchNovaPost<IArea>({
		apiKey,
		modelName: 'Address',
		calledMethod: 'getAreas',
	})
}

export async function getCities(areaRef: string) {
	return fetchNovaPost<ICity>({
		apiKey,
		modelName: 'Address',
		calledMethod: 'getCities',
		methodProperties: { AreaRef: areaRef },
	})
}

export async function getWarehouses(cityRef: string) {
	return fetchNovaPost<IWarehouse>({
		apiKey,
		modelName: 'AddressGeneral',
		calledMethod: 'getWarehouses',
		methodProperties: { CityRef: cityRef },
	})
}
