import './App.css';
import { ResultsPage } from './components/exports';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ResultsPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
