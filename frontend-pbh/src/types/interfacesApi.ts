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

//Products
export interface IProductVariant {
	id: string
	name: number
	price: number
	discountPrice: number
	unitsInStock: number
	isStock: boolean
}
export interface IProductImage {
	filePath: string
	sequenceNumber: number
	file?: File
}
export interface IProductColor {
	name: string
	colorHex: string
}
export interface IProduct {
	id: string
	name: string
	slug: string
	description: string
	productVariants: IProductVariant[]
	discountId: string
	isSeasonal: boolean
	isDiscounted: boolean
	isNew: boolean
	categoryId: string
	categoryName: string
	sku: string
	productImages: IProductImage[]
	colors: IProductColor[]
}
export interface ICreateProduct {
	name: string
	description: string
	productVariantsJson: string
	categoryId: string
	productColorsJson: string
	sku: string
	images: (File | string)[]
	imageSequenceNumbers: number[]
}
export interface IUpdateProduct {
	id: string
	name: string
	description: string
	productVariantsJson: string
	categoryId: string
	productColorsJson: string
	sku: string
	existingImages: string
	newImages: (File | string)[]
	imageSequenceNumbers: number[]
}
