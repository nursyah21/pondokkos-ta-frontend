"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signIn, signOut } from "next-auth/react";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useForm } from "react-hook-form";



export default function Dashboard() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

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
                    <Stack direction={'column'}>
                        <Box>
                            Dashboard
                        </Box>
                        <Box>
                            <Button onClick={signOut}>Sign Out</Button>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}