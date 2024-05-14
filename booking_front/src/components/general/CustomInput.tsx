import React, {FC} from "react";

interface CustomInputProps {
    type: string,
    labelText: string,
    name: string,
}

export const CustomInput: FC<CustomInputProps> = ({labelText, ...other}) => {

    return (
        <div>
            <label className={'font-bold'}>{labelText}</label>
            <input
                {...other}
                minLength={8}
                className={'px-2 py-2 rounded w-full border border-solid border-black text-black bg-white text-lg mt-1'}/>

        </div>
    )
}