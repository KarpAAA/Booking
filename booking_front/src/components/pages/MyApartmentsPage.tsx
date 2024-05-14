import {Link, useParams} from "react-router-dom";
import {HouseCard} from "../house/HouseCard";
import React from "react";
import {useGetUserApartmentsQuery} from "../../store/api";
import {Header} from "../general/Header";


export const MyApartmentsPage = () => {
    const userId = useParams()['userId'];
    const {data: userApartments} = useGetUserApartmentsQuery(+userId!);

    return (
        <>
            <Header/>
            <div
                className={'w-full'}
            >
                <div className={'m-auto w-4/5 py-10 min-h-96'}>
                    <div className={'flex flex-row gap-3 items-center'}>
                        <h1 className={'font-bold text-black text-3xl'}>
                            Мої помешкання
                        </h1>

                        <button
                            className={'border-solid border-2 bg-green-700 hover:bg-green-800 py-2 px-7 text-white rounded text-lg mt-3'}>
                            <Link
                                className={'decoration-0 text-white hover:decoration-0 hover:text-white'}
                                to={'/apartment/new'}>
                                Додати нове помешкання
                            </Link>
                        </button>
                    </div>

                    <div className={'grid grid-cols-4 gap-3 mt-7'}>
                        {userApartments &&
                            userApartments.map(apartment => (
                                <HouseCard
                                    key={apartment.id} apartment={apartment}></HouseCard>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}