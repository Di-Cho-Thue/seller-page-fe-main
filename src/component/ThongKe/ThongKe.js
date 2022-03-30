import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { useCookies } from "react-cookie";
import { getUserFieldFromCookieOrLocalStorage } from "../../utils/localStorage";
charts(FusionCharts);

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ThongKe = (props) => {
  const [cookies] = useCookies(["dichoho"]);
  const query = useQuery();
  const [month, setmonth] = useState(null);
  const [year, setyear] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [chartdata, setchartdata] = useState([]);
  useEffect(async () => {
    const month = query.get("Month");
    const year = query.get("Year");
    setmonth(month || 0);
    setyear(year);
    const result = await axios({
      url:
        "https://localhost:44369/api/gianhang/doanhthu/" +
        getUserFieldFromCookieOrLocalStorage("id") +
        "/0/" +
        month +
        "/" +
        year,
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const kq2021 = await axios({
      url:
        "https://localhost:44369/api/gianhang/tongquandoanhthu/" +
        getUserFieldFromCookieOrLocalStorage("id") +
        "/2021",
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    const kq2022 = await axios({
      url:
        "https://localhost:44369/api/gianhang/tongquandoanhthu/" +
        getUserFieldFromCookieOrLocalStorage("id") +
        "/2022",
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    setchartData(kq2021.data || []);
    setchartdata(kq2022.data || []);
    setfilterData(result.data || []);
  }, []);

  async function handleThongke(e) {
    e.preventDefault();
  }

  const a = [];
  const c = [];
  chartData.map((dt, i) => a.push(dt.doanhthu));
  for (let i = 0; i < a.length; i++) {
    c.push({ value: a[i] });
  }
  const b = [];
  const d = [];
  chartdata.map((dt, i) => b.push(dt.doanhthu));
  for (let i = 0; i < b.length; i++) {
    d.push({ value: b[i] });
  }

  const dataSource = {
    chart: {
      caption: "Tổng quan doanh thu của cửa hàng",
      yaxisname: "Doanh Thu",
      subcaption: "tháng 1-12",
      showhovereffect: "1",
      numbersuffix: "$",
      drawcrossline: "0.1",
      plottooltext: "<b>$dataValue</b> tại năm $seriesName",
      theme: "fusion",
    },
    categories: [
      {
        category: [
          {
            label: "1",
          },
          {
            label: "2",
          },
          {
            label: "3",
          },
          {
            label: "4",
          },
          {
            label: "5",
          },
          {
            label: "6",
          },
          {
            label: "7",
          },
          {
            label: "8",
          },
          {
            label: "9",
          },
          {
            label: "10",
          },
          {
            label: "11",
          },
          {
            label: "12",
          },
        ],
      },
    ],

    dataset: [
      {
        seriesname: "2021",
        data: c,
      },
      {
        seriesname: "2022",
        data: d,
      },
    ],
  };

  return (
    <div>
      <ReactFusioncharts
        type="msline"
        width="100%"
        height="80%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <h3 class="title-5 m-b-35">Chi tiết doanh thu</h3>
                <div class="table-data__tool">
                  <form onXacNhan={handleThongke}>
                    <div class="table-data__tool-left">
                      <div class="rs-select2--light rs-select2--md">
                        <select
                          class="js-select2"
                          name="Month"
                          defaultValue={month}
                        >
                          <option selected="Month">Chọn tháng</option>
                          <option value="0">all</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                      <div class="rs-select2--light rs-select2--sm">
                        <select
                          class="js-select2"
                          name="Year"
                          defaultValue={year}
                        >
                          <option selected="Year">2021</option>
                          <option selected="Year">2022</option>
                        </select>
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                    <div class="table-data__tool-right">
                      <button
                        type="xacnhan"
                        class="au-btn au-btn-icon au-btn--green au-btn--small"
                      >
                        <i class="zmdi zmdi-plus"></i>Thống kê
                      </button>

                      <div
                        class="
                    rs-select2--dark rs-select2--sm rs-select2--dark2
                  "
                      >
                        <div class="dropDownSelect2"></div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="col-lg-9">
                  <div class="table-responsive table--no-card m-b-30">
                    <table class="table table-borderless table-striped table-earning">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th class="text-right">Doanh thu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(filterData || []).map((sp, i) => (
                          <tr key={i}>
                            <td value={sp.tensanpham}>{sp.tensanpham}</td>
                            <td class="text-right" value={sp.doanhthu}>
                              {sp.doanhthu}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ThongKe;
