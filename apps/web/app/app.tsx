import { BrowserRouter } from 'react-router'
import Router from './routing/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './context/theme/ThemeProvider'

const App = () => {
  const client = new QueryClient()
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
