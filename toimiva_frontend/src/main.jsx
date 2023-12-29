import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
<Router>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
</Router>
);
