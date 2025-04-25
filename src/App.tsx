import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import root from "./router/root";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client ={queryClient}>
    <RouterProvider router = {root}></RouterProvider>
    <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
