import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import { getUserFieldFromCookieOrLocalStorage } from "../../utils/localStorage";
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const GiayTo = (props) => {
  const query = useQuery();
  const [loaigiayto, setloaigiayto] = useState(null);
  const [filterData, setfilterData] = useState([]);
  const [cookies] = useCookies(["dichoho"]);
  useEffect(async () => {
    const loaigiayto = query.get("Loaigiayto");

    setloaigiayto(loaigiayto || "All");
    const result = await axios({
      url:
        "https://localhost:44369/api/gianhang/giayto/" +
        getUserFieldFromCookieOrLocalStorage("id") +
        "/" +
        loaigiayto,
      method: "GET",
      credentials: "include",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    setfilterData(result.data || []);
  }, []);

  async function handleGiayTo(e) {
    e.preventDefault();
  }

  return (
    <div>
      <div>
        <div class="main-content">
          <div class="section__content section__content--p30">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-12">
                  <h3
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    class="title-5 m-b-35"
                  >
                    Thông tin giấy tờ
                  </h3>
                  <div class="table-data__tool">
                    <form onXacNhan={handleGiayTo} style={{ display: 'flex' }}>
                      <div class="table-data__tool-left" style={{ marginRight: 150 }}>
                        <div class="rs-select2--light rs-select2--md">
                          <select
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            class="js-select2"
                            name="Loaigiayto"
                            defaultValue={loaigiayto}
                          >
                            <option selected="Loaigiayto">
                              Chọn loại giấy tờ
                            </option>
                            <option value="All">All</option>
                            <option value="Nguồn gốc sản phẩm">
                              Nguồn gốc sản phẩm
                            </option>
                            <option value="Giấy phép kinh doanh">
                              Giấy phép kinh doanh
                            </option>
                            <option value="Xét nghiệm covid">
                              Xét nghiệm covid
                            </option>
                            <option value="Chứng nhận an toàn thực phẩm">
                              Chứng nhận an toàn thực phẩm
                            </option>
                          </select>
                          <div class="dropDownSelect2"></div>
                        </div>
                      </div>
                      <div class="table-data__tool-right">
                        <button
                          type="xem"
                          class="au-btn au-btn-icon au-btn--green au-btn--small"
                        >
                          <i class="zmdi zmdi-plus"></i>Xem
                        </button>

                        <div class="rs-select2--dark rs-select2--sm rs-select2--dark2">
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
                            <th
                              style={{
                                color: "black",
                                background: "blue",
                              }}
                            >
                              Mã giấy tờ
                            </th>
                            <th
                              style={{
                                color: "black",
                                background: "blue",
                              }}
                            >
                              Loại giấy tờ
                            </th>
                            <th
                              style={{
                                color: "black",
                                background: "blue",
                              }}
                              class="text-right"
                            >
                              Hình ảnh
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(filterData || []).map((sp, i) => (
                            <tr key={i}>
                              <td value={sp.magiayto}>{sp.magiayto}</td>
                              <td value={sp.loaigiayto}>{sp.loaigiayto}</td>
                              <td class="text-right" value={sp.hinhanh}>
                                {sp.hinhanh}
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
    </div>
  );
};
export default GiayTo;
