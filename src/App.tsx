import { QueryClientProvider } from 'react-query';
import { ThemeProvider } from './components/theme-provider';
import PageRoutes from './routes/page-routes';
import { Toaster } from './components/ui/sonner';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { queryClient } from './configs/query-client';

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
