import { createBrowserRouter, RouterProvider,redirect } from "react-router-dom";

import { ListClient } from "../page/client/ListClient";
import { AddClient } from "../page/client/AddClient";

export const RootRouter = () => {


    const router = createBrowserRouter([
        {
            path: "",
           loader:async ()=>{
            return redirect("client/list")
           }
        },
        {
            path: "*",
           loader:async ()=>{
            return redirect("client/list")
           }
        },
        {
            path: "client/list",
            Component: ListClient
        },
        {
            path: "client/create",
            Component: AddClient

        }
    ]);

    return <RouterProvider router={router} />
}