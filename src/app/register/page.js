"use client"


import { useState } from "react";
import { useRouter } from "next/navigation";
// import { sign } from "next-auth/react";
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
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useForm } from "react-hook-form";



export default function Register() {
    const [error, setError] = useState('')
    
    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            console.log(data.email, data.password)
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })
            console.log('Res', res)
            if (!res.error) {
                router.push('/')
            } else {
                setOpen(true)
                setError('Invalid email or password')
            }
        }
        catch (err) { console.error(err) }
    }

    return (
        <Container>
            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs display="flex" justifyContent="center" alignItems="center">
                    <Paper sx={{ paddingX: 2, paddingY: 4 }}>
                        <Typography variant="h4" textAlign={'center'} fontWeight={600} mb={2}>
                            Sign Up
                        </Typography>

                        <Stack component={'form'} gap={2} minWidth={350} paddingX={2} onSubmit={handleSubmit(onSubmit)} >
                            <TextField label="Nama" variant="standard" {...register('name')} />
                            <TextField label="Email" variant="standard" {...register('email')} />
                            <TextField type="password" label="Password" variant="standard" {...register('password')} />
                            <TextField type="password" label="Konfirmasi Password" variant="standard" {...register('confirm-password')} />
                            <FormControl>
                                <InputLabel id="roleId">daftar sebagai</InputLabel>
                                <Select
                                    labelId="roleId"
                                    label='daftar sebagai'
                                    {...register('role')}
                                >
                                    <MenuItem value={2}>Penghuni Kos</MenuItem>
                                    <MenuItem value={3}>Pemilik Kos</MenuItem>
                                </Select>
                            </FormControl>

                            <Button type="submit" variant="contained">SIGN UP</Button>
                            <Link textAlign={'center'} href="/login" underline="hover">Sudah punya akun?</Link>
                        </Stack>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}