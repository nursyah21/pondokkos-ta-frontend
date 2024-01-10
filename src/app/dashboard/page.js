"use client"

import { useEffect, useState } from "react";
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
import Drawer from '@/app/components/Drawer';
import AlertSuccess from "../components/AlertSuccess";
import { PieChart } from '@mui/x-charts/PieChart';

export default function Dashboard() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

    const router = useRouter()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })

            if (!res.error) {
                router.push('/')
            } else {
                setOpen(true)
                setError('Invalid email or password')
            }
        }
        catch (err) { console.error(err) }

    }


    // useEffect(()=>{
    //     setOpen(true)
    //     // router.({pathname:'/asdas', query:{data:'adas'}})
    // },[])

    return (
        <Container>
            {/* <AlertSuccess success={'selamat'} open={open} setOpen={setOpen} /> */}
            <Grid container spacing={2} minHeight={'100vh'}>
                <Grid xs display="flex" justifyContent="center" alignItems="center">
                    <Stack>
                        <Box>
                            Dashboard
                        </Box>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'series A' },
                                        { id: 1, value: 15, label: 'series B' },
                                        { id: 2, value: 20, label: 'series C' },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                        
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}