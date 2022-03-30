import GiayTo from "../../GiayTo/GiayTo";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const GiayToPage = () => {
  const [giayTo, setgiayTo] = useState([]);
  const [cookies] = useCookies(["dichoho"]);

  const requestUrl =
    "https://localhost:44369/api/gianhang/giayto/" +
    getUserFieldFromCookieOrLocalStorage("id") +
    "/all";

  console.log(requestUrl);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(requestUrl);

      setgiayTo(result.data);
      console.log(giayTo);
    };

    fetchData();
  }, []);

  return <GiayTo GiayToInfo={giayTo} />;
};

export default GiayToPage;
