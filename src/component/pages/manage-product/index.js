import ManageProduct from "../../ManageProduct/ManageProduct";
import { useState, useEffect } from "react";
import axios from "axios";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";
const ManageProductPage = () => {
  const idUser = getUserFieldFromCookieOrLocalStorage("id");
  const [sellerproducts, setSellerproducts] = useState([]);

    const requestUrl = "https://localhost:44369/api/sanpham/gianhangsp/" + idUser
    console.log(requestUrl)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                requestUrl,
            );
            setSellerproducts(result.data);
        };
        fetchData();
    }, []);

  return(
    <ManageProduct sellerproducts={sellerproducts}/>
  );
};

export default ManageProductPage;