import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert";
const CloseShop = (props) => {

    async function handleConfirm(e) {
        e.preventDefault();
        let product = {
            LiDo: e.target.ratio.value + '. ' +e.target.reason.value,
            MaGianHang: props.product.masanpham
            // DonGia: props.product.giasanpham,
        }

        await axios("http://localhost:8080/api/nghiban/", {
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
                text: "Biểu mẫu đã được gửi đi. Xin lỗi về sự bất tiện mà bạn gặp phải! Chúng tôi rất mong bạn có thể quay lại sớm, bạn luôn là một đối tác quan trọng của chúng tôi! Một lần nữa, xin cảm ơn vì đã đồng hành cùng chúng tôi! Chúc bạn có một ngày vui vẻ!",
                icon: "success",
            }).then((ok) => {
                if (ok) {
                    window.location.reload();
                }
            }))
            .catch(error => Swal({
                title: "Error!",
                text: "Biểu mẫu gửi đi không thành công! Vui lòng thử lại!",
                icon: "error",
            }));
    }

    return (
        <>
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal" onSubmit={handleConfirm}>
                            <div class="card-header">
                                <strong>Bạn muốn tạm khóa gian hàng của mình?</strong>
                            </div>
                            <div class="card-body card-block">

                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label class=" form-control-label">Hãy chọn một lí do khiến bạn muốn tạm khóa gian hàng</label>
                                    </div>
                                    <div class="col col-md-9">
                                        <div class="form-check-inline form-check">
                                            <ul>
                                                <>
                                                    <label for="food" class="form-check-label ">
                                                        <input type="radio" id="food" name="radio" value="Tôi không có thời gian quản lý gian hàng" class="form-check-input">
                                                        </input>Tôi không có thời gian quản lý gian hàng
                                                    </label>
                                                    <br></br>
                                                </>
                                                <>
                                                    <label for="clothes" class="form-check-label ">
                                                        <input type="radio" id="food" name="radio" value="Tôi có các vấn đề cá nhân" class="form-check-input">
                                                        </input>Tôi có các vấn đề cá nhân
                                                    </label>
                                                    <br></br>
                                                </>
                                                <>
                                                    <label for="vegetable" class="form-check-label ">
                                                        <input type="radio" id="food" name="radio" value="Tôi gặp vấn đề với nguồn cung cấp sản phẩm của mình" class="form-check-input">
                                                        </input>Tôi gặp vấn đề với nguồn cung cấp sản phẩm của mình
                                                    </label>
                                                </>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">Bạn có thể cho chúng tôi biết thêm về lí do tạm khóa gian hàng? Để chúng tôi có thể cải thiện dịch vụ tốt hơn trong tương lai</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <textarea name="reason" id="textarea-input" rows="9" placeholder="Nhập vào lí do bạn tạm khóa gian hàng..." class="form-control"></textarea>
                                    </div>
                                </div>
                                &emsp;<label>Khi bạn gửi thông tin này đi, hệ thống sẽ tạm khóa gian hàng của bạn, cũng như hủy các đơn hàng mà gian hàng của bạn đang giao dịch với khách hàng (trừ những đơn đang vận chuyển).
                                    Nếu bạn muốn mở lại tài khoản gian hàng của mình, rất đơn giản, bạn chỉ cần đăng nhập lại vào tài khoản,
                                    nhưng theo chính sách của chúng tôi, bạn không thể đăng nhập vào tài khoản gian hàng trong vòng 60 ngày kể từ ngày tạm khóa gian hàng.
                                    Vì vậy, hãy suy nghĩ thật kĩ trước khi gửi những thông tin này đi. Xin cảm ơn!</label>

                            </div>
                            <div class="card-footer">
                                <button type="submit" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#staticModal">
                                    <i class="fa fa-dot-circle-o"></i> Xác nhận
                                </button>
                                <button type="reset" class="btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i> Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

            <div class="modal fade" id="staticModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true"
                data-backdrop="static">
                <div class="modal-dialog modal-sm" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticModalLabel">Confirm Information</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>
                                Form has been submitted. Sorry about the inconvenience you experienced! We'd love to see you back soon, because you've always been a part of our community!
                                Once again, thank you for being with us! Have a good day!
                            </p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CloseShop;