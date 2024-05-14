export enum Role {
    OWNER = "Owner", USER = "User"
}

export enum Category {
    HOTEL = 'HOTEL',  APARTMENT = "APARTMENT", VILLA = "VILLA",
}
export enum SortBy {
    PRICE = "Price",
    ROOMS = "Rooms"
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}
export type User = {
    id: number,
    username: string,
    role: Role
}

export type Apartment = {
    id: number
    rooms: number
    image: string
    name: string
    price: number
    description: string
    category: Category
    owner: User,
    reservations?: Reservation[]
}
export type CreateApartment = {
    rooms: number
    name: string
    price: number
    description: string
    category: Category
    ownerId: number,
    image: string
}

export type Reservation = {
    id: number;
    arrivalDate: string;
    departureDate: string;
    guest: User;
    apartment: Apartment;
    price:number
}
export type FilterOptions = {
    search?: string
    roomsNumber?: number;
    category?: Category;
    sortOptions?: SortBy;
    sortDirection?: SortDirection;
}

export type CreateReservationDTO = {
    arrivalDate: string;
    departureDate: string;
    userId: number;
    apartmentId: number;
    price: number;
}

