import {Header} from "../general/Header";
import BedOutlinedIcon from "@mui/icons-material/BedOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import React, {FC, useEffect, useState} from "react";
import {Category} from "../../types";
import {useCreateApartmentMutation, useFindApartmentByIdQuery, useUpdateApartmentMutation} from "../../store/api";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {useParams} from "react-router-dom";

interface CreateNewApartmentPageProps {
    edit?: boolean
}

export const CreateNewApartmentPage: FC<CreateNewApartmentPageProps> = ({edit}) => {
    const id = useParams()['id'];
    const [image, setImage] = useState<string>('');
    const [createApartment] = useCreateApartmentMutation();
    const [updateApartment] = useUpdateApartmentMutation();
    const {user} = useSelector((state: RootState) => state.ui);
    const {data: apartment} = useFindApartmentByIdQuery(+id!, {skip: !id});

    useEffect(() => {
        if(apartment){
            setImage(apartment.image);
        }
    }, [apartment]);
    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (user && ifAllExists(formData)) {
            formData.append('image', image);
            formData.append('ownerId', user.id.toString());

            if(edit && id){
                updateApartment({ formData, id: +id});
            }
            else{
                createApartment(formData);
            }

        }

    }
    const ifAllExists = (formData: FormData) => {
        return formData.get('name') && formData.get('description') && formData.get('price') && formData.get('rooms');

    }
    const handlePhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        } else setImage('');
    }
    console.log(apartment);
    return (
        <>
            <Header></Header>

            <form
                onSubmit={handleFormSubmit}
                className={'relative w-full'}
            >
                <div className={'m-auto w-4/5 py-10 grid grid-cols-11 gap-3'}>

                    <div className={'flex flex-row col-span-11 mb-1 text-black'}>

                        <div className={'flex flex-col col-span-11 mb-1 text-black mr-3'}>
                            <label
                                className={'font-bold'}>House name</label>
                            <input
                                defaultValue ={apartment?.name}
                                name={'name'}
                                className={'flex-grow px-2 py-2 w-fit rounded border border-solid border-black text-black bg-white text-lg mt-1'}/>
                        </div>
                        <div className={'flex flex-col col-span-11 mb-1 text-black text-sm'}>
                            <label className={'font-bold'}>Image</label>
                            <input
                                onChange={handlePhotoSelected}
                                name={'image'}
                                type={'file'}
                                className={'px-2 py-2 w-fit rounded border border-solid border-black text-black bg-white text-lg mt-1'}/>
                        </div>
                    </div>
                    <div className={'col-span-8 '}>
                        <img
                            className={'w-full'}
                            alt={'Photo'}
                            src={image}
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
                                <span>
                                    <input
                                    defaultValue={apartment?.rooms}
                                    type={'string'} name={'rooms'} className={'pl-2 w-20'}/></span>
                                <span>
                                    <select
                                        defaultValue={Category[apartment?.category ?? "HOTEL"]}
                                        name={'category'}
                                        className={'pl-2 w-20'}>
                                        {Object.keys(Category).map(c => (
                                            <option key={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                                <span> <input defaultValue={apartment?.price} type={'string'} name={'price'} className={'pl-2 w-20'}/>$ / day</span>
                            </div>
                        </div>
                    </div>
                    <div className={'col-span-8'}>
                        <label className={'font-bold'}>Description</label>
                        <textarea
                            defaultValue ={apartment?.description}
                            name={'description'}
                            className={'px-2 py-2 w-full rounded border border-solid border-black text-black bg-white text-lg mt-1'}
                        ></textarea>
                        <button
                            className={'bg-green-700 hover:bg-green-950 py-2 px-3 text-white rounded w-40 text-lg mt-3'}>Create
                        </button>
                    </div>

                </div>

            </form>


        </>
    )
}