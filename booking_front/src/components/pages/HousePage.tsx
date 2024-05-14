import {DateRangePicker} from "rsuite";
import React, {useState} from "react";
import {CenteredContainer} from "../general/CenteredContainer";
import {SizeControlledParagraph} from "../general/SizeControlledParagraph";
import {Header} from "../general/Header";
import {useParams} from "react-router-dom";
import {useCreateReservationMutation, useFindApartmentByIdQuery} from "../../store/api";
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import {DateRange} from "rsuite/DateRangePicker";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {Role} from "../../types";

export const HousePage = () => {
    const maxDescriptionChars = 550;
    const [selectedDatesRange, setSelectedDatesRange] = useState<DateRange | null>(null);
    const [selectedDatesPrice, setSelectedDatesPrice] = useState<number>(0);
    const id = useParams()['id'];
    const {data: apartment} = useFindApartmentByIdQuery(+id!);
    const [descriptionOpenState, setDescriptionOpenState] = useState(false);
    const {user} = useSelector((state: RootState) => state.ui)
    const [reservateDate] = useCreateReservationMutation();


    const shouldDisableDate = (date: Date): boolean => {
        let res = false;
        if(apartment?.reservations){
            apartment.reservations.forEach(reservation => {
                if(isDateBetween(date.toLocaleDateString(), reservation.arrivalDate, reservation.departureDate))
                    res = true;
            })
        }
        return res;
    }
    const localDateStringToDateObject = (date:string) => {
        const parts = date.split(".");

        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[0], 10);

        return new Date(year, month, day);
    }

    const isDateBetween = (targetDate:string, startDate:string, endDate:string) => {
        const start = localDateStringToDateObject(startDate);
        const end = localDateStringToDateObject(endDate);
        const d = localDateStringToDateObject(targetDate);

        return d.valueOf() >= start.valueOf() && d.valueOf() <= end.valueOf()
    }

    const handleDateChange = (value: DateRange | null) => {

        setSelectedDatesRange(value);
        if (value && apartment) {
            const arrivalDate = new Date(value[0]).toLocaleDateString();
            const departureDate = new Date(value[1]).toLocaleDateString();
            setSelectedDatesPrice(apartment.price * daysBetweenDates(arrivalDate, departureDate));
        }
    }
    const handleReservation = () => {

        if (selectedDatesRange && user && apartment) {
            const arrivalDate = new Date(selectedDatesRange[0]).toLocaleDateString();
            const departureDate = new Date(selectedDatesRange[1]).toLocaleDateString();
            reservateDate(
                {
                    arrivalDate,
                    departureDate,
                    apartmentId: apartment.id,
                    userId: user.id,
                    price: selectedDatesPrice
                });

            setSelectedDatesPrice(0);
            setSelectedDatesRange(null);
        }

    }
    const daysBetweenDates = (date1: string, date2: string) => {
        // Розділити рядок з датою на компоненти
        const [day1, month1, year1] = date1.split('.').map(Number);
        const [day2, month2, year2] = date2.split('.').map(Number);

        // Створити об'єкти Date для кожної дати
        const firstDate = new Date(year1, month1 - 1, day1);
        const secondDate = new Date(year2, month2 - 1, day2);

        // Порахувати різницю в мілісекундах
        const difference = Math.abs(secondDate.getTime() - firstDate.getTime());

        // Перевести різницю в дні
        const daysDifference = Math.ceil(difference / (1000 * 3600 * 24));

        return daysDifference;
    }


    return (
        <>
            <Header></Header>

            {apartment &&
                <div
                    className={'relative w-full'}
                >
                    {user && user.role === Role.USER &&
                        <div
                            style={{backgroundColor: '#003B95'}}
                            className={'relative h-10'}>
                            <CenteredContainer>
                                <div
                                    className={'flex justify-center text-black text-lg  bg-white flex-grow rounded items-center'}>
                        <span>
                            {apartment.name}
                        </span>
                                </div>
                                <div className={'text-black text-lg bg-white flex-grow rounded'}>
                                    <DateRangePicker
                                        value={selectedDatesRange}
                                        shouldDisableDate={shouldDisableDate}
                                        onChange={handleDateChange}
                                        character=' --- '
                                        size="lg"
                                        placeholder="Date range..."
                                        className={'w-full'}/>
                                </div>
                                <div
                                    className={'flex font-bold justify-center text-black text-lg  bg-white flex-grow rounded items-center'}>
                                <span>
                                 {selectedDatesPrice}$
                                </span>
                                </div>
                                <button
                                    onClick={handleReservation}
                                    style={{backgroundColor: '#003B95'}}
                                    className={'text-white text-lg flex-grow rounded items-center ml-2 border border-white'}>
                                    Зарезезрвувати
                                </button>
                            </CenteredContainer>
                        </div>
                    }


                    <div className={'m-auto w-4/5 py-10 grid grid-cols-11 gap-3'}>

                        <h1 className={'font-bold text-3xl col-span-11 mb-1 text-black'}>
                            {apartment.name}
                        </h1>
                        <div className={'col-span-8 '}>
                            <img
                                className={'w-full rounded'}
                                alt={'Photo'}
                                src={apartment.image}
                            />
                        </div>
                        <div
                            style={{backgroundColor: '#F0F6FF'}}
                            className={'col-span-3 h-fit w-full py-10 pl-5 rounded '}>
                            <h3
                                className={'font-bold text-md mb-3'}
                            >
                                Особливості помешкання
                            </h3>

                            <div className={'flex flex-row gap-5 text-black text-sm'}>
                                <div className={'flex flex-col gap-2'}>
                                    <span><BedOutlinedIcon/> Rooms</span>
                                    <span><HouseOutlinedIcon/> Category</span>
                                    <span><PriceChangeOutlinedIcon/> Price</span>
                                </div>
                                <div className={'flex flex-col gap-3 font-bold'}>
                                    <span>{apartment.rooms}</span>
                                    <span className={'capitalize'}>{apartment.category.toLowerCase()}</span>
                                    <span>{apartment.price}$ / day</span>
                                </div>
                            </div>
                        </div>
                        <div className={'col-span-8'}>
                            <SizeControlledParagraph
                                maxChars={maxDescriptionChars}
                                className={"text-black text-sm"}
                                content={apartment.description}
                                open={descriptionOpenState}
                            />
                            {apartment.description.length > maxDescriptionChars &&

                                <button
                                    onClick={() => setDescriptionOpenState(!descriptionOpenState)}
                                    style={{
                                        color: '#006CE4',
                                        borderColor: '#006CE4'
                                    }}
                                    className={'w-full text-center border my-2 rounded py-1'}>
                                    {descriptionOpenState ? 'Сховати' : 'Показати більше'}
                                </button>
                            }
                        </div>
                    </div>

                </div>
            }

        </>
    )
}