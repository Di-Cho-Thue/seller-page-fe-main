import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";
import { useState, useEffect } from "react";
import { Img } from "react-image";
const Account = (props) => {
    const [tengianhang, setTengianhang] = useState('');
    const [email, setEmail] = useState('');
    const [sdt, setSDT] = useState('');
    const [sonha, setSonha] = useState('');
    const [phuongxa, setPhuongxa] = useState('');
    const [quanhuyen, setQuanhuyen] = useState('');
    const [thanhpho, setThanhhpho] = useState('');
    const [mota, setMota] = useState('');
    const [loaigianhang, setLoaigianhang] = useState('');
    async function handleEdit(e) {
        e.preventDefault();
        let selleraccount = {
            tengianhang: e.target.tengianhang.value,
            sonha_gh: e.target.sonha_gh.value,
            phuongxa_gh: e.target.phuongxa_gh.value,
            quanhuyen_gh: e.target.quanhuyen_gh.value,
            thanhpho_gh: e.target.thanhpho_gh.value,
            motagianhang: e.target.motagianhang.value,
            sdt_gh: e.target.sdt_gh.value,
            email_gh: e.target.email_gh.value,
        }
        console.log(selleraccount);
        await axios("http://localhost:44369/api/gianhang/" + props.AccountInfo.magianhang, {
            method: "PUT",
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            data: JSON.stringify(selleraccount),
        }).then(result =>
            Swal({
                title: "Success",
                text: "Chỉnh sửa thông tin gian hàng thành công!",
                icon: "success",
            }).then((ok) => {
                if (ok) {
                    window.location.reload();
                }
            }))
            .catch(error => Swal({
                title: "Error!",
                text: "Chỉnh sửa thông tin gian hàng không thành công!",
                icon: "error",
            }));
    }

    return (
        <>
            <div className="row">
                <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                    <div className="card card-profile shadow">
                        <div className="row justify-content-center">
                            <div className="col-lg-3 order-lg-2">
                                <div className="card-profile-image">
                                    <Link to="#">
                                        {/* <Img src="images/icon/avatar-01.jpg" className="rounded-circle"></Img> */}
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-body pt-0 pt-md-4">
                            <div className="row">
                                <div className="col">
                                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span className="heading">{props.AccountInfo.luottheodoi_gh}</span>
                                            <span className="description">Người theo dõi</span>
                                        </div>
                                        <div>
                                            <span className="heading">{props.AccountInfo.danhgiagianhang}</span>
                                            <span className="description">Đánh giá</span>
                                        </div>
                                        <div>
                                            <span className="heading">89</span>
                                            <span className="description">Bình luận</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3>
                                    {props.AccountInfo.tengianhang}<span className="font-weight-light" />
                                </h3>
                                <div className="h5 font-weight-300">
                                    <i className="ni location_pin mr-2"></i>{props.AccountInfo.thanhpho_gh}
                                </div>
                                <div className="h5 mt-4">
                                    <i className="ni business_briefcase-24 mr-2"></i>{props.AccountInfo.email_gh}
                                </div>
                                <div>
                                    <i className="ni education_hat mr-2"></i>Contact me
                                </div>
                                <hr className="my-4"></hr>
                                <p value={props.AccountInfo.motagianhang}></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-8 order-xl-1">
                    <form onSubmit={handleEdit}>
                        <div className="card bg-secondary shadow">
                            <div className="card-header bg-white border-0">
                                <div className="row align-items-center">
                                    <div className="col-8">
                                        <h3 className="mb-0">Gian hàng của bạn</h3>
                                    </div>
                                    <div className="col-4 text-right">
                                        <button type="submit" className="btn btn-sm btn-primary">Chỉnh sửa</button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="heading-small text-muted mb-4">Thông tin gian hàng</h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" for="input-username">Tên gian hàng</label>
                                                <input type="text" id="input-username"
                                                    className="form-control form-control-alternative"
                                                    name="tengianhang"
                                                    placeholder="Tên gian hàng" defaultValue={props.AccountInfo.tengianhang}
                                                    onChange={(e) => setTengianhang(e.target.value)}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label className="form-control-label" for="input-email">Email</label>
                                                <input type="email" id="input-email" name="email_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Email" defaultValue={props.AccountInfo.email_gh}
                                                    onChange={(e) => setEmail(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" for="input-first-name">Mã gian hàng</label>
                                                <input type="text" id="input-first-name"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Lucky" value={props.AccountInfo.magianhang}></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label" for="input-last-name">Loại gian hàng</label>
                                                <input type="text" id="input-last-name" name="loaigianhang"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Jesse" defaultValue={props.AccountInfo.loaigianhang}
                                                    onChange={(e) => setLoaigianhang(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group focused">
                                                <label className="form-control-label"
                                                    for="input-phone">Phone</label>
                                                <input type="text" id="input-first-name" name="sdt_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="0xxx xxxx xxxx" defaultValue={props.AccountInfo.sdt_gh}
                                                    onChange={(e) => setSDT(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"></hr>
                                <h6 className="heading-small text-muted mb-4">Thông tin liên hệ</h6>
                                <div className="pl-lg-4">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group focused">
                                                <label className="form-control-label"
                                                    for="input-address">Số nhà</label>
                                                <input id="input-address" name="sonha_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                                    defaultValue={props.AccountInfo.sonha_gh}
                                                    onChange={(e) => setSonha(e.target.value)} type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <div className="form-group focused">
                                                <label className="form-control-label" for="input-city">Thành phố</label>
                                                <input type="text" id="input-city" name="thanhpho_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="New York" defaultValue={props.AccountInfo.thanhpho_gh}
                                                    onChange={(e) => setThanhhpho(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group focused">
                                                <label className="form-control-label"
                                                    for="input-country">Quận/Huyện</label>
                                                <input type="text" id="input-country" name="quanhuyen_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="United States" defaultValue={props.AccountInfo.quanhuyen_gh}
                                                    onChange={(e) => setQuanhuyen(e.target.value)}></input>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="form-group focused">
                                                <label className="form-control-label" for="input-phuongxa">Phường xã</label>
                                                <input type="text" id="input-phuongxa" name="phuongxa_gh"
                                                    className="form-control form-control-alternative"
                                                    placeholder="Phường xã" defaultValue={props.AccountInfo.phuongxa_gh}
                                                    onChange={(e) => setPhuongxa(e.target.value)}></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="my-4"></hr>
                                <h6 className="heading-small text-muted mb-4">Thông tin mô tả</h6>
                                <div className="pl-lg-4">
                                    <div className="form-group focused">
                                        <label>Mô tả về gian hàng</label>
                                        <textarea rows="4" className="form-control form-control-alternative"
                                            name="motagianhang"
                                            placeholder="A few words about your shop ..."
                                            defaultValue={props.AccountInfo.motagianhang}
                                            onChange={(e) => setMota(e.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Account;