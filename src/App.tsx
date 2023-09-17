import { ThemeProvider } from './components/theme-provider';
import PageRoutes from './routes/page-routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <PageRoutes />
    </ThemeProvider>
  );
}

export default App;
