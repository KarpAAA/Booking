import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Apartment, CreateApartment, CreateReservationDTO, FilterOptions, Reservation, Role, User} from "../types";

const APARTMENTS_TAG = "Apartments";
const RESERVATIONS_TAG = "Reservations";
export const housesApi = createApi({
    reducerPath: 'housesApi',
    tagTypes: [APARTMENTS_TAG, RESERVATIONS_TAG],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        loginToAccount: builder.mutation<{ access_token: string, user: User }, { username: string, password: string  }>({
            query: (userData) => ({
                url: `auth/login`,
                method: 'POST',
                body: userData,
            }),
        }),
        register: builder.mutation<string, { username: string, password: string, role: Role  }>({
            query: (userData) => ({
                url: `user`,
                method: 'POST',
                body: userData,
            }),

        }),
        createApartment: builder.mutation<Apartment, FormData>({
            query: (apartmentData) => ({
                url: `apartment`,
                method: 'POST',
                headers: {'authorization': "Bearer " + localStorage.getItem('token')},
                body: apartmentData,
            }),
            invalidatesTags: [APARTMENTS_TAG]
        }),
        updateApartment: builder.mutation<Apartment, { formData: FormData, id: number }>({
            query: ({formData, id}) => ({
                url: `apartment/${id}`,
                method: 'PUT',
                headers: {'authorization': "Bearer " + localStorage.getItem('token')},
                body: formData,
            }),
            invalidatesTags: [APARTMENTS_TAG]
        }),
        deleteApartment: builder.mutation<void, number>({
            query: (apartmentId) => ({
                url: `apartment/${apartmentId}`,
                headers: {'authorization': "Bearer " + localStorage.getItem('token')},
                method: 'DELETE',
            }),
            invalidatesTags: [APARTMENTS_TAG]
        }),
        createReservation: builder.mutation<Reservation, CreateReservationDTO>({
            query: (reservation) => ({
                url: `reservation`,
                headers: {'authorization': "Bearer " + localStorage.getItem('token')},
                method: 'POST',
                body: reservation
            }),
            invalidatesTags: [RESERVATIONS_TAG, APARTMENTS_TAG]
        }),
        verifyUser: builder.query<User, void>({
            query: () => (
                {
                    url: `auth/verify`,
                    headers: {'authorization': "Bearer " + localStorage.getItem('token')}
                }
            ),
        }),
        findAllApartments: builder.query<Apartment[], FilterOptions | null>({
            query: (filter) => (
                {
                    url: `apartment`,
                    params: {...filter},
                    headers: {'authorization': "Bearer " + localStorage.getItem('token')}
                }
            ),
            providesTags: [APARTMENTS_TAG]
        }),
        findApartmentById: builder.query<Apartment, number>({
            query: (id) => (
                {
                    url: `apartment/${id}`,
                    headers: {'authorization': "Bearer " + localStorage.getItem('token')}
                }
            ),
            providesTags: [APARTMENTS_TAG]
        }),
        getUserApartments: builder.query<Apartment[], number>({
            query: (userId) => (
                {
                    url: `apartment/user/${userId}`,
                    headers: {'authorization': "Bearer " + localStorage.getItem('token')}
                }
            ),
            providesTags: [APARTMENTS_TAG]
        }),
        getUserReservations: builder.query<Reservation[], number>({
            query: (userId) => (
                {
                    url: `reservation/user/${userId}`,
                    headers: {'authorization': "Bearer " + localStorage.getItem('token')}
                }
            ),
            providesTags: [RESERVATIONS_TAG]
        })
    }),
})

export const { useLoginToAccountMutation, useRegisterMutation, useVerifyUserQuery,
    useFindAllApartmentsQuery, useFindApartmentByIdQuery, useGetUserApartmentsQuery
    , useCreateReservationMutation ,useCreateApartmentMutation, useDeleteApartmentMutation ,useGetUserReservationsQuery, useUpdateApartmentMutation,
} = housesApi