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
import useSWR from "swr";
import Divider from "@mui/material/Divider";

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Dashboard() {
    // const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [pieChart, setPieChart] = useState([])

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

    const { data, error, isLoading } = useSWR('/api/chart', fetcher)

    // if (data && !isLoading) {
    //     // console.log(data)
    //     setPieChart([
    //         {
    //             data: [
    //                 { id: 0, value: 10, label: 'admin' },
    //                 { id: 1, value: 20, label: 'penghuni' },
    //                 { id: 2, value: 30, label: 'pemilik' },
    //             ],
    //         },
    //     ])
    // }

    const MyChart = () =>
        <Paper sx={{ padding: 4 }}>
            <Stack>
                <Box my={2}>
                    <Typography variant="h4">
                        Dashboard
                    </Typography>
                    <Divider />
                </Box>
                {isLoading ? <CircularProgress /> :
                    data ?
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: data?.admin, label: `admin (${data?.admin})` },
                                        { id: 1, value: data?.penghuni, label: `penghuni (${data?.penghuni})` },
                                        { id: 2, value: data?.pemilik, label: `pemilik (${data?.pemilik})` },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        /> : null
                }

            </Stack>
        </Paper>


    // if(isLoading) return <CircularProgress />
    return (
        <Container>
            {/* <AlertSuccess success={'selamat'} open={open} setOpen={setOpen} /> */}
            {/* {
                isLoading && <CircularProgress />
            } */}
            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >
                <MyChart />
            </Grid>
            <Grid my={2} sx={{
                display: { xs: 'block', sm: 'none' }
            }} >
                <MyChart />
            </Grid>
        </Container>
    );
}