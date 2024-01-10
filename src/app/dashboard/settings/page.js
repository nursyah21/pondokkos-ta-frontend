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
// import Controller from '@mui/material/Controller'
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
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { blue } from "@mui/material/colors";
import { MuiFileInput } from "mui-file-input";
import { Divider, FormGroup, Icon } from "@mui/material";
// import { toBase64 } from "@rossbob/image-to-base64";
import axios from "axios";

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});


const fetcher = (...args) => fetch(...args).then(res => res.json())

function useUser() {
    const { data, error, isLoading } = useSWR('/api/my', fetcher)

    return {
        data,
        isLoading,
        error
    }
}
const colors = [200, 300, 400, 500, 600, 700, 800]
const formData = new FormData()

export default function Page() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [finished, setFinished] = useState(false)
    const router = useRouter()

    const { control, register, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { data, error: errorswr, isLoading } = useUser()

    useEffect(() => {

    }, [])
    if (data && !isLoading && !finished) {
        setValue('name', data.name)
        setValue('email', data.email)
        setValue('no_telp', data.no_telp)
        setValue('no_rek', data.no_rek)
        setValue('url_img', data.url_img)
        setValue('id_role', parseInt(data.id_role))
        setValue('id', data.id)
        setFinished(true)
    }
    const [file, setFile] = useState(null)

    const handleChange = (newFile) => {
        if (newFile?.size > 1024 * 200) {
            setError('max file size 200kb')
            setOpen(true)
            return
        }
        setFile(newFile)
    }

    const onSubmit = async (dataSubmit, e) => {
        "use client"
        e.preventDefault()
        const data = dataSubmit
        if (file) {
            const url_img = await getBase64(file)
            data['url_img'] = url_img
        }

        const response = await axios.post('/api/my', data)
        if (response.status == 200) {
            localStorage.setItem('successNotif', 'success edit data')
            // router.prefetch()
            window.location.reload()
            // setFinished(false)
            // setOpenSuccess(true)

        } else {
            console.error(response.status)
        }
    }

    const FormData = () =>
        <Paper>
            <Stack method="post" component={'form'} gap={3} minWidth={200} padding={2} onSubmit={handleSubmit(onSubmit)} width={'100%'} >
                <Typography variant="h4">Pengaturan</Typography>
                <Divider />
                <Avatar
                    alt={data?.name}
                    src={data?.url_img}
                    sx={{ width: 90, height: 90 }}
                    variant="rounded"
                />

                <TextField variant="standard" label="nama" {...register('name', { required: true })} />
                {errors.name && <Typography fontSize={15} color={"error"}>Nama is required</Typography>}

                <TextField type="email" variant="standard" label="email" {...register('email', { required: true })} />
                {errors.email && <Typography fontSize={15} color={"error"}>Email address is required</Typography>}
                {/* <TextField type="password" variant="standard" label="password" {...register('password', { required: true, minLength: 8 })} />
            {errors.password?.type === 'required' && <Typography fontSize={15} color={"error"}>Password is required</Typography>}
            {errors.password?.type === 'minLength' && <Typography fontSize={15} color={"error"}>Password min length 8</Typography>} */}

                <FormControl disabled={data?.id_role != 1}>
                    <InputLabel id="roleId">daftar sebagai</InputLabel>
                    <Select
                        labelId="roleId"
                        label='daftar sebagai'
                        {...register('id_role', { required: true })}
                        defaultValue={parseInt(data?.id_role)}
                    >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={2}>Penghuni Kos</MenuItem>
                        <MenuItem value={3}>Pemilik Kos</MenuItem>
                    </Select>
                </FormControl>
                <TextField type="number" variant="standard" label="no telepon" {...register('no_telp')} />
                {/* {errors.no_telp && <Typography fontSize={15} color={"error"}>No telepon is required</Typography>} */}

                <TextField type="number" variant="standard" label="no rekening" {...register('no_rek')} />
                {/* {errors.no_rek && <Typography fontSize={15} color={"error"}>No Rekening is required</Typography>} */}

                <MuiFileInput
                    label='image'
                    placeholder="place your image"
                    inputProps={{ accept: '.png, .jpeg' }}
                    value={file}
                    onChange={handleChange}
                    clearIconButtonProps={{
                        title: "Remove",
                        children: <Icon fontSize="small" >close</Icon>
                    }} />


                <Button disabled={isSubmitting} type="submit" variant="contained">Update
                    {isSubmitting && <CircularProgress sx={{ marginLeft: 2 }} size={'1rem'} color="inherit" />}
                </Button>

            </Stack>
        </Paper>
        
    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            <AlertSuccess success={'Success edit account'} open={openSuccess} setOpen={setOpenSuccess} />

            <Grid my={2} sx={{
                display: { xs: 'block', sm: 'none' }
            }} >

                {isLoading
                 ? <Stack justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress />
                </Stack> :
                    <FormData />
                }

            </Grid>

            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >

                {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                    <CircularProgress />
                </Stack> :
                    <FormData />
                }

            </Grid>
        </Container>
    );
}