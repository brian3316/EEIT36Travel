import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function ProfileMessage({ suopen, setSuOpen, sumessage }) {
    const handleClose = () => {
        // setOpen(false);

    }


    return <>


        <>
            <SuccessMessage sumessage={sumessage} suopen={suopen} setSuOpen={setSuOpen} />
        </>
    </>;
}

export default ProfileMessage;

const SuccessMessage = ({ sumessage, suopen, setSuOpen }) => {
    const handleClose2 = () => {
        setSuOpen(false);
    }
    return <>
        {suopen && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={suopen} autoHideDuration={6000} onClose={handleClose2}>
            <Alert variant="filled" onClose={handleClose2} severity="success" sx={{ width: '100%', '&:hover': { boxShadow: ' 3px 7px darkgreen' } }}>
                <AlertTitle>系統成功訊息提示：</AlertTitle>

                {sumessage}
            </Alert>
        </Snackbar>}
    </>
}
