import PropTypes from "prop-types";
import Button from "../units/Button";
import "../../assets/materials/css/Table.css";

const Table = ({ columns = [], hasCheckbox, data = [], actions = [] }) => {
  return (
    <div className="table-responsive table-responsive-data2">
      <table className="table table-data2">
        <thead>
          <tr>
            {hasCheckbox && (
              <td style={{ padding: "14px 0px 0px 30px" }}>
                <div className="df aic jcc">
                  <div className="checkbox">
                    <label style={{ fontSize: "1em" }}>
                      <input type="checkbox" value="" />
                      <span className="cr">
                        <i className="cr-icon fa fa-check"></i>
                      </span>
                    </label>
                  </div>
                </div>
              </td>
            )}
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {hasCheckbox && (
                <td>
                  <div className="df aic jcc" style={{ marginTop: 24 }}>
                    <div className="checkbox">
                      <label style={{ fontSize: "1em" }}>
                        <input type="checkbox" value="" />
                        <span className="cr">
                          <i className="cr-icon fa fa-check"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                </td>
              )}
              {item}
              {actions.length && (
                <td>
                  {actions.map((item, index) => {
                    return (
                      <Button
                        size={"small"}
                        key={index}
                        className={item.className}
                        data-toggle="tooltip"
                        data-placement="top"
                        title={item.title}
                        onClick={item.onClick}
                        style={{ ...item.style }}
                        {...item.props}
                      >
                        {item.Icon}
                      </Button>
                    );
                  })}
                </td>
              )}
              <tr className="spacer" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  hasCheckbox: PropTypes.bool,
  data: PropTypes.array.isRequired,
  actions: PropTypes.array,
};

export default Table;
