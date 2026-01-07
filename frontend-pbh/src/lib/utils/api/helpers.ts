export const apiWrapper = async <T>(
	fn: () => Promise<T>
): Promise<{ data: T } | { error: unknown }> => {
	try {
		const data = await fn()
		return { data: data }
	} catch (error) {
		return { error }
	}
}
