"use client"
import { useState } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Grid,
    TextField,
    Typography,
    Image,
} from "@mui/material";

function SignUp() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("");

    const handleSignUp = (e) => {
        e.preventDefault();
        // Implement your signup logic here
        console.log({ nama, email, password, konfirmasiPassword });
    };

    return (
        <>ads</>
        // <Box sx={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
        //     <Grid container justifyContent="center" alignItems="center">
        //         <Grid item xs={10} sm={7} md={5}>
        //             <Box sx={{ backgroundColor: "#fff", padding: 3 }}>
        //                 <Image
        //                     src="https://i.ibb.co/MGSGvZ1/logo-87-1.png"
        //                     alt="Logo"
        //                     sx={{ width: 150, height: 50, mb: 3 }}
        //                 />
        //                 <Typography variant="h4" align="center" mb={3}>
        //                     Sign Up
        //                 </Typography>
        //                 <FormControl fullWidth>
        //                     <FormLabel>Nama</FormLabel>
        //                     <TextField
        //                         id="nama"
        //                         variant="outlined"
        //                         value={nama}
        //                         onChange={(e) => setNama(e.target.value)}
        //                     />
        //                 </FormControl>
        //                 <FormControl fullWidth mt={3}>
        //                     <FormLabel>Email</FormLabel>
        //                     <TextField
        //                         id="email"
        //                         variant="outlined"
        //                         value={email}
        //                         onChange={(e) => setEmail(e.target.value)}
        //                     />
        //                 </FormControl>
        //                 <FormControl fullWidth mt={3}>
        //                     <FormLabel>Password</FormLabel>
        //                     <TextField
        //                         id="password"
        //                         variant="outlined"
        //                         type="password"
        //                         value={password}
        //                         onChange={(e) => setPassword(e.target.value)}
        //                     />
        //                 </FormControl>
        //                 <FormControl fullWidth mt={3}>
        //                     <FormLabel>Konfirmasi Password</FormLabel>
        //                     <TextField
        //                         id="konfirmasiPassword"
        //                         variant="outlined"
        //                         type="password"
        //                         value={konfirmasiPassword}
        //                         onChange={(e) => setKonfirmasiPassword(e.target.value)}
        //                     />
        //                 </FormControl>
        //                 <Grid container justifyContent="space-between" mt={3}>
        //                     <Grid item>
        //                         <Button variant="contained" onClick={handleSignUp}>
        //                             Daftar Sebagai Penghuni Kos
        //                         </Button>
        //                     </Grid>
        //                     <Grid item>
        //                         <Typography variant="body2">Sudah punya akun?</Typography>
        //                     </Grid>
        //                 </Grid>
        //             </Box>
        //         </Grid>
        //     </Grid>
        // </Box>
    );
}

export default SignUp;
