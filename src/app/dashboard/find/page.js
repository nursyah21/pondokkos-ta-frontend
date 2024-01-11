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
import Card from '@mui/material/Card';
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from '@mui/material/CircularProgress';
import AlertError from '@/app/components/AlertError'
import AlertSuccess from '@/app/components/AlertSuccess'
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { blue } from "@mui/material/colors";
import useSWRInfinite from 'swr/infinite'
import { MuiFileInput } from "mui-file-input";
import { Icon } from "@mui/material";
// import SearchBar from "material-ui-search-bar";
import InputAdornment from '@mui/material/InputAdornment';
import axios from "axios";

const getBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const fetcher = (...args) => fetch(...args).then(res => res.json())

const colors = [200, 300, 400, 500, 600, 700, 800]

// function SearchBar({setData, data}) {
//     const handleSubmit = (event) => {
//         // console.log(event.keyCode)
//         if(event.key === 'Enter'){
//             const searchQuery = event.target.value;
//             console.log(searchQuery);
//             setData(searchQuery)
//         }
//     };

//     return (
//       <TextField
//         type="text"
//         placeholder="tulis nama kos"
//         onKeyDown={handleSubmit}

//         fullWidth
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
//     );
//   }

// If `null` is returned, the request of that page won't start.
const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return `/users?page=${pageIndex}&take=10`                    // SWR key
}



function MediaCard({ url_img, name, description, id, address }) {
    return (
        <Card sx={{ padding: 2, margin: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={url_img}
                        title={name}
                    />
                </Grid>
                <Grid item xs={8}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {name}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            description: {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            alamat: {address}
                        </Typography>
                    </CardContent>


                    {/* <CardActions>
                        <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                    </CardActions> */}
                </Grid>

            </Grid>
        </Card>
    );
}


export default function Page() {
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState(false)
    const [openCreateKos, setOpenCreateKos] = useState(false)
    const [dataResult, setDataResult] = useState(null)
    const [loadingResult, setLoadingResult] = useState(false)
    // const [dataResult, setDataResult] = useState([])
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 1,
    });
    const [cursorPage, setCursorPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const router = useRouter()
    const [file, setFile] = useState(null)
    const [fileBase64, setFileBase64] = useState(null)
    const [search, setSearch] = useState(null)

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

    const { data, isLoading } = useSWR('/api/find', fetcher)
    // const { data: dataKos, isLoading: isLoadingKos } = useSWR('/api/kos', fetcher)

    const SearchBar = () => {
        const handleSubmit = async (event) => {
            // console.log(event.keyCode)
            if (event.key === 'Enter') {
                const searchQuery = event.target.value;
                setLoadingResult(true)
                const response = await axios.get(`/api/find?q=${searchQuery}`)

                if (response.status == 200) {
                    // localStorage.setItem('successNotif', 'success menambahkan data')
                    // window.location.reload()
                    // console.log('asd',response.data)
                    setDataResult(response.data)
                    // console.log(dataResult)
                } else {
                    setDataResult(null)
                }
                setLoadingResult(false)
            }
        };

        return (
            <TextField
                type="text"
                placeholder="tulis nama kos"
                onKeyDown={handleSubmit}

                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        );
    }


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
            window.location.reload()
        } else {
            setOpen(true)
            setError('gagal Menambahkan data')
        }
    }


    const DataKos = () =>
        <Paper sx={{ padding: 2 }}>
            <Grid gap={4} >

                <Typography variant="h4">Cari Kos</Typography>
                <Divider mb={3} />
                <Stack my={2} gap={2}>
                    <SearchBar setData={setSearch} />
                    {(isLoading || loadingResult) ?
                        <Stack justifyContent={'center'} alignItems={'center'}>
                            <CircularProgress />
                        </Stack> :
                        dataResult ?
                            dataResult?.map(e => (
                                <MediaCard key={e.id} url_img={e.url_img} name={e.name_kos} description={e.address} id={e.id} address={e.address} />
                            )) :
                            data.res?.map(e => (
                                <MediaCard key={e.id} url_img={e.url_img} name={e.name_kos} description={e.address} id={e.id} address={e.address} />
                            ))
                    }
                </Stack>
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