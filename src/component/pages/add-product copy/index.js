import Card from "../../units/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { Link } from "react-router-dom";

const AddProductPage = () => {

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
      TinhTrangDuyet: "???? duy???t",
      TinhTrangSanPham: "B??nh th?????ng",
      MaNhanVienDuyet: "NV001",
      LoaiSanPham: 'LSP001',//productType,
      GianHang: "GH82200",
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
        text: "Create new pool successfully !",
        icon: "success",
      }).then((ok) => {
        if (ok) {
          navigate("/add-product");
        }
      }))
      .catch (error => Swal({
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

    promise.then( async (d) => {
      console.log(d)
      await axios("http://localhost:8080/api/sanpham/file", {
        method: "POST",
        credentials: 'include',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: d,
      }).then(result =>
        Swal({
          title: "Success",
          text: "Th??m s???n ph???m t??? t???p ph????ng ti???n th??nh c??ng! ????? ki???m tra vui l??ng b???m v??o gian h??ng c???a b???n!",
          icon: "success",
        }).then((ok) => {
          if (ok) {
            navigate("/add-product");
          }
        }))
        .catch(error => Swal({
          title: "Error!",
          text: "Th??m s???n ph???m t??? t???p ph????ng ti???n kh??ng th??nh c??ng! Vui l??ng ki???m tra l???i t???p c???a b???n",
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
              <strong>Th??m</strong> s???n ph???m
              &emsp; 
              <div style={{ display: 'inline-block', marginLeft:'50%' }}>
                <button className="btn btn-success" onClick={showExcelPanel}>Nh???p excel</button>
                <button className="btn btn-warning" onClick={showOneProductPanel}>Th??m 1 s???n ph???m</button>
              </div>
            </>
          }
        >

          <form
            action
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={handleExcelSubmit}
            id="excel"
          >
          <label>N???u b???n c?? nhu c???u th??m s???n ph???m b???ng c??ch t???i l??n t???p excel th?? t???p excel c???a b???n
          b???t bu???c ph???i theo ????ng khu??n m???u ???????c ????a ra. N???u b???n ch??a c?? t???p excel ch???a ?????nh d???ng chu???n
          ???????c cung c???p c???a ch??ng t??i th?? h??y truy c???p v??o ???????ng   
          <Link to='https://docs.google.com/spreadsheets/d/1zLHb-IdlJdrGn1mPFyCyt1y8KJtIkI4i/edit?usp=sharing&ouid=112568726577830039251&rtpof=true&sd=true'>&emsp; <strong> link drive </strong> &emsp;</Link>
           n??y v?? t???i v???. Xin c???m ??n v?? ???? s??? d???ng d???ch v???!</label>
           <br></br>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Ch???n file excel
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
            <button type="submit" className="btn btn-primary btn-sm">Th??m s???n ph???m</button>
          </form>

          <form
            action
            method="post"
            encType="multipart/form-data"
            className="form-horizontal"
            onSubmit={handleProductSubmit}
            id="oneProduct"
            style={{display: 'none'}}
          >
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  T??n s???n ph???m
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-name"
                  placeholder="T??n s???n ph???m"
                  className="form-control"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="text-input" className=" form-control-label">
                  Gi?? s???n ph???m
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-price"
                  placeholder="Gi?? s???n ph???m"
                  className="form-control"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label htmlFor="textarea-input" className=" form-control-label">
                  M?? t??? s???n ph???m
                </label>
              </div>
              <div className="col-12 col-md-9">
                <textarea
                  name="description"
                  id="textarea-input"
                  rows={9}
                  placeholder="M?? t???..."
                  className="form-control"
                  defaultValue={""}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="row form-group">
              <div className="col col-md-3">
                <label className=" form-control-label">Lo???i s???n ph???m</label>
              </div>
              <div className="col col-md-9">
                <div className="col-sm-6 col-md-4" style={{ padding: "0" }}>
                  <select id="company" class="form-control" onChange={(event) => handlerProductType(event.target.value)}
                    value={productType}>
                    <option>Select options</option>
                    {loaisanpham.map((item) => {
                      return (
                        <option key={item.maloaisanpham} value={item.maloaisanpham}>{item.tenloaisanpham}</option>
                      )
                    })}
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
                  H??nh ???nh
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="images"
                  name="images"
                  placeholder="H??nh ???nh"
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
                  S??? l?????ng t???n
                </label>
              </div>
              <div className="col-12 col-md-9">
                <input
                  type="text"
                  id="text-input"
                  name="product-price"
                  placeholder="S??? l?????ng t???n"
                  className="form-control"
                  value={productQuantily}
                  onChange={(e) => setProductQuantily(e.target.value)}
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-sm">Th??m s???n ph???m</button>
          </form>
        </Card>
      </div>
    </div >
  );
};

export default AddProductPage;
