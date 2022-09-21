import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import { Menu, Dropdown } from "antd";
import {
    SearchOutlined,
    MessageOutlined,
    BellOutlined,
    UserOutlined,
    LockOutlined,
    LogoutOutlined,
} from "@ant-design/icons";
import "./header.scss";

function Header() {
    const navigate = useNavigate();
    const { logoutUser } = useAppContext();
    const handleLogout = () => {
        logoutUser();
        navigate("/login");
    };
    const menu = () => {
        return (
            <Menu class="header-menu">
                <Menu.Item key="1" className="header-menu__item">
                    <UserOutlined className="icon"/>
                    <a to="/">Thông tin cá nhân</a>
                </Menu.Item>
                <Menu.Item key="2" className="header-menu__item">
                    <LockOutlined className="icon"/>
                    <a to="/">Đổi mật khẩu</a>
                </Menu.Item>
                <Menu.Item
                    key="3"
                    onClick={handleLogout}
                    className="header-menu__item"
                >
                    <LogoutOutlined className="icon"/>
                    Đăng xuất
                </Menu.Item>
            </Menu>
        );
    };

    return (
        <div className="header-container">
            <h2 className="col-4">
                <a href="/">DuongGanhTeam</a>
            </h2>
            <div className="header-container__center col-4">
                <SearchOutlined />
                <input type="text" placeholder="Tìm kiếm" />
            </div>
            <div className="header-container__right col-4">
                <div className="header-container__right__item">
                    <MessageOutlined className="header-container__right__item__icon" />
                    <div className="header-container__right__item__notification">
                        <div className="position-relative">
                            <span>1</span>
                        </div>
                    </div>
                </div>
                <div className="header-container__right__item">
                    <BellOutlined className="header-container__right__item__icon" />
                    <div className="header-container__right__item__notification">
                        <div className="position-relative">
                            <span>12</span>
                        </div>
                    </div>
                </div>
                <Dropdown overlay={menu} trigger={["click"]}>
                    <div className="avatar">
                        <img src="https://thumbs.dreamstime.com/b/lonely-elephant-against-sunset-beautiful-sun-clouds-savannah-serengeti-national-park-africa-tanzania-artistic-imag-image-106950644.jpg" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
export default Header;
