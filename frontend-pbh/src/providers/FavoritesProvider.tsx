'use client'

import { triggerAnimation } from '@/lib/utils/helpers'
import {
	getLocalFavorites,
	saveLocalFavorites,
} from '@/lib/utils/locals/localFavorites'
import {
	useAddWishlistProductMutation,
	useGetWishlistProductsQuery,
	useRemoveWishListProductMutation,
} from '@/state/wishlist/wishlistApiSlice'
import { IFavoritesContext, IProduct } from '@/types/interfacesApi'
import { useSession } from 'next-auth/react'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

const FavoritesContext = createContext<IFavoritesContext | null>(null)

export const FavoritesProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const { data: session, status } = useSession()
	const migrationRef = useRef(false)
	const [favorites, setFavorites] = useState<string[]>([])
	const [favCount, setFavCount] = useState(0)

	const isAuthenticated = !!session?.user

	const [addWishlistProduct, postResult] = useAddWishlistProductMutation()
	const [removeWishlistProduct, deleteResult] =
		useRemoveWishListProductMutation()

	const loadFavorites = useCallback(async () => {
		if (isAuthenticated) {
			const { data: serverFavorites } = useGetWishlistProductsQuery()
			const ids = serverFavorites?.map((p: IProduct) => p.id)
			setFavorites(ids || [])
		} else {
			setFavorites(getLocalFavorites())
		}
	}, [favorites, favCount, session, status, isAuthenticated, migrationRef])

	const migrateFavorites = useCallback(async () => {
		if (status !== 'authenticated' || migrationRef.current) return

		const { data: serverFavorites } = useGetWishlistProductsQuery()

		const localFavorites = getLocalFavorites()
		if (!localFavorites.length) return

		try {
			const serverProductIds: string[] =
				serverFavorites?.map((product: IProduct) => product.id) || []

			const toMigrate = localFavorites.filter(
				id => !serverProductIds.includes(id),
			)

			if (!toMigrate.length) {
				localStorage.removeItem('favorites')
				migrationRef.current = true
				return
			}

			await Promise.all(toMigrate.map(id => addWishlistProduct(id)))

			localStorage.removeItem('favorites')
			migrationRef.current = true

			const refreshedIds = serverFavorites?.map((p: IProduct) => p.id) || []
			setFavorites(refreshedIds)
		} catch (err) {
			console.error('Migration failed:', err)
		}
	}, [session, status, isAuthenticated, migrationRef])

	useEffect(() => {
		loadFavorites()
	}, [isAuthenticated])

	useEffect(() => {
		migrateFavorites()
	}, [status])

	const addFavorite = async (productId: string) => {
		if (favorites.includes(productId)) return

		const updated = [...favorites, productId]
		setFavorites(updated)

		if (isAuthenticated) {
			await addWishlistProduct(productId)
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation({ setCount: setFavCount })
	}

	const removeFavorite = async (productId: string) => {
		const updated = favorites.filter(id => id !== productId)
		setFavorites(updated)

		if (isAuthenticated) {
			try {
				await removeWishlistProduct(productId)
			} catch (err) {
				console.error('Failed to remove from wishlist:', err)
			}
		} else {
			saveLocalFavorites(updated)
		}

		triggerAnimation({ setCount: setFavCount })
	}

	const isFavorite = (productId: string) => favorites.includes(productId)

	return (
		<FavoritesContext.Provider
			value={{
				favorites,
				addFavorite,
				removeFavorite,
				isFavorite,
				favCount,
				triggerAnimation,
			}}
		>
			{children}
		</FavoritesContext.Provider>
	)
}

export const useFavorites = () => {
	const context = useContext(FavoritesContext)
	if (!context) {
		throw new Error('useFavorites must be used within FavoritesProvider')
	}
	return context
}
