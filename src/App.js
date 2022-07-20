import './App.css';
import { ResultsPage, Navbar, FrontPage } from './components/exports';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<FrontPage />} />
            <Route path='prices' element={
              <>
                <Navbar />
                <ResultsPage />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
