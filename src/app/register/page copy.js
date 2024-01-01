"use client"

import Image from "next/image";
// import Form from "@/components/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { signIn } from "next-auth/react";
import { Grid, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, Link } from '@mui/material';




export default function Login() {
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    const router = useRouter()
    const { email, password } = userInfo

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(email, password)
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
        if (res?.error) return setError(res.error)
        console.log(res)
        // router.replace('/profile')
    }
    return (
        <>
            <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '50%', maxWidth: 500, margin: '0 auto' }}>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                        Sign Up
                    </Typography>
                    <TextField label="Name" name="name" margin="normal" fullWidth required />
                    <TextField label="Email" name="email" margin="normal" fullWidth required />
                    <TextField label="Password" name="password" margin="normal" fullWidth required />
                    <TextField label="Confirm Password" name="confirmPassword" margin="normal" fullWidth required />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select labelId="role-label" label="Role" name="role" required>
                            <MenuItem value="penghuni">Penghuni</MenuItem>
                            <MenuItem value="pemilik">Pemilik</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                    <Typography variant="body2" sx={{ marginTop: 2 }}>
                        Already have an account?{' '}
                        <Link href="/login" underline="hover">
                            Sign In
                        </Link>
                    </Typography>
                </Box>
            </Grid>
        </>
    );
}