import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography, FormHelperText, Snackbar, Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import Swal from "sweetalert";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import { APIPost } from "../../../api/axios/method";
import { getUserFieldFromCookieOrLocalStorage, setUserFieldToLocalStorage } from "../../../utils/localStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { SHIPPER_ACTIVE_STATE, SHIPPER_REQUEST_STATE } from "../../utils/constant";

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const regexCM = /[0-9]{9}/
function randomMaGH() {
    return "GH" + (Math.floor((Math.random() * 100000) + 1)).toString();
}
const schema = yup.object().shape({
    TenGianHang: yup.string().required("Tên không được để trống"),
    MSDN_NguoiBan: yup.string().required("Mã số doanh nghiệp không được để trống"),
    Email_GH: yup.string().email("Nhập đúng định dạng email").required("Email không được để trống"),
    LoaiGianHang: yup.string().required("Loại gian hàng không được để trống"),
    SoNha_GH: yup.string().required("Số nhà không được để trống"),
    PhuongXa_GH: yup.string().required("Phường xã không được để trống"),
    QuanHuyen_GH: yup.string().required("Quận huyện không được để trống"),
    ThanhPho_GH: yup.string().required("Thành phố không được để trống"),
    SDT_GH: yup.string().trim().matches(regex, "Số điện thoại không hợp lệ").test('len', '9 - 10 số', val => val.length === 10).required("Số điện thoại không được để trống"),
    GiayToCovid: yup.string().url("Hãy nhập vào địa chỉ chứa giấy tờ").required("Giấy tờ covid không được để trống"),
    GiayToSanPham: yup.string().url("Hãy nhập vào địa chỉ chứa giấy tờ sản phẩm").required("Giấy tờ sản phẩm không được để trống"),
    MoTaGianHang: yup.string()
})


const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    const [openSnackbar, setopenSnackbar] = useState(false);
    const [isSubmittingError, setisSubmittingError] = useState(true);
    const [submitting, setsubmitting] = useState(false);
    const navigate = useNavigate()

    const submit = async (data) => {
        try {
            setsubmitting(true);
            const apiData = { ...data, MaGianHang: randomMaGH(), DanhGia_NGH: 0, TinhTrangDuyet: "Chưa duyệt", TinhTrangHoatDong: "Dừng hoạt động" }
            const result = await APIPost({ url: "/gianhang/signup", apiData })
            if (result.status === 200 || result.status === 201) {
                const username = getUserFieldFromCookieOrLocalStorage("username");

                const result2 = await axios(`http://localhost:8080/api/auth/update`, {
                    method: "POST",
                    credentials: 'include',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    data: JSON.stringify({ username: username, id: result.data.MaGianHang })
                })

                if (result2.status === 200 || result2.status === 201) {
                    setUserFieldToLocalStorage("id", result2.data.id);
                    setisSubmittingError(false)
                    navigate("/manage-account")
                }
                else throw new Error("Lỗi khi đăng ký")


            }
            else {
                throw new Error("Lỗi khi đăng ký")
            }

        } catch (error) {
            setisSubmittingError(true)

        }
        finally {
            setopenSnackbar(true)
            setsubmitting(false);

        }
    }


    console.log("🚀 ~ file: index.js ~ line 78 ~ SignUpPage ~ getValues()", getValues())
    console.log("🚀 ~ file: index.js ~ line 249 ~ SignUpPage ~ Object.keys(getValues()).length ", Object.keys(getValues()).length)

    return (
        <>
            <Paper component={'form'} onSubmit={handleSubmit(submit)} style={{ padding: 24, maxWidth: 1000, margin: 'auto' }} className="df fdc aic w100">
                <Typography variant="h5" component="h3">
                    Đăng ký bán hàng
                </Typography>
                <Box my={3} className="df aic fdc w100">
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        helperText={errors?.HoTen_NGH?.message || ""}
                        error={Boolean(errors?.HoTen_NGH)}
                        placeholder="Tên gian hàng của bạn"
                        label="Tên gian hàng"
                        {...register("TenGianHang")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        placeholder="Nhập mã số doanh nghiệp"
                        label="Mã số doanh nghiệp"
                        {...register("MSDN_NguoiBan")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        placeholder="Nhập email để liên lạc với gian hàng"
                        label="Email gian hàng"
                        {...register("Email_GH")}
                    />
                    <Controller
                        control={control}
                        name="LoaiGianHang"
                        render={({
                            field: { onChange, onBlur, value, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => {
                            return (
                                <FormControl error={!!invalid} fullWidth color="primary"
                                    style={{ margin: "8px 0px" }}

                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label" >Loại gian hàng</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        onChange={value => {

                                            onChange(value.target.defaultValue)
                                        }}
                                        value={value || ""}
                                        defaultValue={"Cá nhân"}

                                    >
                                        <FormControlLabel value="LGH52" control={<Radio />} label="Siêu thị" />
                                        <FormControlLabel value="LGH76" control={<Radio />} label="Tạp hóa" />
                                        <FormControlLabel value="LGH27" control={<Radio />} label="Hội từ thiện" />
                                        <FormControlLabel value="LGH21" control={<Radio />} label="Cá nhân" />
                                    </RadioGroup>
                                    <FormHelperText>{error}</FormHelperText>
                                </FormControl>
                            );
                        }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.SoNha_GH?.message || ""}
                        error={Boolean(errors?.SoNha_GH)}
                        placeholder="Số nhà nơi gian hàng cư trú"
                        {...register("SoNha_GH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.PhuongXa_GH?.message || ""}
                        error={Boolean(errors?.PhuongXa_GH)}
                        placeholder="Phường xã nơi gian hàng cư trú"
                        {...register("PhuongXa_GH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.QuanHuyen_GH?.message || ""}
                        error={Boolean(errors?.QuanHuyen_GH)}
                        placeholder="Quận huyện nơi gian hàng cư trú"
                        {...register("QuanHuyen_GH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.ThanhPho_GH?.message || ""}
                        error={Boolean(errors?.ThanhPho_GH)}
                        placeholder="Thành phố nơi gian hàng cư trú"
                        {...register("ThanhPho_GH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.SDT_GH?.message || ""}
                        error={Boolean(errors?.SDT_GH)}
                        placeholder="Số điện thoại của gian hàng"
                        {...register("SDT_GH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.GiayToCovid?.message || ""}
                        error={Boolean(errors?.GiayToCovid)}
                        placeholder="Link thư mục drive chứa giấy tờ âm tính Covid-19 của bạn"
                        {...register("GiayToCovid")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.GiayToSanPham?.message || ""}
                        error={Boolean(errors?.GiayToSanPham)}
                        placeholder="Link chứa giấy tờ sản phẩm của bạn"
                        {...register("GiayToSanPham")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.GiayXacNhanAmTinh?.message || ""}
                        error={Boolean(errors?.GiayXacNhanAmTinh)}
                        placeholder="Nhập vào mô tả cho gian hàng của bạn"
                        {...register("MoTaGianHang")}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={submitting || Object.keys(errors).length > 0 || Object.keys(getValues()).length === 0}
                    type="submit"
                >
                    Đăng ký
                </Button>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setopenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setopenSnackbar(false)} severity={isSubmittingError ? "error" : "success"} sx={{ width: '100%' }}>
                    {isSubmittingError ? "Có lỗi xảy ra, vui lòng thử lại sau!" : "Đã đăng ký giao hàng thành công!"}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SignUpPage;