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

//Banners
export interface IBanner {
	sequenceNumber: number
	imageURL: string
	pageURL: string
	buttonText: string
	text: string
}
export interface IUpdateBanner {
	existingImages: string
	newImages: (File | string)[]
	imageSequenceNumbers: number[]
	pageUrls: string[]
	buttonTexts: string[]
	texts: string[]
}

//Cart
export interface ICartItem {
	id?: string
	addedAt?: string
	productId: string
	productVariantId: string
	quantity: number
}

// Discount and Season
interface IDealBase {
	id: string
	name: string
	slug: string
	startDate: string
	endDate: string
}
export interface IDiscount extends IDealBase {
	discountPercentage: number
	removeAfterExpiration: boolean
	productIds: string[]
}
export interface ISeason extends IDealBase {
	products: IProduct[]
}
export interface ISeasonId extends IDealBase {
	productIds: string[]
}

// Orders
export interface IOrderItem {
	itemId: string
	quantity: number
	price: number
}
interface IOrderBase {
	orderItems: IOrderItem[]
	paymentMethod: 'paymentSystem' | 'onCard'
	deliveryMethod: 'novaPost' | 'courier'
	additionalInfo: string
	recipientFirstName: string
	recipientLastName: string
	recipientEmail: string
	recipientPhone: string
}
export interface IOrder extends IOrderBase {
	id: string
	orderNumber: string
	orderDate: string
	addressId: string
	address: IAddress | INovaPost
	status: string
	userName: string
}
export interface ICreateOrder extends IOrderBase {
	userAddress: IAddress
	postAddress: INovaPost
}

// Reviews
export interface ICreateReview {
	productId: string
	rating: number
	comment: string
}
export interface IReview extends Omit<ICreateReview, 'productId'> {
	id: string
}

// Nova Post Services
export interface IArea {
	Ref: string
	Description: string
}
export interface ICity {
	Ref: string
	Description: string
	Area: string
}
export interface IWarehouse {
	Ref: string
	Description: string
	CityRef: string
}
