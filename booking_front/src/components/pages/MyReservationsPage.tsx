import {useParams} from "react-router-dom";
import React from "react";
import {useGetUserReservationsQuery} from "../../store/api";
import {Header} from "../general/Header";


export const MyReservationsPage = () => {
    const userId = useParams()['userId'];
    const {data: userReservations} = useGetUserReservationsQuery(+userId!);
    return (
        <>
            <Header/>
            <div
                className={'w-full'}
            >
                <div className={'m-auto w-4/5 py-10 min-h-96'}>

                    <h1 className={'font-bold text-black text-3xl'}>
                        Мої бронювання
                    </h1>

                    <div className={'w-4/5'}>
                        {userReservations && userReservations.map(reservation => (
                            <div
                                style={{backgroundColor: '#003B95'}}
                                className={'my-5 rounded grid grid-cols-7 text-white text-lg p-5 gap-x-10 gap-y-3 w-full'}>
                                <div className={'flex items-center justify-center py-1 font-medium text-xl text-white border border-white rounded text-center'}>Arrival Date</div>
                                <div className={'flex items-center justify-center py-1 font-medium text-xl text-white border border-white rounded text-center'}>Departure Date</div>
                                <div className={'flex items-center justify-center py-1 font-medium text-xl text-white border border-white rounded text-center'}>Owner</div>
                                <div className={'flex items-center justify-center py-1 font-medium text-xl text-white border border-white rounded text-center'}>Apartment</div>
                                <div className={'flex items-center justify-center py-1 font-medium text-xl text-white border border-white rounded text-center'}>Price</div>
                                <div className={'col-start-6 col-end-8 row-start-1 row-end-3 flex items-center justify-center py-1 font-medium text-xl text-white rounded text-center'}>
                                    <img
                                        className={'h-32 w-32'}
                                        src={reservation.apartment.image}/>
                                </div>



                                <div className={'text-lg text-center'}>{reservation.arrivalDate}</div>
                                <div className={'text-lg text-center'}>{reservation.departureDate}</div>
                                <div className={'text-lg text-center'}>{reservation.apartment.owner.username}</div>
                                <div className={'text-lg text-center'}>{reservation.apartment.name}</div>
                                <div className={'text-lg text-center'}>{reservation.price}</div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}