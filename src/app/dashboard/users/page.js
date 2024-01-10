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
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import AlertError from '@/app/components/AlertError'
import AlertSuccess from '@/app/components/AlertSuccess'
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { blue } from "@mui/material/colors";
import useSWRInfinite from 'swr/infinite'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const colors = [200, 300, 400, 500, 600, 700, 800]

// If `null` is returned, the request of that page won't start.
const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/users?page=${pageIndex}&take=10`                    // SWR key
}

export default function Page() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
    });
    const router = useRouter()
    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { data, isLoading, mutate } = useSWR(`/api/users?page=${paginationModel.page}&take=10000`, fetcher);
    // const { data, size, setSize, isLoading } = useSWRInfinite(
    //     (index) => `/api/users?take=10&page=${index}`,
    //     fetcher
    // );

    let rows = []
    if (data?.users) {
        rows = data.users.map((item, idx) => ({
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
                            <Avatar sx={{ bgcolor: blue[colors[Math.floor(Math.random() * colors.length)]] }} src={params.value.img} />
                        </IconButton>
                        {params.value.role}
                    </>
                )
            }
        },
        { field: 'col5', headerName: '', width: 200 },
    ], []);



    const DataPengguna = () => <Paper sx={{ padding: 2 }}>
        <Grid gap={4} >{
            isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                < CircularProgress />
            </Stack > : <>
                <Typography mb={3} variant="h4">Data Pengguna</Typography>
                <Divider />
                <div style={{ height: 480, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        loading={isLoading}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                    // hideFooter
                    // onrow
                    />
                </div>
                {/* <Grid display={'flex'} justifyContent={'center'}>
                    <Pagination count={10} sx={{ my: 2}} onChange={(e)=>setPaginationModel({e.target.value})}/>
                </Grid> */}
            </>
        }
        </Grid>
    </Paper>


    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            <AlertSuccess success={'Success create account'} open={openSuccess} setOpen={setOpenSuccess} />

            <Grid my={2} sx={{
                display: { xs: 'block', sm: 'none' }
            }} >
                <DataPengguna />
            </Grid>

            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >
                <DataPengguna />
            </Grid>
        </Container >
    );
}