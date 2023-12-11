import { Box } from "@mui/material"
// export const metadata = {
//   title: 'index'
// }
import {
  LoginButton,
  RegisterButton,
  LogoutButton,
  ProfileButton
} from "./ui/components/buttons"
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <div>
        <LoginButton />
        
          {/* <LoginButton />
          <RegisterButton />
          <LogoutButton />
          <ProfileButton />
           */}
           
          <pre>{JSON.stringify(session)}</pre>
        </div>
      </Box>
    </>
  )
}
