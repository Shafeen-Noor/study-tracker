import { Outlet, NavLink } from "react-router-dom"
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material"

const RootLayout: React.FC = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Study Tracker
          </Typography>

          <Button color="inherit" component={NavLink} to="/">
            Dashboard
          </Button>
          <Button color="inherit" component={NavLink} to="/add">
            Add Entry
          </Button>
          <Button color="inherit" component={NavLink} to="/entries">
            My Entries
          </Button>
        </Toolbar>
      </AppBar>

      {/* 👇 This is where each page renders */}
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default RootLayout