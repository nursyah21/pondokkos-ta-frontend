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
import { FormGroup, Icon } from "@mui/material";
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
    const router = useRouter()

    const { control, register, watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const { data, error: errorswr, isLoading } = useUser()

    if (data && !isLoading) {
        setValue('name', data.name)
        setValue('email', data.email)
        setValue('id_role', 1)
        setValue('id', data.id)
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
        const url_img = await getBase64(file)
        // data['id'] = data.id
        data['url_img'] = url_img
        // 
        // console.log(data)
        // const response = await fetch('/api/my',
        //     {
        //         method: 'post',
        //         body: {success: 'data'}
        //     }
        // )
        const response = await axios.post('/api/my',data)
        if (response.status == 200) {
            console.log(response)
        }else {
            console.error(response.status)
        }
        // const apikey = 'b005454bc6b2f52e9b3fe43643f04f4b'
        // if (!file) return
        // console.log(dataa)
        // return console.log(URL.createObjectURL(file))
        // formData.append('image', file);
        // console.log(formData, file)
        // const imageBase64WithFile = await toBase64(file);
        // return console.log(imageBase64WithFile)
        // if(!dataa) return
        // const linkapi = '6d207e02198a847aa98d0a2a901485a5'
        // const link = `http://freeimage.host/api/1/upload/?key=${linkapi}&source=${dataa}&format=json`
        // const link2 = `https://api.imgbb.com/1/upload&key=${apikey}`
        // const dataImg = await fetch(link,{method: 'get'})
        // if (dataImg.ok) {
        //     console.log(dataImg)
        // } else {
        //     console.error(dataImg.status)
        // }


        // console.log(data)
    }

    const FormData = () =>
        <Stack method="post" component={'form'} gap={3} minWidth={350} paddingX={2} onSubmit={handleSubmit(onSubmit)} width={'80%'} >
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
                    defaultValue={data?.id_role}
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

    return (
        <Container>
            <AlertError error={error} open={open} setOpen={setOpen} />
            <AlertSuccess success={'Success create account'} open={openSuccess} setOpen={setOpenSuccess} />

            <Grid my={2} sx={{
                display: { xs: 'block', sm: 'none' }
            }} >
                <Grid gap={4} >
                    <Typography mb={3} variant="h4">Pengaturan</Typography>
                    {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                        <CircularProgress />
                    </Stack> :
                        <FormData />
                    }
                </Grid>
            </Grid>

            <Grid my={2} ml={30} sx={{
                display: { xs: 'none', sm: 'block' }
            }} >
                <Grid >
                    <Typography mb={3} variant="h4">Pengaturan</Typography>
                    {isLoading ? <Stack justifyContent={'center'} alignItems={'center'}>
                        <CircularProgress />
                    </Stack> :
                        <FormData />
                    }
                </Grid>
            </Grid>
        </Container>
    );
}