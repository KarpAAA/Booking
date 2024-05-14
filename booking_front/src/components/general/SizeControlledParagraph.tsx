import {FC} from "react";

interface SizeControlledParagraphProps  {
    open: boolean,
    maxChars: number,
    content: string,
    className?: string
}

export const SizeControlledParagraph: FC<SizeControlledParagraphProps> =
    ({open, maxChars, content, className}) => {

    const shortenContent = open ? content : content.slice(0, maxChars);

    return (
        <p className={className}>
            {shortenContent}
        </p>
    )
}