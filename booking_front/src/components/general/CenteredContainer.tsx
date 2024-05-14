import React, {FC} from "react";


interface CenteredContainerProps {
    className?: string,
    children: React.ReactNode,
}

export const CenteredContainer: FC<CenteredContainerProps> = ({className, children}) => {

    return (
        <div
            style={{
                backgroundColor: '#FFB700',
                transform: "translate(-50%, 50%)"
            }}
            className={'absolute bg-amber-800 w-3/5 bottom-0 left-1/2 rounded flex flex-row justify-around gap-1 p-1 ' + className}>
            {
                children
            }
        </div>
    )
}