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
import Home from "./ui/pages/Home";

export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <>
    <Home />
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        adasd
      </Box> */}
    </>
  )
}
