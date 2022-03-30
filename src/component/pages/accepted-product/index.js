import Table from "../../units/Table";
import { TableAction } from "../../units/TableAction";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert";
const AcceptedProduct = () => {
    const [orders, setOrders] = useState([]);

    const requestUrl = `${process.env.REACT_APP_API_URL}/donhang`
    console.log(requestUrl)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                requestUrl,
            );

            setOrders(result.data);
        };

        fetchData();
    }, []);


    async function handleDuyetDon(e, madonhang) {
        e.preventDefault();
        await axios("https://localhost:44369/api/donhang/xacnhan/" + madonhang, {
            method: "POST",
            credentials: 'include',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': "*"
            },
        }).then(result =>
            Swal({
                title: "Success",
                text: "Đã xác nhận đơn hàng!",
                icon: "success",
            }).then((ok) => {
                if (ok) {
                    window.location.reload();
                }
            }))
            .catch(error => Swal({
                title: "Error!",
                text: "Duyệt đơn hàng không thành công!",
                icon: "error",
            }));
    }

    const columns = ["ID", "Ngày lập đơn", "Tình trạng"];


    const actions = [
        {
            title: "Go",
            Icon: <i className="fas fa-arrow-alt-circle-right"></i>,
            className: "btn btn-success btn-sm w100 df aic jcsb",
            onClick: () => { },

            style: {
                marginBottom: 8,
            },
        },
        {
            title: "Remove",
            Icon: <i className="fas fa-trash"></i>,
            className: "btn btn-danger btn-sm w100 df aic jcsb",
            onClick: () => { },
        },
    ];

    return (
        <div className="row">
            <div className="col-md-12">
                {/* DATA TABLE */}
                <h3 className="title-5 m-b-35">Theo dõi đơn hàng</h3>
                <TableAction />
                <Table
                    columns={columns}
                    hasCheckbox={true}
                    data={orders.filter((o) => o.tinhtrangdon === "Chờ xác nhận").map((item, index) => (
                        <>
                            <td>{item.madonhang}</td>
                            <td>
                                <span className="block-email">{item.ngaylapdon}</span>
                            </td>

                            <td>
                                <button onClick={(e) => handleDuyetDon(e, item.madonhang)} className="btn btn-warning">Duyệt đơn hàng</button>
                            </td>

                        </>
                    ))}
                    actions={actions}
                />
            </div>
        </div>
    );
};

export default AcceptedProduct;
