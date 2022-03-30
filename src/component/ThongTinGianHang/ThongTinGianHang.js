import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const ThongTinGianHang = () => {
  const query = useQuery();


  const [thongtin, setthongtin] = useState(null);
  const [canhcao, setcanhcao] = useState([]);
  const [vung, setvung] = useState([]);
  const [magianhang, setmagianhang] = useState("");

  const requestUrlcc =
    "http://localhost:8080/api/gianhang/phieucanhbao/";
  const requestUrl = "http://localhost:8080/api/gianhang/";

  const requestUrlvung = "http://localhost:8080/api/gianhang/loaivung/";




  const searchOnClick = () => {
    const fetchData = async () => {
      const result = await axios(requestUrl + magianhang);
      setthongtin(result.data);
      const resultcc = await axios(requestUrlcc + magianhang);
      setcanhcao(resultcc.data);
      const resultvung = await axios(requestUrlvung + magianhang);
      setvung(resultvung.data);
    };
    fetchData();
  }

  return (
    <div class="main-content">
      <div class="container-fluid mt--7">
        <div className="row">
          <div className="form-header" style={{ minWidth: '100%', padding: 16 }}>
            <input
              className="au-input au-input--xl"
              type="text"
              placeholder="Search for datas & reports..."
              style={{ width: '-webkit-fill-available' }}
              onBlur={(e) => { setmagianhang(e.target.value) }}
            />
            <button className="au-btn--submit" onClick={searchOnClick}>
              <i className="zmdi zmdi-search" />
            </button>
          </div>
        </div>
        {thongtin && <div class="row">
          <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
            <div class="card card-profile shadow">
              <div class="row justify-content-center">
                <div class="col-lg-3 order-lg-2">
                  <div class="card-profile-image"></div>
                </div>
              </div>
              <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div class="d-flex justify-content-between"></div>
              </div>
              <div class="card-body pt-0 pt-md-4">
                <div class="row">
                  <div class="col">
                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>

                        <span
                          class="heading"
                        >
                          {thongtin.LuotTheoDoi_GH}
                        </span>
                        <span class="description">Follow</span>
                      </div>
                      <div>
                        <span class="heading">{thongtin.DanhGiaGianHang}</span>
                        <span class="description">Rating</span>
                      </div>
                      <div>
                        <span class="heading">{canhcao}</span>
                        <span class="description">Số cảnh cáo</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <h3>
                    NBShop<span class="font-weight-light"></span>
                  </h3>
                  <br></br>
                  <div>
                    <i class="ni education_hat mr-2"></i>Thuộc vùng: {vung.LoaiVung}
                  </div>
                  <br></br>
                  <div>
                    <i class="ni education_hat mr-2"></i>Trạng thái: {thongtin.TinhTrangGianHang}
                  </div>
                  <hr class="my-4"></hr>
                </div>
              </div>
            </div>
          </div>

          <div class="col-xl-8 order-xl-1">

            <div class="card bg-secondary shadow">
              <div class="card-header bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">About your shop</h3>
                  </div>
                  <div class="col-4 text-right"></div>
                </div>
              </div>
              <div class="card-body">
                <h6 class="heading-small text-muted mb-4">Shop information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-username">
                          Tên gian hàng
                        </label>
                        <td>{thongtin.TenGianHang}</td>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group focused">
                        <label
                          class="form-control-label"
                          for="input-first-name"
                        >
                          Mô tả gian hàng
                        </label>
                        <td>{thongtin.MoTaGianHang}</td>
                      </div>
                    </div>
                  </div>
                </div>

                <hr class="my-4"></hr>

                <h6 class="heading-small text-muted mb-4">Địa chỉ</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-address">
                          Số nhà
                        </label>
                        <td>{thongtin.SoNha_GH}</td>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-city">
                          Phường xã
                        </label>
                        <td> {thongtin.PhuongXa_GH}</td>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group focused">
                        <label class="form-control-label" for="input-country">
                          Quận huyện
                        </label>
                        <td>{thongtin.QuanHuyen_GH}</td>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group">
                        <label class="form-control-label" for="input-country">
                          Thành phố
                        </label>
                        <td>{thongtin.ThanhPho_GH}</td>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};
export default ThongTinGianHang;
