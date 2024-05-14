import React, {FC, useState} from "react";
import {Apartment} from "../../types";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {CustomDialog} from "../general/CustomDialog";
import {useDeleteApartmentMutation} from "../../store/api";


interface HouseCardProps {
    apartment: Apartment
}

export const HouseCard: FC<HouseCardProps> = ({apartment}) => {
    const navigate = useNavigate();
    const {user} = useSelector((state: RootState) => state.ui);
    const [open, setOpen] = useState<boolean>(false);

    const [deleteApartment] = useDeleteApartmentMutation();
    const handleDeleteApartment = (id: number) => {
        deleteApartment(id);
    }

    return (
        <>
            <div
                onClick={() => navigate(`../house/${apartment.id}`, {replace: true})}
                className={'rounded bg-white border-2 border-white'}>
                <img
                    alt={'House photo'}
                    className={'rounded-se rounded-ss'}
                    src={apartment.image}/>
                <div
                    style={{boxShadow: '0px 0px 4px 2px rgba(0, 0, 0, 0.1)'}}
                    className={'flex flex-col ps-3 py-2'}>

                    <h2 className={'font-bold text-lg'}>{apartment.name}</h2>
                    <div className={'flex flex-row justify-between'}>
                        <p className={'text-sm text-gray-500'}>{apartment.price}</p>

                        {apartment.owner.id === user?.id &&
                            <div className={'mr-4 mb-1'}>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate('../apartment/edit/'+apartment.id, {replace: true})
                                    }}
                                    className={'border border-black rounded px-2 py-1 mr-2'}>
                                    <EditOutlinedIcon/>
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpen(true);
                                    }}
                                    className={'text-red-600 border border-red-600 rounded px-2 py-1'}>
                                    <DeleteOutlineOutlinedIcon/>
                                </button>
                            </div>
                        }

                    </div>


                </div>

            </div>
            <CustomDialog
                open={open}
                closeDialog={() => setOpen(false)}
                submitAction={() => {
                    setOpen(false);
                    handleDeleteApartment(apartment.id);
                }}/>
        </>
    )
}