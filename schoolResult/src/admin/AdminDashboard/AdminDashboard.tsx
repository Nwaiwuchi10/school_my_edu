import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import person from "../../assets/images/people.png";
import { schoolInfo } from "../../store/Info";
import { Link, useNavigate } from "react-router-dom";
import {
  ClassApi,
  ScratchCardApi,
  UserApi,
  getAllSchools,
} from "../../APiData/Api";
import axios from "axios";
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any>([]);
  const [schools, setSchools] = useState<any>([]);

  const [staffs, setStaffs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [scratch, setScratch] = useState([]);
  const [hasReloaded, setHasReloaded] = useState<boolean>(false);

  useEffect(() => {
    const hasReloadedFromStorage = sessionStorage.getItem("hasReloaded");
    if (!hasReloadedFromStorage) {
      // Perform the reload
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload();
    } else {
      // Update the state to avoid further reloads
      setHasReloaded(true);
    }
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(UserApi);

        setStaffs(
          response.data.filter(
            (item: any) =>
              item?.schoolName._id === schoolInfo && item?.userType === "staff"
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response: any = await axios.get(getAllSchools);
        console.log(response);
        setSchools(
          response.data.filter((item: any) => item?._id === schoolInfo)
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(UserApi);

        setUsers(
          response.data.filter(
            (item: any) => item?.schoolName._id === schoolInfo
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(ScratchCardApi);

        setScratch(
          response.data.filter(
            (item: any) => item?.schoolName._id === schoolInfo
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(ClassApi);

        setClasses(
          response.data.filter(
            (item: any) => item?.schoolName._id === schoolInfo
          )
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchSchools();
  }, []);
  useEffect(() => {
    if (schools?.map((item: any) => item?.isPaid === true)) {
      navigate("/admin");
    } else if (users?.map((item: any) => item?.userType === "staff")) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, []);

  // useEffect(() => {
  //   window.location.reload();
  // }, []);

  // React.useEffect(() => {
  //   if (schoolInfo) {
  //     navigate("/admin");
  //   } else {
  //     navigate("/");
  //   }
  // }, [schoolInfo]);
  return (
    <AdminLayout>
      <div className="head-title">
        <div className="left">
          {schools?.map((item: any) => (
            <h4>{item?.name?.replace(/_/g, " ")}</h4>
          ))}

          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <i className="bx bx-chevron-right"></i>
            </li>
            <li>
              <a className="active" href="#">
                Home
              </a>
            </li>
          </ul>
        </div>
        <a href="#" className="btn-download">
          <i className="bx bxs-cloud-download"></i>
          <Link to="/admin-update">
            <span className="text">Update School Profile</span>
          </Link>
        </a>
      </div>

      <ul className="box-info">
        <li>
          <i className="bx bxs-calendar-check"></i>
          <span className="text">
            <h3>{users?.length}</h3>
            <p>Total Students</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-group"></i>
          <span className="text">
            <h3>{staffs?.length}</h3>
            <p>Total Staffs</p>
          </span>
        </li>
        <li>
          <i className="bx bxs-dollar-circle"></i>
          <span className="text">
            <h3>{scratch?.length} </h3>
            <p>Total ScratchCards</p>
          </span>
        </li>
      </ul>
      {hasReloaded ? (
        <div className="table-data">
          <div className="order">
            <div className="head">
              <h3>Students</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Student </th>
                  <th>Class</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users?.slice(0, 5).map((item: any) => (
                  <tr>
                    <td>
                      <img src={item?.passportPhoto} />
                      <p>
                        {item?.firstName} {item?.lastName}
                      </p>
                    </td>
                    <td>
                      <p>{item?.currentClass?.name}</p>
                    </td>
                    <td>
                      <span className="status completed">Completed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="todo">
            <div className="head">
              <h3>Classes</h3>
              <i className="bx bx-plus"></i>
              <i className="bx bx-filter"></i>
            </div>
            <ul className="todo-list">
              {classes
                ?.sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((item: any) => (
                  <li className="completed">
                    <p>{item?.name} </p>
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
