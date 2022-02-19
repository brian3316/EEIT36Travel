import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function LoginErrorMessage({ open, setOpen, errormessage, sumessage, suopen, setSuOpen }) {
  const handleClose = () => {
    setOpen(false);

  }


  return <>
    {suopen}
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%', '&:hover': { boxShadow: ' 3px 7px #78002e' } }}>
        <AlertTitle>系統錯誤訊息提示：</AlertTitle>

        {errormessage}
      </Alert>
    </Snackbar>

    <>
      <SuccessMessage sumessage={sumessage} suopen={suopen} setSuOpen={setSuOpen} />
    </>
  </>;
}

export default LoginErrorMessage;

const SuccessMessage = ({ sumessage, suopen, setSuOpen }) => {
  const handleClose2 = () => {
    setSuOpen(false);
  }
  return <>
    {suopen && <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={suopen} autoHideDuration={6000} onClose={handleClose2}>
      <Alert variant="filled" onClose={handleClose2} severity="success" sx={{ width: '100%', '&:hover': { boxShadow: ' 3px 7px #78002e' } }}>
        <AlertTitle>系統成功訊息提示：</AlertTitle>

        {sumessage}
      </Alert>
    </Snackbar>}
  </>
}
