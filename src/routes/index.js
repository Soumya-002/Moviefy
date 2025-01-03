import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home"
import ExplorePage from "../components/ExplorePage";
import DetailsPage from "../components/DetailsPage";
import SearchPage from "../components/SearchPage";

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <ExplorePage/>
            },
            {
                path : ":explore/:id",
                element : <DetailsPage/>
            },
            {
                path : "search",
                element : <SearchPage/>
            }
        ]

    }
])

export default router;