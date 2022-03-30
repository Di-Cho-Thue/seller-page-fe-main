import "./App.css";

import "./assets/materials/css/theme.css";
import "./assets/materials/vendor/mdi-font/css/material-design-iconic-font.min.css";

import "react-perfect-scrollbar/dist/css/styles.css";

import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./component/pages/history";
import StatisticPage from "./component/pages/statistics";
import AddProductPage from "./component/pages/add-product";
import SignUpPage from "./component/pages/signup";
import SignInPage from "./component/pages/signin";
import RegisterPage from "./component/pages/register";
import TrackIn from "./component/pages/track-in";
import ManageAccountPage from "./component/pages/manage-account";
import CloseShopPage from "./component/pages/close-shop";
import ThongTinGianHangPage from "./component/pages/thongtin";
import ManageProductPage from "./component/pages/manage-product";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AcceptedProduct from "./component/pages/accepted-product";
import ThongKePage from "./component/pages/thongke";
import GiayTo from "./component/GiayTo/GiayTo";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <div>
          {/* Required meta tags*/}
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {/* Main CSS*/}
          <MainLayout>
            <Routes>
              <Route path="/history" element={<HistoryPage />}></Route>
              <Route path="/track-in" element={<TrackIn />}></Route>
              <Route path="/statistics" element={<StatisticPage />}></Route>
              <Route path="/add-product" element={<AddProductPage />}></Route>
              <Route path="/manage-account" element={<ManageAccountPage />}></Route>
              <Route path="/close-shop" element={<CloseShopPage />}></Route>
              <Route path="/manage-product" element={<ManageProductPage />}></Route>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/signin" element={<SignInPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/thongtin" element={<ThongTinGianHangPage />}></Route>
              <Route path="/accept-product" element={<AcceptedProduct />}></Route>
              <Route path="/thongke" element={<ThongKePage />}></Route>
              <Route path="/giayto" element={<GiayTo />}></Route>
            </Routes>
          </MainLayout>
        </div>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
