"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { useForm } from "react-hook-form";
import AlertError from '@/app/components/AlertError'

export default function Login() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const router = useRouter()

    useEffect(()=>{
        console.log('asda')
        if(router.data){
            console.log(router.data)
        }
    },[])

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
                router.push('/dashboard')
            } else {
                setOpen(true)
                setError('Invalid email or password')
            }
        }
        catch (err) { console.error(err) }

    }


    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            
            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs item display="flex" justifyContent="center" alignItems="center">
                    <Paper sx={{ paddingX: 2, paddingY: 4 }}>
                        <Typography variant="h4" textAlign={'center'} fontWeight={600} mb={2}>
                            Sign In
                        </Typography>

                        <Stack method="post" component={'form'} gap={2} minWidth={350} paddingX={2} onSubmit={handleSubmit(onSubmit)} >
                            <TextField type="email" label="Email" variant="standard" {...register('email', { required: true })} />
                            {errors.email && <Typography fontSize={15} color={"error"}>Email address is required</Typography>}
                            <TextField type="password" label="Password" variant="standard" {...register('password', { required: true })} />
                            {errors.password && <Typography fontSize={15} color={"error"}>Password is required</Typography>}

                            <Link href="/forget-password" underline="hover">Lupa password?</Link>
                            <Button disabled={isSubmitting} type="submit" variant="contained">SIGN IN
                                {isSubmitting && <CircularProgress sx={{ marginLeft: 2 }} size={'1rem'} color="inherit" />}
                            </Button>
                            <Link textAlign={'center'} href="/register" underline="hover">Belum punya akun? Sign up</Link>
                        </Stack>

                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}