import ReactDOM from "react-dom/client"
import CssBaseline from "@mui/material/CssBaseline"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeModeProvider } from "./context/ThemeContext"
import { FilterProvider } from "./context/FilterContext"
import { SubjectsProvider } from "./context/SubjectContext"

import RootLayout from "./layout/RootLayout"
import App from "./App"
import AddEntry from "./features/addEntry/AddEntry"
import EntryList from "./features/entryList/EntryList"
import Dashboard from "./features/dashboard/Dashboard"

const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          element: (
            <SubjectsProvider>
              <FilterProvider>
                <App />
              </FilterProvider>
            </SubjectsProvider>
          ),
          children: [
            { index: true, element: <Dashboard /> },
            { path: "add", element: <AddEntry /> },
            { path: "entries", element: <EntryList /> },
          ],
        },
      ],
    },
  ],
  { basename: "/study-tracker/" },
)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeModeProvider>
      <SubjectsProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </SubjectsProvider>
    </ThemeModeProvider>
  </QueryClientProvider>
)