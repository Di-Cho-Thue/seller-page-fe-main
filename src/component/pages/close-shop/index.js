import CloseShop from "../../CloseShop/CloseShop";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";
const CloseShopPage = () => {
  const idUser = getUserFieldFromCookieOrLocalStorage("id");
  const [selleraccount, setSelleraccount] = useState([]);

    const requestUrl = "https://localhost:44369/api/gianhang/" + idUser
    console.log(requestUrl)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                requestUrl,
            );

            setSelleraccount(result.data);
        };

        fetchData();
        
    }, []);

  return(
    <CloseShop AccountInfo={selleraccount}/>
  );
};

export default CloseShopPage;