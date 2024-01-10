import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';


export default function AlertSuccess({ success, open, setOpen }) {
    const [notifSuccess, setNotifSuccess] = useState(success)

    useEffect(() => {
        let notif = localStorage.getItem('successNotif')
        if (notif) {
            console.log(notif)
            setNotifSuccess(notif)
            // success = notif
            setOpen(true)
            localStorage.removeItem('successNotif')
        }
    }, [])

    return (
        <Snackbar
            open={open} autoHideDuration={6000} onClose={() => setOpen(!open)}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={() => setOpen(!open)} severity="success" sx={{ width: '100%' }}>
                {notifSuccess}
            </Alert>
        </Snackbar>
    )
}
