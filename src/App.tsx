import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from './components/theme-provider';
import PageRoutes from './routes/page-routes';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <PageRoutes />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
