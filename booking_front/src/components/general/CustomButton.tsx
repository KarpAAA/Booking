import React, {FC} from "react";

interface  CustomButtonProps {
    className?: string
    buttonText: string
}
export const CustomButton: FC<CustomButtonProps> = ({className, buttonText}) => {

    return (
        <button
            className={'bg-blue-600 w-full text-white mt-3 rounded text-lg py-2 hover:bg-blue-800 ' + className}>
            {buttonText}
        </button>
    )

}