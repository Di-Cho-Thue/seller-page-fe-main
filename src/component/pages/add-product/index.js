import Card from "../../units/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";
const AddProductPage = () => {
  const idUser = getUserFieldFromCookieOrLocalStorage("id");
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productQuantily, setProductQuantily] = useState('');
  const navigate = useNavigate();

  const [loaisanpham, setLoaiSanPham] = useState([]);
  function randomMaSP() {
    return "SP" + (Math.floor((Math.random() * 100000000) + 1)).toString();
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        //`${process.env.REACT_APP_API_URL}/loaisanpham`,
        'http://localhost:8080/api/loaisanpham'
      );
      setLoaiSanPham(result.data);
      console.log(loaisanpham);
    };
    fetchData();
  }, []);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: 'buffer' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    return promise;

  };


  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const product = {
      MaSanPham: randomMaSP(),
      TenSanPham: productName,
      GiaSanPham: parseFloat(productPrice),
      DanhGiaSanPham: 0,
      MoTaSanPham: productDescription,
      SoLuongTon: parseInt(productQuantily),
      TinhTrangDuyet: "Đã duyệt",
      TinhTrangSanPham: "Bình thường",
      MaNhanVienDuyet: "NV001",
      LoaiSanPham: e.target.loaisp.value,//productType,
      GianHang: idUser,
      HinhAnh: productImage
    }

    console.log(product)

    await axios("http://localhost:8080/api/sanpham", {
      method: "POST",
      credentials: 'include',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: JSON.stringify(product),
    }).then(result =>
      Swal({
        title: "Success",
        text: "Create successfully !",
        icon: "success",
      }).then((ok) => {
        if (ok) {
          navigate("/add-product");
        }
      }))
      .catch(error => Swal({
        title: "Error!",
        text: "Something went wrong",
        icon: "error",
      }));

    navigate("/add-product");
  }


  const handleExcelSubmit = async (e) => {
    const file = e.target.fileExcel.files[0];
    console.log(file)
    let promise = readExcel(file)

    promise.then(async (d) => {
      console.log(d)
      await axios("http://localhost:8080/api/sanpham/file", {
        method: "POST",
        credentials: 'include',
        mode: 'no-cors',
        headers: {
          'Allow-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: d,
      }).then(result =>
        Swal({
          title: "Success",
          text: "Thêm sản phẩm từ tệp phương tiện thành công! Để kiểm tra vui lòng bấm vào gian hàng của bạn!",
          icon: "success",
        }).then((ok) => {
          if (ok) {
            navigate("/add-product");
          }
        }))
        .catch(error => Swal({
          title: "Error!",
          text: "Thêm sản phẩm từ tệp phương tiện không thành công! Vui lòng kiểm tra lại tệp của bạn",
          icon: "error",
        }));
    });

    navigate("/add-product");
  }

  const FooterActions = [
    {
      type: "submit",
      children: (
        <>
          <i className="fa fa-dot-circle-o" /> Submit
        </>
      ),
      className: "btn btn-primary btn-sm",
    },
    {
      type: "reset",
      children: (
        <>
          <i className="fa fa-ban" /> Reset
        </>
      ),
      className: "btn btn-danger btn-sm",
    },
  ];

  const handlerProductType = (newProductType) => {
    setProductType(newProductType)
  }

  function showExcelPanel() {
    document.getElementById("excel").style.display = "block";
    document.getElementById("oneProduct").style.display = "none";
  }

  function showOneProductPanel() {
    document.getElementById("excel").style.display = "none";
    document.getElementById("oneProduct").style.display = "block";
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <Card
          header={
            <>
              <strong>Thêm</strong> sản phẩm
              &emsp;
              <div style={{ display: 'inline-block', marginLeft: '50%' }}>
                <button className="btn btn-success" onClick={showExcelPanel}>Nhập excel</button>
                <button className="btn btn-warning" onClick={showOneProductPanel}>Thêm 1 sản phẩm</button>
              </div>
            </>
          }
        >

          <form
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={handleExcelSubmit}
            id="excel"
          >
            <label>Nếu bạn có nhu cầu thêm sản phẩm bằng cách tải lên tệp excel thì tệp excel của bạn
              bắt buộc phải theo đúng khuôn mẫu được đưa ra. Nếu bạn chưa có tệp excel chứa định dạng chuẩn
              được cung cấp của chúng tôi thì hãy truy cập vào đường
              <a href='https://docs.google.com/spreadsheets/d/1zLHb-IdlJdrGn1mPFyCyt1y8KJtIkI4i/edit?usp=sharing&ouid=112568726577830039251&rtpof=true&sd=true' target={"_blank"}>&emsp; <strong> link drive </strong> &emsp;</a>
              này và tải về. Xin cảm ơn vì đã sử dụng dịch vụ!</label>
            <br></br>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Chọn file excel
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="file"
                  name="fileExcel"
                  accept=".xls,.xlsx"
                  className="form-control"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Thêm sản phẩm</button>
          </form>

          <form

            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={handleProductSubmit}
            id="oneProduct"
            style={{ display: 'none' }}
          >
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Tên sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-name"
                  placeholder="Tên sản phẩm"
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Giá sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-price"
                  placeholder="Giá sản phẩm"
                  className="form-control"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="textarea-input" className=" form-control-label">
                  Mô tả sản phẩm
                </label>
              </div>
              <div className="col-12 col-md-9">
                <textarea
                  name="description"
                  id="textarea-input"
                  rows={9}
                  placeholder="Mô tả..."
                  className="form-control"
                  defaultValue={""}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label className=" form-control-label">Loại sản phẩm</label>
              </div>
              <div className="col col-md-9">
                <div className="col-sm-6 col-md-4" style={{ padding: "0" }}>
                  {/* <select id="company" class="form-control" onChange={(event) => handlerProductType(event.target.value)}
                    value={productType}>
                    <option>Select options</option>
                    {loaisanpham.map((item) => {
                      return (
                        <option key={item.maloaisanpham} value={item.maloaisanpham}>{item.tenloaisanpham}</option>
                      )
                    })}
                  </select> */}
                  <select id="company" class="form-control" name="loaisp">
                    <option>Select options</option>
                    <option value="LSP001" selected>Rau, củ, trái cây</option>
                    <option value="LSP002">Thịt, cá, hải sản</option>
                    <option value="LSP003">Đồ uống các loại</option>
                    <option value="LSP004">Sữa uống các loại</option>
                    <option value="LSP005">Mì, cháo, phở, bún</option>
                    <option value="LSP006">Dầu ăn, gia vị</option>
                    <option value="LSP007">Gạo, bột, đồ khô</option>
                    <option value="LSP008">Đồ mát, đông lạnh</option>
                    <option value="LSP009">Chăm sóc cá nhân</option>
                    <option value="LSP010">Vệ sinh nhà cửa</option>
                    <option value="LSP011">Đồ dùng gia đình</option>
                    <option value="LSP012">Tã, đồ cho bé</option>
                    <option value="LSP013">Bánh kẹo các loại</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label
                  htmlFor="file-multiple-input"
                  className=" form-control-label"
                >
                  Hình ảnh
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="images"
                  name="images"
                  placeholder="Hình ảnh"
                  className="form-control"
                  value={productImage}
                  onChange={(e) => setProductImage(e.target.value)}
                />
                {/* <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  className="form-control-file"
                /> */}
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Số lượng tồn
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-price"
                  placeholder="Số lượng tồn"
                  className="form-control"
                  value={productQuantily}
                  onChange={(e) => setProductQuantily(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">Thêm sản phẩm</button>
          </form>
        </Card>
      </div>
    </div >
  );
};

export default AddProductPage;
