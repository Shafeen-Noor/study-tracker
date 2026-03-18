import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { RootLayout } from './layout'
import { AddEntry } from './pages/AddEntry'
import { EntryList } from './pages/EntryList'
import { Dashboard } from './pages/Dashboard'
import {
  ThemeModeProvider,
  FilterProvider,
  SubjectsProvider,
  EntriesProvider,
} from './shared/context'

const queryClient = new QueryClient()

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          element: (
            <EntriesProvider>
              <SubjectsProvider>
                <FilterProvider>
                  <App />
                </FilterProvider>
              </SubjectsProvider>
            </EntriesProvider>
          ),
          children: [
            { index: true, element: <Dashboard /> },
            { path: 'add', element: <AddEntry /> },
            { path: 'entries', element: <EntryList /> },
          ],
        },
      ],
    },
  ],
  { basename: '/study-tracker/' }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeModeProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeModeProvider>
  </QueryClientProvider>
)
