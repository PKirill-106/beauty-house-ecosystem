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
