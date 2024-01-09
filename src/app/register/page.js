"use client"


import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import AlertError from '@/app/components/AlertError'
import AlertSuccess from '@/app/components/AlertSuccess'
import { useForm } from "react-hook-form";



export default function Register() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const router = useRouter()

    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        const {email, password, id_role, name} = data
        
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    id_role
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                setOpenSuccess(true);
                setTimeout(()=>{
                    router.push('/login', {data:'success'})
                }, 2000)
                // signIn()
            } else {
                setOpen(true)
                setError((await res.json()).error)
            }
        }
        catch (err) { setError(err?.message) }
    }

    // router.push('/login', {data:'success'})
    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            <AlertSuccess success={'Success create account'} open={openSuccess} setOpen={setOpenSuccess} />

            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs item display="flex" justifyContent="center" alignItems="center">
                    <Paper sx={{ paddingX: 2, paddingY: 4 }}>
                        <Typography variant="h4" textAlign={'center'} fontWeight={600} mb={2}>
                            Sign Up
                        </Typography>

                        <Stack method="post" component={'form'} gap={2} minWidth={350} paddingX={2} onSubmit={handleSubmit(onSubmit)} >
                            <TextField label="Nama" variant="standard" {...register('name', { required: true })} />
                            {errors.name && <Typography fontSize={15} color={"error"}>Nama is required</Typography>}

                            <TextField type="email" label="Email" variant="standard" {...register('email', { required: true })} />
                            {errors.email && <Typography fontSize={15} color={"error"}>Email address is required</Typography>}

                            <TextField type="password" label="Password" variant="standard" {...register('password', { required: true, minLength: 8 })} />
                            {errors.password?.type === 'required' && <Typography fontSize={15} color={"error"}>Password is required</Typography>}
                            {errors.password?.type === 'minLength' && <Typography fontSize={15} color={"error"}>Password min length 8</Typography>}


                            <TextField type="password" label="Konfirmasi Password" variant="standard" {...register('confirmPassword', { validate: (val => val === watch('password')) })} />

                            {errors.confirmPassword?.type === 'validate' && <Typography fontSize={15} color={"error"}>Confirmation Password not same</Typography>}


                            <FormControl>
                                <InputLabel id="roleId">daftar sebagai</InputLabel>
                                <Select
                                    labelId="roleId"
                                    label='daftar sebagai'
                                    {...register('id_role', { required: true })}
                                    defaultValue={''}
                                >
                                    <MenuItem value={2}>Penghuni Kos</MenuItem>
                                    <MenuItem value={3}>Pemilik Kos</MenuItem>
                                </Select>
                            </FormControl>
                            
                            {(errors.id_role && !watch('id_role')) && <Typography fontSize={15} color={"error"}>Daftar sebagai is required</Typography>}

                            <Button disabled={isSubmitting} type="submit" variant="contained">SIGN UP
                                {isSubmitting && <CircularProgress sx={{ marginLeft: 2 }} size={'1rem'} color="inherit" />}
                            </Button>
                            <Link textAlign={'center'} href="/login" underline="hover">Sudah punya akun?</Link>
                        </Stack>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}