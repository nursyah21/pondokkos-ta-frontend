"use client"

import { useEffect, useState } from "react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Navbar from '@/app/components/Navbar'
import { useRouter } from "next/navigation";


export default function Home({ session }) {
    const router = useRouter()
    const [user, setUser] = useState(null)
    useEffect(() => {
        if (session) {
            setUser(session)
        }

    }, [session])

    return (
        <>
            {session ? router.push('/dashboard')
                :
        <>
            <Navbar />
            <Box >
                <Grid container spacing={2} minHeight={'80vh'}>
                    <Grid xs item display="flex" justifyContent="center" alignItems="center">
                        <Box display={'block'} textAlign={'center'}>
                            <Typography variant="h3">PondokKos</Typography>
                            <Typography variant="subtitle">Satu aplikasi untuk penghuni kos dan pemilik kos</Typography>
                        </Box>
                        {/* {user && <>{JSON.stringify(user)}</>} */}
                        {/* <pre>{JSON.stringify(session.user)}</pre> */}
                    </Grid>
                </Grid>
            </Box >
            </>
            }
        </>
    )
}
