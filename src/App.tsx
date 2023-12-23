import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from './components/theme-provider';
import PageRoutes from './routes/page-routes';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <PageRoutes />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
