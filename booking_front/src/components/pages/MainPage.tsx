import {CenteredContainer} from "../general/CenteredContainer";
import React, {useState} from "react";
import {Header} from "../general/Header";
import {useFindAllApartmentsQuery} from "../../store/api";
import {HouseCard} from "../house/HouseCard";
import {Category, FilterOptions, SortBy, SortDirection} from "../../types";

export const MainPage = () => {

    const [filterOptions, setFilterOptions] =
        useState<FilterOptions>({});
    const {data: apartments} = useFindAllApartmentsQuery(filterOptions);

    const changeFilterOption = (prop: keyof FilterOptions) => (e: any) => {
        setFilterOptions((prev) => ({...prev, [prop]: e.target.value}));
    }
    return (
        <>
            <Header></Header>
            <div>
                <div
                    style={{
                        background: "url(p2.jpg)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                        backgroundRepeat: 'no-repeat',
                        height: '31rem'
                    }}
                    className={'relative w-full'}
                >
                    <div className={'flex flex-col m-auto w-4/5  py-20'}>
                        <p className={'text-5xl text-white w-6/12 font-bold'}>
                            Забронюй будинок мрії вже зараз
                        </p>
                        <p className={'text-2xl text-white w-6/12 py-5'}>
                            Незабутні враження на вас чекають
                        </p>
                    </div>

                    <CenteredContainer>
                        <div className={'text-black text-lg bg-white flex-grow rounded'}>
                            <input
                                className={"w-full h-full pl-3 py-3"}
                                placeholder={"Search..."}
                                onChange={changeFilterOption('search')} value={filterOptions.search}/>
                        </div>
                        <div className={'text-black text-lg bg-white flex-grow rounded'}>
                            <input
                                className={"w-full h-full pl-3"}
                                placeholder={"Number of rooms..."}
                                type={'number'} onChange={changeFilterOption('roomsNumber')}
                                value={filterOptions.roomsNumber}/>
                        </div>
                        <div className={'text-black text-lg bg-white flex-grow rounded'}>
                            <select
                                onChange={changeFilterOption('category')}
                                value={filterOptions.category}
                                className={'w-full h-full text-black bg-white text-lg'}
                            >
                                {Object.values(Category).map(category => (
                                    <option key={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className={'text-black text-lg bg-white flex-grow rounded'}>
                            <select
                                onChange={changeFilterOption('sortOptions')}
                                value={filterOptions.sortOptions}
                                className={'w-full h-full text-black bg-white text-lg'}
                            >
                                {Object.values(SortBy).map(sortBy => (
                                    <option key={sortBy}>{sortBy}</option>
                                ))}
                            </select>
                        </div>

                        <div className={'text-black text-lg bg-white flex-grow rounded'}>
                            <select
                                onChange={changeFilterOption('sortDirection')}
                                value={filterOptions.sortDirection}
                                className={'w-full h-full text-black bg-white text-lg'}
                            >
                                {Object.values(SortDirection).map(sortDirection => (
                                    <option key={sortDirection}>{sortDirection}</option>
                                ))}
                            </select>
                        </div>
                    </CenteredContainer>

                </div>

                <div
                    className={'w-full'}
                >
                    <div className={'m-auto w-4/5 py-10 min-h-96'}>
                        <h1 className={'font-bold text-black text-3xl'}>
                            Пошук помешкання
                        </h1>

                        <div className={'grid grid-cols-4 gap-3 mt-7'}>

                            {apartments &&
                                apartments.map(apartment => (
                                    <HouseCard
                                        key={apartment.id} apartment={apartment}></HouseCard>

                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}