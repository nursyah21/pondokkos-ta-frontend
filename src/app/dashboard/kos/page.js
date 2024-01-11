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
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import AlertError from '@/app/components/AlertError'
import AlertSuccess from '@/app/components/AlertSuccess'
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { blue } from "@mui/material/colors";
import useSWRInfinite from 'swr/infinite'
import { MuiFileInput } from "mui-file-input";
import { Icon } from "@mui/material";
import axios from "axios";

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

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
    const [openCreateKos, setOpenCreateKos] = useState(false)
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
    });
    const [cursorPage, setCursorPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [fileBase64, setFileBase64] = useState(null)

    const handleChange = async (newFile) => {
        console.log('asdsad')
        if (newFile?.size > 1024 * 200) {
            setError('max file size 200kb')
            setOpen(true)
            return
        }
        let data = null
        if (newFile) {
            data = await getBase64(newFile)
        }
        setFileBase64(data)

        setFile(newFile)
    }

    const { data: dataPemilik, isLoading } = useSWR('/api/my', fetcher)


    const { register, watch, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const onSubmit = async (data, e) => {
        e.preventDefault()
        if (!fileBase64) {
            setError('tidak terdapat gambar kos')
            setOpen(true)
            return
        }
        data['url_img'] = fileBase64
        data['id_pemilik'] = dataPemilik?.id

        const response = await axios.post('/api/kos', data)
        if (response.status == 200) {
            localStorage.setItem('successNotif', 'success menambahkan data')
            // router.prefetch()
            window.location.reload()
            // setFinished(false)
            // setOpenSuccess(true)

        } else {
            setOpen(true)
            setError('gagal Menambahkan data')
        }

        // console.log(data)
    }

    const DataKos = () => isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
        <CircularProgress />
    </Stack> :
        <Paper sx={{ padding: 2 }}>
            <Grid gap={4} >

                <Typography variant="h4">Data Kos Saya</Typography>
                <Divider mb={3} />
                {
                    !openCreateKos ?
                        <>
                            <Stack my={3} >
                                <Button onClick={() => setOpenCreateKos(!openCreateKos)} sx={{ width: 200 }} variant="contained">Tambahkan kos</Button>
                            </Stack>
                        </>
                        :
                        <Paper sx={{ marginTop: 4, padding: 2 }}>
                            <Stack direction="row" justifyContent="flex-end">
                                <IconButton onClick={() => setOpenCreateKos(!openCreateKos)} >
                                    <Icon>close</Icon>
                                </IconButton>
                            </Stack>
                            <Stack method="post" component={'form'} gap={2} minWidth={350} paddingX={2} onSubmit={handleSubmit(onSubmit)} >
                                <CardMedia>
                                    {fileBase64 &&
                                        <img alt="" src={fileBase64} width={280} height={200} />
                                    }
                                </CardMedia>
                                <Typography variant="h6" >Tambahkan Data Kos</Typography>
                                <TextField label="Nama kos" variant="standard" {...register('name_kos', { required: true })} />
                                {errors.name && <Typography fontSize={15} color={"error"}>Nama kos is required</Typography>}

                                <TextField label="Alamat" variant="standard" {...register('address', { required: true })} />
                                {errors.address && <Typography fontSize={15} color={"error"}>Alamat is required</Typography>}

                                <TextField label="Deskripsi kos" variant="standard" {...register('description', { required: true })} />
                                {errors.description && <Typography fontSize={15} color={"error"}>Alamat is required</Typography>}

                                <MuiFileInput
                                    label='image'
                                    placeholder="place your image"
                                    inputProps={{ accept: '.png, .jpeg, .jpg' }}
                                    value={file}
                                    onChange={handleChange}
                                    clearIconButtonProps={{
                                        title: "Remove",
                                        children: <Icon fontSize="small" >close</Icon>
                                    }} />

                                <Button disabled={isSubmitting} type="submit" variant="contained">Submit
                                    {isSubmitting && <CircularProgress sx={{ marginLeft: 2 }} size={'1rem'} color="inherit" />}
                                </Button>
                            </Stack>
                        </Paper>
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
                <DataKos />
            </Grid>

            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >
                <DataKos />
            </Grid>
        </Container >
    );
}