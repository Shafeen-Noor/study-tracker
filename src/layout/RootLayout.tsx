import { Outlet, NavLink } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, Container, IconButton } from '@mui/material'
import { Brightness4, Brightness7 } from '@mui/icons-material'
import { useThemeMode } from '../shared/context'
import { QuoteBanner } from '../pages/Quote'

const RootLayout: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeMode()

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
          <IconButton color="inherit" onClick={toggleTheme}>
            {isDarkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <QuoteBanner />

      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default RootLayout
