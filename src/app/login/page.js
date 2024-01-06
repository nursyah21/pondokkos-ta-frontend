"use client"

import Image from "next/image";
// import Form from "@/components/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { signIn } from "next-auth/react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { styled } from "@mui/material/styles";

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 120,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export default function Login() {
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const { email, password } = userInfo

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email, password)
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        if (res?.error) return setError(res.error)
        console.log(res)
    }
    return (
        <Container>

            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs display="flex" justifyContent="center" alignItems="center">
                    <Paper sx={{ paddingX: 2, paddingY: 4 }}>
                        <Typography variant="h4" textAlign={'center'} fontWeight={600} mb={2}>
                            Sign In
                        </Typography>

                        <Stack gap={2} minWidth={350} paddingX={2} >
                            <TextField label="Email" variant="standard" fullWidth/>
                            <TextField label="Password" variant="standard" fullWidth/>
                            <Link href="/forget-password" underline="hover">Lupa password?</Link>
                            <Button variant="contained">SIGN IN</Button>
                            <Link textAlign={'center'} href="/register" underline="hover">Belum punya akun? Sign up</Link>
                        </Stack>

                    </Paper>
                </Grid>
            </Grid>


        </Container>
    );
}