import Table from "../../units/Table";
import classnames from "classnames";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useRef } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const OverviewCard = ({ text, number, Icon, className, chartProps }) => {
  const chartRef = useRef(null);

  return (
    <div className="col-sm-6 col-lg-3">
      <div className={classnames("overview-item", className)}>
        <div className="overview__inner">
          <div className="overview-box clearfix">
            <div className="icon">{Icon}</div>
            <div className="text">
              <h2>{number}</h2>
              <span>{text}</span>
            </div>
          </div>
          <div className="overview-chart">
            <Chart ref={chartRef} {...chartProps} />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatisticsPage = () => {
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
      className: "btn-success",
      onClick: () => {},
    },
    {
      title: "Remove",
      Icon: <i className="fas fa-trash"></i>,
      className: "btn-danger",
      onClick: () => {},
    },
  ];

  const overviewItem = [
    {
      text: "Total Profit",
      number: "5,830,00",
      Icon: <i className="fas fa-dollar-sign"></i>,
      className: "overview-item--c1",
      chartProps: {
        type: "line",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          type: "line",
          datasets: [
            {
              data: [78, 81, 80, 45, 34, 12, 40],
              label: "Dataset",
              backgroundColor: "rgba(255,255,255,.1)",
              borderColor: "rgba(255,255,255,.55)",
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: false,
            },
          },
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },

          elements: {
            line: {
              borderWidth: 0,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
            },
          },
        },
      },
    },
    {
      text: "Total Users",
      number: "4,900",
      Icon: <i className="fas fa-user-friends"></i>,
      className: "overview-item--c2",
      chartProps: {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          type: "line",
          datasets: [
            {
              data: [1, 18, 9, 17, 34, 22],
              label: "Dataset",
              backgroundColor: "transparent",
              borderColor: "rgba(255,255,255,.55)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
            title: {
              display: false,
            },
          },
          responsive: true,
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  display: false,
                },
              },
            ],
          },

          elements: {
            line: {
              tension: 0.00001,
              borderWidth: 1,
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4,
            },
          },
        },
      },
    },
    {
      text: "Total Orders",
      number: "3,567",
      Icon: <i className="fas fa-shopping-cart"></i>,
      className: "overview-item--c3",
      chartProps: {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          type: "line",
          datasets: [
            {
              data: [65, 59, 84, 84, 51, 55],
              label: "Dataset",
              backgroundColor: "transparent",
              borderColor: "rgba(255,255,255,.55)",
            },
          ],
        },
        options: {
          maintainAspectRatio: false,

          responsive: true,

          scales: {
            xAxes: [
              {
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  display: false,
                },
              },
            ],
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
            title: {
              display: false,
            },
          },
          elements: {
            line: {
              borderWidth: 1,
            },
            point: {
              radius: 4,
              hitRadius: 10,
              hoverRadius: 4,
            },
          },
        },
      },
    },
    {
      text: "Total Sales",
      number: "967",
      Icon: <i className="fas fa-chart-line"></i>,
      className: "overview-item--c4",
      chartProps: {
        type: "bar",
        data: {
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
          datasets: [
            {
              label: "My First dataset",
              data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
              borderColor: "transparent",
              borderWidth: "0",
              backgroundColor: "rgba(255,255,255,.3)",
            },
          ],
        },
        options: {
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
            title: {
              display: false,
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        },
      },
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="overview-wrap">
            <h2 className="title-1">overview</h2>
            <button className="au-btn au-btn-icon au-btn--blue">
              <i className="zmdi zmdi-plus" />
              add item
            </button>
          </div>
        </div>
      </div>
      <div className="row m-t-25">
        {overviewItem.map((item, index) => (
          <OverviewCard
            className={item.className}
            key={index}
            text={item.text}
            number={item.number}
            Icon={item.Icon}
            chartProps={item.chartProps}
          />
        ))}
      </div>
      <Table columns={columns} actions={actions} data={data} />
    </>
  );
};

export default StatisticsPage;
