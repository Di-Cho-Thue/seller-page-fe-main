import Card from "../units/Card";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Img } from "react-image";
import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { useState, useEffect } from "react";

const ManageProduct = (props) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productType, setProductType] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productQuantily, setProductQuantily] = useState('');
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [product, setProduct] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const rowEvents = (e, row) => {
        console.log(row);
        setModalInfo(row);
        TogleTrueFalse();
    };

    const rowRemoveEvent = async (e, row) => {
        //title:'Bạn chắc chắc muốn xóa sản phẩm này chứ? Hãy cân nhắc cẩn thẩn vì sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống!',
        await axios("https://localhost:44369/api/sanpham/removeproduct/" + row.masanpham, {
            method: "PUT",
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: row.masanpham,
        }).then(result =>
            Swal({
                title: "Success",
                text: "Xóa sản phẩm thành công! Để kiểm tra vui lòng vào gian hàng của bạn!",
                icon: "success",
            }).then((ok) => {
                if (ok) {
                    window.location.reload();
                }
            }))
            .catch(error => Swal({
                title: "Error!",
                text: "Xóa sản phẩm không thành công! Vui lòng thử lại!",
                icon: "error",
            }));

        window.location.reload();
    };

    const TogleTrueFalse = () => {
        setShowModal(handleShow);
    };

    const ModalContent = () => {
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalInfo.masanpham}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleEdit}>
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
                                    name="productname"
                                    placeholder="Tên sản phẩm"
                                    className="form-control"
                                    defaultValue={modalInfo.tensanpham}
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
                                    name="productprice"
                                    placeholder="Giá sản phẩm"
                                    className="form-control"
                                    defaultValue={modalInfo.giasanpham}
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
                                    name="productdescription"
                                    rows={9}
                                    placeholder="Mô tả..."
                                    className="form-control"
                                    defaultValue={""}
                                    defaultValue={modalInfo.motasanpham}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col col-md-3">
                                <label
                                    htmlFor="file-multiple-input"
                                    className=" form-control-label">
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
                                    defaultValue={modalInfo.hinhanh}
                                />
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
                                    name="productamount"
                                    placeholder="Số lượng tồn"
                                    className="form-control"
                                    defaultValue={modalInfo.soluongton}
                                />
                            </div>
                        </div>
                        <Button variant="info" type="submit">Lưu thay đổi</Button>
                        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    };

    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const product = {
            MaSanPham: "ABC4",
            TenSanPham: productName,
            GiaSanPham: parseFloat(productPrice),
            DanhGiaSanPham: 0,
            MoTaSanPham: productDescription,
            SoLuongTon: parseInt(productQuantily),
            TinhTrangDuyet: "Đã duyệt",
            TinhTrangSanPham: "Bình thường",
            MaNhanVienDuyet: "NV001",
            LoaiSanPham: productType,
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

    function showExcelPanel() {
        document.getElementById("excel").style.display = "block";
        document.getElementById("oneProduct").style.display = "none";
    }

    function showOneProductPanel() {
        document.getElementById("excel").style.display = "none";
        document.getElementById("oneProduct").style.display = "block";
    }

    async function handleEdit(e) {
        e.preventDefault();
        const product = {
            tensanpham: e.target.productname.value,
            giasanpham: parseFloat(e.target.productprice.value),
            motasanpham: e.target.productdescription.value,
            soluongton: parseInt(e.target.productamount.value),
            loaisanpham: modalInfo.loaisanpham,
            hinhanh: e.target.images.value
        }
        console.log(product)
        await axios("https://localhost:44369/api/sanpham/" + modalInfo.masanpham, {
            method: "PUT",
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: JSON.stringify(product),
        }).then(result =>
            Swal({
                title: "Success",
                text: "Chỉnh sửa sản phẩm thành công! Để kiểm tra vui lòng vào gian hàng của bạn!",
                icon: "success",
            }).then((ok) => {
                if (ok) {
                    window.location.reload();
                }
            }))
            .catch(error => {
                console.log(error);
                Swal({
                    title: "Error!",
                    text: "Chỉnh sửa sản phẩm không thành công! Vui lòng thử lại!",
                    icon: "error",
                });
            });

        //   window.location.reload();//
    }

    async function handleExcelEdit(e) {
        e.preventDefault();

        const file = e.target.fileExcel.files[0];
        let promise = readExcel(file)

        promise.then(async (d) => {
            console.log(d)
            await axios("https://localhost:44369/api/sanpham/updatefile", {
                method: "PUT",
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: d,
            }).then(result =>
                Swal({
                    title: "Success",
                    text: "Chỉnh sửa thông tin sản phẩm từ tệp phương tiện thành công! Để kiểm tra vui lòng bấm vào gian hàng của bạn!",
                    icon: "success",
                }).then((ok) => {
                    if (ok) {
                        window.location.reload();
                    }
                }))
                .catch(error => Swal({
                    title: "Error!",
                    text: "Chỉnh sửa thông tin sản phẩm từ tệp phương tiện không thành công! Vui lòng kiểm tra lại tệp của bạn",
                    icon: "error",
                }));
        });
    }

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
        console.log(csvData);
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <div className="card">
            <Card
                header={
                    <>
                        <strong>Sản phẩm</strong> của bạn
                        &emsp;
                        <div style={{ display: 'inline-block', marginLeft: '55%' }}>
                            <button className="btn btn-success" onClick={showExcelPanel}>Chỉnh sửa dùng excel</button>
                            <button className="btn btn-warning" onClick={showOneProductPanel}>Chỉnh sửa sản phẩm</button>
                        </div>
                    </>
                }
            >
                <div
                    action
                    encType="multipart/form-data"
                    className="form-horizontal"
                    id="oneProduct"
                >
                    <div style={{ display: 'inline-block', marginLeft: '0%' }}>
                        <button
                            variant="warning"
                            onClick={(e) => exportToCSV((props.sellerproducts || []).map((productItem) => {
                                const objectReturn = {}
                                Object.keys(productItem).forEach((key) => {
                                    if (["maloaisanpham", "loaiSanPham", "chiTietDonHang", "magianhang", "gianHang", "tinhtrangduyet", 'manhanvienduyet'].includes(key)) {
                                        return
                                    }
                                    objectReturn[key] = productItem[key]
                                })
                                return objectReturn

                            }), "SanPham")}
                            className="btn btn-sm btn-primary">Tải file excel toàn bộ sản phẩm</button>
                    </div>
                    <div className="table-responsive m-b-40">
                        <div className="col-4 text-right">
                        </div>
                        <table className="table table-borderless table-data3" name="datatable">
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá thành</th>
                                    <th>Tình trạng sản phẩm</th>
                                    <th>Số lượng tồn</th>
                                    <th>Loại sản phẩm</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.sellerproducts.map((product) =>
                                (
                                    <tr key={product.masanpham}>
                                        <td>
                                            <Img src={`${product.hinhanh}`} style={{
                                                backgroundImage: "url(" + `${product.hinhanh}` + ")",
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                height: '70px',
                                                width: '70px'
                                            }}
                                            ></Img>
                                        </td>
                                        <td>{product.tensanpham}</td>
                                        <td>{product.giasanpham}</td>
                                        <td className="process">{product.tinhtrangsanpham}</td>
                                        <td>{product.soluongton}</td>
                                        <td>{product.loaisanpham}</td>
                                        <td>
                                            <button type="button" className="btn btn-success btn-sm w100 df aic jcsb" data-toggle="tooltip" data-placement="top" style={{ marginBottom: '8px' }} onClick={(e) => rowEvents(e, product)}>
                                                Edit<i className="fas fa-arrow-alt-circle-right"></i></button>
                                            <button type="button" className="btn btn-danger btn-sm w100 df aic jcsb"
                                                data-toggle="tooltip" data-placement="top" onClick={(e) => rowRemoveEvent(e, product)}>Remove <i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {show ? <ModalContent /> : null}
                </div>

                <form onSubmit={handleExcelEdit}
                    action
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                    id="excel"
                    style={{ display: 'none' }}>
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
                    <button type="submit" className="btn btn-primary btn-sm">Chỉnh sửa sản phẩm</button>
                </form>
            </Card >
        </div >
    );
};
export default ManageProduct;