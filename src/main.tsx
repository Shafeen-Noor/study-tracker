import ReactDOM from "react-dom/client"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import RootLayout from "./layout/RootLayout"
import App from "./App"
import AddEntry from "./features/addEntry/AddEntry"
import EntryList from "./features/entryList/EntryList"
import Dashboard from "./features/dashboard/Dashboard"

const theme = createTheme({
  palette: { primary: { main: "#9188f1" } },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "add", element: <AddEntry /> },
          { path: "entries", element: <EntryList /> }
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
)
