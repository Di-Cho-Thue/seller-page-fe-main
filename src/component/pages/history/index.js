import Table from "../../units/Table";
import { TableAction } from "../../units/TableAction";

const HistoryPage = () => {
  const columns = ["name", "email", "description", "date", "status", "price"];

  const data = [
    <>
      <td>Lori Lynch</td>
      <td>
        <span className="block-email">lori@example.com</span>
      </td>
      <td className="desc">Samsung S8 Black</td>
      <td>2018-09-27 02:12</td>
      <td>
        <span className="status--process">Processed</span>
      </td>
      <td>$679.00</td>
    </>,
  ];

  const actions = [
    {
      title: "Go",
      Icon: <i className="fas fa-arrow-alt-circle-right"></i>,
      className: "btn btn-success btn-sm w100 df aic jcsb",
      onClick: () => {},

      style: {
        marginBottom: 8,
      },
    },
    {
      title: "Remove",
      Icon: <i className="fas fa-trash"></i>,
      className: "btn btn-danger btn-sm w100 df aic jcsb",
      onClick: () => {},
    },
  ];

  return (
    <div className="row">
      <div className="col-md-12">
        {/* DATA TABLE */}
        <h3 className="title-5 m-b-35">data table</h3>
        <TableAction />
        <Table
          columns={columns}
          hasCheckbox={true}
          data={data}
          actions={actions}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
