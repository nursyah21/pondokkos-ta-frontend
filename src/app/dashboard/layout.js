import Navbar from "../components/Navbar"

export default function RootLayout({ children }) {
    return (<>
    <Navbar hiddenLogin={true} />
    {children}
    </>)
}