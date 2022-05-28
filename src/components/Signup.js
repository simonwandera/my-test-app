import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik'
import { useState } from 'react';

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

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};
export default function SignUp() {
    const [open, setOpen] = React.useState(true);
    const[error, setError] = useState('')
    const[message, setMessage]=useState('')

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const validate = values => {
        const errors = {}

        if(!values.username){
            errors.username = 'Required'
        }else if(values.username.length < 3){
            errors.username = 'Username must be more than 3 characters'
        }

        if(!values.password){
            errors.password = 'Required'
        }else if(values.password.length < 3){
            errors.password = 'Password must be more than 3 characters'
        }

        if(!values.repassword){
            errors.repassword = 'Required'
        }else if(values.repassword !== values.password){
            errors.repassword = 'Password mismatch'
        }
        return errors
    }

    const onSubmit = values => {
        fetch('/api/auth/add_user', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                "Contect-Type": "application/json; charset=UTF-8"
            }
        }).then(responce => {
            if (responce.status !== 200) {
                setError('Unexpected Error occurred.')
            }
            return responce.json();

        }).then(data => {
            if(data.error){
                setError(data.error)
            }else if(data.msg){
                setMessage(data.msg)
            }

        }).catch(error => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            repassword: '',
        },

        validate,
        onSubmit
    })

    return (
        <div>
            <BootstrapDialog
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Sign Up
                </BootstrapDialogTitle>
                <div className='container'>
                    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
                        <div className="form-group row mb-4">
                            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Username</label>
                            <div className="col-sm-10">
                                <input onChange={formik.handleChange} className="form-control" name='username' type="text" placeholder="username" value={formik.values.username} onBlur={formik.handleBlur} required />
                            </div>
                            {formik.touched.username && formik.errors.username && <div className='text-danger'>{formik.errors.username}</div>}
                        </div>

                        <div className="form-group row mb-4">
                            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Password</label>
                            <div className="col-sm-10">
                                <input onChange={formik.handleChange} className="form-control" name='password' type="password" placeholder="Password" value={formik.values.password} onBlur={formik.handleBlur} required />
                            </div>
                            {formik.touched.password && formik.errors.password && <div className='text-danger'>{formik.errors.password}</div>}
                        </div>

                        <div className="form-group row mb-4">
                            <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Repeat Password</label>
                            <div className="col-sm-10">
                                <input onChange={formik.handleChange} className="form-control" name='repassword' type="password" placeholder="Repeat password" value={formik.values.repassword} onBlur={formik.handleBlur} required />
                            </div>
                            {formik.touched.repassword && formik.errors.repassword && <div className='text-danger'>{formik.errors.repassword}</div>}
                        </div>

                        {error && <div class="alert shadow alert-danger mt-4" role="alert"> <p className='h6'>{error}</p></div>}
                        {message && <div class="alert shadow alert-success mt-4" role="alert"> <p className='h6'>{message}</p></div>}
                        <div className="form-group row mb-4">
                            <button className="btn btn-primary btn-block" type="submit">Register</button>
                        </div>
                    </form>
                </div>

            </BootstrapDialog>
        </div>
    );
}
