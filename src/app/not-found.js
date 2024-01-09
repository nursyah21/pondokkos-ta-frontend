'use client'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import Link from 'next/link'

export default function NotFound() {
  return (
    <home>

      <Container>
        <Grid container spacing={2} minHeight={'80vh'}>
          <Grid xs item display="flex" justifyContent="center" alignItems="center">
            <Stack>
              <Typography variant='h2' fontSize={48}>404 Not Found</Typography>
              {/* <Typography>Could not find requested resource</Typography>
            <Button href="/" variant='text'>Return Home</Button> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </home>
  )
}