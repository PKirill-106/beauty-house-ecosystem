// User
export interface IAuth {
	email: string
	password: string
}
export interface IAddress {
	street: string
	homeNumber: string | number
	city: string
	region: string
	postalCode: string
	country: string
}
export interface INovaPost {
	country: string
	region: string
	city: string
	postDepartment: string
}

export interface IUserInfo {
	userName: string
	slug: string
	userFirstName: string
	userLastName: string
	email: string
	address: IAddress
	phoneNumber: string
}

// Category
export interface ICategory {
	id: string
	name: string
	slug: string
	description: string
	parentCategoryId?: string
	imageURL?: string
}
export interface ICreateCategory {
	name: string
	description: string
	parentCategoryId?: string
	image: File | string
}
export interface IUpdateCategory {
	id: string
	name: string
	description: string
	parentCategoryId?: string
	existingImageURL?: string
	newImage: File | string
}
export interface IDeleteCategory {
	categoryId: string
	option: 'CascadeDelete' | 'ReassignToParent' | 'Orphan'
}
