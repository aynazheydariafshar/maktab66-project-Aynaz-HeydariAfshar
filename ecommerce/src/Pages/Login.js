import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import LoginImage from 'assets/images/24237-Cat-Dog-CorgiCat-Dog-HD-Wallpaper.jpg'
import Logo from 'assets/images/logo.png';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import DoorBackRoundedIcon from '@mui/icons-material/DoorBackRounded';
import {Link , useNavigate} from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';

const Login = () => {
    
    const validationSchema = yup.object({
        username: yup
          .string()
          .min(4, 'نام کاربری باید حداقل شامل 4 کارکتر باشد ')
          .required('پر کردن این فیلد الزامی می باشد'),
        password: yup
          .string()
          .min(6, 'رمز عبور باید حداقل شامل 6 کارکتر باشد')
          .required('پر کردن این فیلد الزامی می باشد'),
    });
    const history = useNavigate()
    useEffect(() => {
       if(localStorage.getItem('user-Info')){
           history.push('/management-productes')
       }
    }, [])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
        },
    });


    return <div>
        <Grid container sx = {{minHeight : '100vh' , overflowY : 'hidden'}}>
            <Grid item xs={12} sm={6}>
                <img alt='animal' src={LoginImage} width='100%' height='100%' style={{objectFit : 'cover'}}/>
            </Grid>
            <Grid 
                container 
                alignItems='center' 
                direction='column'
                justifyContent='space-around' 
                xs={12} 
                sm={6}
                sx={{my : {xs : '30px' , sm :'0px'}}}
            >
                <div style={{display : 'flex' , flexDirection :'column' , maxWidth : 350 ,boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px' , minWidth:300 , padding : '25px'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container justifyContent='center'>
                            <img src={Logo} alt="logo" width='50px' height='50px'/>
                        </Grid>
                        <TextField 
                            fullWidth 
                            variant="standard" 
                            type='text' 
                            label='نام کاربری' 
                            margin='normal'
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PersonRoundedIcon />
                                </InputAdornment>
                                ),
                            }}
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField  
                            fullWidth
                            variant="standard" 
                            type='password' 
                            label='رمز عبور' 
                            margin='normal'
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <KeyRoundedIcon />
                                </InputAdornment>
                                ),
                            }}
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <div>
                            <Button type='submit' fullWidth sx={{my : '20px'}} color='primary' variant='contained'>
                                ورود
                            </Button>
                        </div>
                        <div>
                            <Link to='/'>
                                <DoorBackRoundedIcon color="action"/>
                            </Link>
                        </div>
                    </form>
                </div>
            </Grid>
        </Grid>
    </div>;
}


export default Login;