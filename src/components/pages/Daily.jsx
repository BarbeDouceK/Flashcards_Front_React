import { useState } from "react";
import { CardCompo } from "./CardCompo"
import ApiService from "../../service/ApiService";

export const Daily = () => {

    const [bool, setBool] = useState(false);

    // Appel back a effectuer direct

    api = new ApiService("http://localhost:8080/api/v1/");

    api.get()
    // insérer dynamiquement dans CardCompo




    return (
        <>
            <CardCompo/>
        </>
    )
}