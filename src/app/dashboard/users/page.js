"use client"


import { useEffect, useState, useMemo } from "react";
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
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import AlertError from '@/app/components/AlertError'
import AlertSuccess from '@/app/components/AlertSuccess'
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { blue } from "@mui/material/colors";

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useUser() {
    const { data, error, isLoading } = useSWR('/api/users', fetcher)

    return {
        data,
        isLoading,
        error
    }
}
const colors = [200, 300, 400, 500, 600, 700, 800]

export default function Page() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const router = useRouter()

    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { data, error: errorswr, isLoading } = useUser()

    let rows = []
    if (data) {
        rows = data.map((item, idx) => ({
            id: idx + 1,
            col1: item.name,
            col2: item.email,
            col3: item.no_telp ?? 'tidak tersedia',
            col4: { img: item.url_img, role: item.id_role == 1 ? 'admin' : item.id_role == 2 ? 'penghuni' : 'pemilik' },
        }))
    }


    const columns = useMemo(() => [
        { field: 'id', headerName: '#', width: 50 },
        { field: 'col1', headerName: 'Name', width: 200 },
        { field: 'col2', headerName: 'Email', width: 200 },
        { field: 'col3', headerName: 'No telp', width: 200 },
        {
            field: 'col4', headerName: '', width: 200, renderCell: (params) => {
                return (
                    <>
                        <IconButton variant="text">
                            <Avatar sx={{ bgcolor: blue[colors[Math.floor(Math.random() * colors.length)]] }} src={params.value.url_img} />
                        </IconButton>
                        {params.value.role}
                    </>
                )
            }
        },
        { field: 'col5', headerName: '', width: 200 },
        // { field: 'action', headerName: '', width: 200 },
    ], []);

    // router.push('/login', {data:'success'})
    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            <AlertSuccess success={'Success create account'} open={openSuccess} setOpen={setOpenSuccess} />

            <Grid my={2} sx={{
                display: { xs: 'block', sm: 'none' }
            }} >
                <Grid gap={4} >
                    <Typography mb={3} variant="h4">Data Pengguna</Typography>
                    {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                        <CircularProgress />
                    </Stack> :
                        <div style={{ height: 480, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} loading={isLoading} />
                        </div>
                    }
                </Grid>
            </Grid>

            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >
                <Grid >
                    <Typography mb={3} variant="h4">Data Pengguna</Typography>
                    {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                        <CircularProgress />
                    </Stack> :
                        <div style={{ height: 480, width: '100%' }}>
                            <DataGrid rows={rows} columns={columns} loading={isLoading} />
                        </div>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}