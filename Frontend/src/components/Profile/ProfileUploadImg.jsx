import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import './profileuploadimg.css'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};



export default function ProfileUploadImg({ open, setOpen, setShowAva, setAvaSrc, setEditFile }) {
    let test = "https://firebasestorage.googleapis.com/v0/b/my-project-01-334308.appspot.com/o/files%2F52.jpg?alt=media&token=4e44f7e1-9884-4f35-9691-c0b92bf2e47d"

    const inpufileRef = useRef(null);


    const handleDrop = (e) => {
        const file = e.dataTransfer.files[0];
        const src = URL.createObjectURL(file);
        setEditFile(file);
        //show img fn
        showFile(file);
        setAvaSrc(src)
        console.log(src);
        //console.log("this is drop message", e.dataTransfer.files[0]);
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const src = URL.createObjectURL(file);
        setEditFile(file);
        //show img fn
        showFile(file);
        setAvaSrc(src)
        console.log(src);
    }
    //判斷照片附檔名
    function showFile(file) {
        const droparea = document.querySelector(".drag-area");
        const src = URL.createObjectURL(file);
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            let imgtag = `<img src="${src}" alt="" />`;
            droparea.innerHTML = imgtag;
            console.log("this is an image file");
        } else {
            console.log("not image file");
        }
    }

    const handleFileClick = (e) => {
        e.preventDefault();
        inpufileRef.current.click();

    }



    const handleClose = () => {
        setShowAva(true);
        setOpen(false);
    };

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button> */}
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    上傳圖片
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom sx={{ bgcolor: ' #5256ad', justifyContent: 'center', textAlign: 'center', alignItems: 'center' }}>
                        <div className="drag-area" style={{ textAlign: 'center', alignItems: 'center' }}
                            onDrop={handleDrop}
                            onDragLeave={(e) => e.preventDefault()}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                        >
                            <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
                            <header>可拖曳圖片上傳</header>
                            <span>或</span>
                            <button onClick={handleFileClick} >點擊按鈕選取</button>
                            <input type="file" ref={inpufileRef} hidden onChange={handleFileChange} />
                        </div>
                    </Typography>


                </DialogContent>
                <DialogActions>
                    <Button
                        variant='contained'
                        sx={{ bgcolor: '#5256ad', '&:hover': { bgcolor: '#000070', color: 'white' } }}
                        autoFocus
                        onClick={handleClose}
                        size='large'>
                        確認
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}
