import React from "react";
import classes from "./admin.module.scss";

const Admin = () => {
  return (
    <div className={classes.manage}>
      <div className={classes.header}>
        <div className={classes.headerTop}>
          <div className={classes.logo}>
            <h2>LOGO</h2>
            <h2>Quản lí người dùng</h2>
          </div>
          <div className={classes.logout}>
            <button>
              <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </div>
        <div className={classes.headerBottom}>
          <div className={classes.left}>
            <input type="text" placeholder="Tìm kiếm" />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className={classes.right}>
            <button className={classes.reset}>
              <i className="fas fa-undo-alt"></i>Reset
            </button>
            <button className={classes.addUser}>
              <i className="fas fa-user-plus"></i>Thêm người dùng
            </button>
          </div>
        </div>
      </div>
      <div className={classes.body}>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>ID</th>
              <th>Họ và tên</th>
              <th>Giới tính</th>
              <th>Số điện thoại</th>
              <th>Khóa tài khoản</th>
              <th>Xóa tài khoản</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1111</td>
              <td>Họ và tên</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>
                <button>
                  <i class="far fa-trash-alt"></i>Xóa
                </button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1111</td>
              <td>Họ và tên</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>
                <button>
                  <i class="far fa-trash-alt"></i>Xóa
                </button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>1111</td>
              <td>Họ và tên</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
            <tr>
              <td>2</td>
              <td>2222ID</td>
              <td>Thái</td>
              <td>Giới tính</td>
              <td>Số điện thoại</td>
              <td>Khóa tài khoản</td>
              <td>Xóa tài khoản</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
