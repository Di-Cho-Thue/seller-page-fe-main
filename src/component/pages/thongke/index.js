import ThongKe from "../../ThongKe/ThongKe";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
const ThongKePage = () => {
  const [gianhangthongke, setThongKe] = useState([]);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  const location = useLocation();
  const [cookies] = useCookies(["dichoho"]);
  const requestUrl =
    "https://localhost:44369/api/gianhang/doanhthu/" +
    cookies.Id +
    "/0/" +
    mm +
    "/" +
    yyyy;

  console.log(requestUrl);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(requestUrl);

      setThongKe(result.data);
      console.log(gianhangthongke);
    };

    fetchData();
  }, []);

  return <ThongKe ThongKeInfo={gianhangthongke} />;
};

export default ThongKePage;
