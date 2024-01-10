import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AlertError({ error, open, setOpen }) {

    return (
        <Snackbar
            open={open}  autoHideDuration={6000} onClose={() => setOpen(!open)}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
            <Alert onClose={() => setOpen(!open)} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>
    )
}
