import Account from "../../Account/Account";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";

const ManageAccountPage = () => {

  const [selleraccount, setSelleraccount] = useState([]);
    //GH82483
    const idUser = getUserFieldFromCookieOrLocalStorage("id");
    const requestUrl = "https://localhost:44369/api/gianhang/" + idUser
    console.log(requestUrl)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                requestUrl,
            );

            setSelleraccount(result.data);
            console.log(selleraccount)
        };

        fetchData();
        
    }, []);

  return(
    <Account AccountInfo={selleraccount}/>
  );
};

export default ManageAccountPage;