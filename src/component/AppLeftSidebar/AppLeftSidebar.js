import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";

const AppLeftSidebar = () => {
  return (
    <aside className="menu-sidebar d-none d-lg-block">
      <div className="logo">
        <Link to="/">
          <img src="images/icon/logo.png" alt="Cool Admin" />
        </Link>
      </div>
      <div className="menu-sidebar__content ">
        <PerfectScrollbar>
          <nav className="navbar-sidebar">
            <ul className="list-unstyled navbar__list">
              <li className="active has-sub">
                <Link to="/">
                  <i className="fas fa-tachometer-alt" />
                  Tổng quan
                </Link>
              </li>
              <li>
                <Link to="/history">
                  <i className="fas fa-table" />
                  Lịch sử
                </Link>
              </li>
              <li>
                <Link to="/track-in">
                  <i className="fas fa-table" />
                  Theo dõi đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/thongke">
                  <i className="fas fa-table" />
                  Thống kê
                </Link>
              </li>
              <li>
                <Link to="/add-product">
                  <i className="fas fa-table" />
                  Thêm hàng hóa
                </Link>
              </li>
              <li>
                <Link to="/manage-account">
                  <i className="fas fa-table" />
                  Quản lý tài khoản
                </Link>
              </li>
              <li>
                <Link to="/manage-product">
                  <i className="fas fa-table" />
                  Quản lý sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/accept-product">
                  <i className="fas fa-table" />
                  Duyệt đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/close-shop">
                  <i className="fas fa-table" />
                  Khóa tài khoản
                </Link>
              </li>
            </ul>
          </nav>
        </PerfectScrollbar>
      </div>
    </aside>
  );
};

export default AppLeftSidebar;
