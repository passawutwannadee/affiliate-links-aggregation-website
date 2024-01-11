import { QueryClientProvider, QueryClient } from 'react-query';
import { ThemeProvider } from './components/theme-provider';
import PageRoutes from './routes/page-routes';
import { Toaster } from './components/ui/sonner';
import { Provider } from 'react-redux';
import store from './redux/store/store';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PageRoutes />
          <Toaster />
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
