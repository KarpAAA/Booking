import React, {FC} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


interface CustomDialogProps {
    open: boolean,
    closeDialog: () => void,
    submitAction: () => void,

}
export const CustomDialog: FC<CustomDialogProps> = ({open, closeDialog, submitAction}) => {

    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Видалення апартаменту"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                   Ви впевнені що хочете видалити апартамент?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Закрити</Button>
                <Button color={'error'} onClick={submitAction} autoFocus>
                    Видалити
                </Button>
            </DialogActions>
        </Dialog>
    );
}