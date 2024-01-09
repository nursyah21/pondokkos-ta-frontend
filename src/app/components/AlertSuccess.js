import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AlertSuccess({ success, open, setOpen }) {

    return (
        <Snackbar
            open={open} autoHideDuration={4000} onClose={() => setOpen(!open)}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={() => setOpen(!open)} severity="success" sx={{ width: '100%' }}>
                {success}
            </Alert>
        </Snackbar>
    )
}
