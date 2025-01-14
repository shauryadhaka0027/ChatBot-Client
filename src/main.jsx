import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { SocketContextProvider } from './Context/SocketContext.jsx';
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <SocketContextProvider>
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </SocketContextProvider>
    
    


)
