// import React, { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import { Link } from "react-router-dom";
// import ImageWithBasePath from "../../../core/common/imageWithBasePath";
// import { all_routes } from "../../router/all_routes";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Chart } from "primereact/chart";
// import { Calendar } from 'primereact/calendar';
// import ProjectModals from "../../../core/modals/projectModal";
// import RequestModals from "../../../core/modals/requestModal";
// import TodoModal from "../../../core/modals/todoModal";
// import CollapseHeader from "../../../core/common/collapse-header/collapse-header";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../core/data/redux/store";
// import { useNavigate } from "react-router";
// import "../../../style/css/hrms_dashboard.css"

// const AdminDashboard = () => {

//   const routes = all_routes;

//   const [isTodo, setIsTodo] = useState([false, false, false]);

//   const [date, setDate] = useState(new Date());

//   const user: any = useSelector((state: RootState) => state.user);

//   const user_role = sessionStorage.getItem("login_role");
//   //New Chart
//   const [empDepartment] = useState<any>({
//     chart: {
//       height: 235,
//       type: 'bar',
//       padding: {
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0
//       },
//       toolbar: {
//         show: false,
//       }
//     },
//     fill: {
//       colors: ['#F26522'], // Fill color for the bars
//       opacity: 1, // Adjust opacity (1 is fully opaque)
//     },
//     colors: ['#F26522'],
//     grid: {
//       borderColor: '#E5E7EB',
//       strokeDashArray: 5,
//       padding: {
//         top: -20,
//         left: 0,
//         right: 0,
//         bottom: 0
//       }
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 5,
//         horizontal: true,
//         barHeight: '35%',
//         endingShape: 'rounded'
//       }
//     },
//     dataLabels: {
//       enabled: false
//     },
//     series: [{
//       data: [80, 110, 80, 20, 60, 100],
//       name: 'Employee'
//     }],
//     xaxis: {
//       categories: ['UI/UX', 'Development', 'Management', 'HR', 'Testing', 'Marketing'],
//       labels: {
//         style: {
//           colors: '#111827',
//           fontSize: '13px',
//         }
//       }
//     }
//   })

//   const [salesIncome] = useState<any>({
//     chart: {
//       height: 290,
//       type: 'bar',
//       stacked: true,
//       toolbar: {
//         show: false,
//       }
//     },
//     colors: ['#FF6F28', '#F8F9FA'],
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//           offsetX: -10,
//           offsetY: 0
//         }
//       }
//     }],
//     plotOptions: {
//       bar: {
//         borderRadius: 5,
//         borderRadiusWhenStacked: 'all',
//         horizontal: false,
//         endingShape: 'rounded'
//       },
//     },
//     series: [{
//       name: 'Income',
//       data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80]
//     }, {
//       name: 'Expenses',
//       data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20]
//     }],
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       labels: {
//         style: {
//           colors: '#6B7280',
//           fontSize: '13px',
//         }
//       }
//     },
//     yaxis: {
//       labels: {
//         offsetX: -15,
//         style: {
//           colors: '#6B7280',
//           fontSize: '13px',
//         }
//       }
//     },
//     grid: {
//       borderColor: '#E5E7EB',
//       strokeDashArray: 5,
//       padding: {
//         left: -8,
//       },
//     },
//     legend: {
//       show: false
//     },
//     dataLabels: {
//       enabled: false // Disable data labels
//     },
//     fill: {
//       opacity: 1
//     },
//   })

//   //Attendance ChartJs
//   const [chartData, setChartData] = useState({});
//   const [chartOptions, setChartOptions] = useState({});
//   useEffect(() => {
//     const data = {
//       labels: ['Late', 'Present', 'Permission', 'Absent'],
//       datasets: [

//         {
//           label: 'Semi Donut',
//           data: [40, 20, 30, 10],
//           backgroundColor: ['#0C4B5E', '#03C95A', '#FFC107', '#E70D0D'],
//           borderWidth: 5,
//           borderRadius: 10,
//           borderColor: '#fff', // Border between segments
//           hoverBorderWidth: 0,   // Border radius for curved edges
//           cutout: '60%',
//         }
//       ]
//     };
//     const options = {
//       rotation: -100,
//       circumference: 200,
//       layout: {
//         padding: {
//           top: -20,    // Set to 0 to remove top padding
//           bottom: -20, // Set to 0 to remove bottom padding
//         }
//       },
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: false // Hide the legend
//         }
//       },
//     };

//     setChartData(data);
//     setChartOptions(options);
//   }, []);

//   //Semi Donut ChartJs
//   const [semidonutData, setSemidonutData] = useState({});
//   const [semidonutOptions, setSemidonutOptions] = useState({});
//   const toggleTodo = (index: number) => {
//     setIsTodo((prevIsTodo) => {
//       const newIsTodo = [...prevIsTodo];
//       newIsTodo[index] = !newIsTodo[index];
//       return newIsTodo;
//     });
//   };
//   useEffect(() => {

//     const data = {
//       labels: ["Ongoing", "Onhold", "Completed", "Overdue"],
//       datasets: [
//         {
//           label: 'Semi Donut',
//           data: [20, 40, 20, 10],
//           backgroundColor: ['#FFC107', '#1B84FF', '#03C95A', '#E70D0D'],
//           borderWidth: -10,
//           borderColor: 'transparent', // Border between segments
//           hoverBorderWidth: 0,   // Border radius for curved edges
//           cutout: '75%',
//           spacing: -30,
//         },
//       ],
//     };

//     const options = {
//       rotation: -100,
//       circumference: 185,
//       layout: {
//         padding: {
//           top: -20,    // Set to 0 to remove top padding
//           bottom: 20, // Set to 0 to remove bottom padding
//         }
//       },
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: false // Hide the legend
//         }
//       }, elements: {
//         arc: {
//           borderWidth: -30, // Ensure consistent overlap
//           borderRadius: 30, // Add some rounding
//         }
//       },
//     };

//     setSemidonutData(data);
//     setSemidonutOptions(options);
//   }, []);




//   return (
//     <>
//       {/* Page Wrapper */}
//       <div className="page-wrapper">
//         <div className="content">
//           {/* Breadcrumb */}
//           {/* <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
//             <div className="my-auto mb-2">
//               <h2 className="mb-1">Admin Dashboard</h2>
//               <nav>
//                 <ol className="breadcrumb mb-0">
//                   <li className="breadcrumb-item">
//                     <Link to={routes.adminDashboard}>
//                       <i className="ti ti-smart-home" />
//                     </Link>
//                   </li>
//                   <li className="breadcrumb-item">Dashboard</li>
//                   <li className="breadcrumb-item active" aria-current="page">
//                     Admin Dashboard
//                   </li>
//                 </ol>
//               </nav>
//             </div>
//             <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
//               <div className="me-2 mb-2">
//                 <div className="dropdown">
//                   <Link to="#"
//                     className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
//                     data-bs-toggle="dropdown"
//                   >
//                     <i className="ti ti-file-export me-1" />
//                     Export
//                   </Link>
//                   <ul className="dropdown-menu  dropdown-menu-end p-3">
//                     <li>
//                       <Link
//                         to="#"
//                         className="dropdown-item rounded-1"
//                       >
//                         <i className="ti ti-file-type-pdf me-1" />
//                         Export as PDF
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="#"
//                         className="dropdown-item rounded-1"
//                       >
//                         <i className="ti ti-file-type-xls me-1" />
//                         Export as Excel{" "}
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="mb-2">
//                 <div className="input-icon w-120 position-relative">
//                   <span className="input-icon-addon">
//                     <i className="ti ti-calendar text-gray-9" />
//                   </span>
//                   <Calendar value={date} onChange={(e: any) => setDate(e.value)} view="year" dateFormat="yy" className="Calendar-form" />
//                 </div>
//               </div>
//               <div className="ms-2 head-icons">
//                 <CollapseHeader />
//               </div>
//             </div>
//           </div> */}
//           {/* /Breadcrumb */}
//           {/* Welcome Wrap */}
//           <div className="welcome-banner mb-4">

//             <div>
//               <h2 className="mb-2">
//                 Welcome Back, Arun 👋
//               </h2>

//               <p className="mb-2">
//                 Software Engineer | {user_role}
//               </p>

//               <div className="welcome-info">
//                 <span>🌴 Leave Balance : 12 Days</span>
//                 <span>🟢 Present Today</span>
//               </div>
//             </div>

//             <div>
//               <div className="profile-circle">
//                 A
//               </div>
//             </div>
//           </div>
//           <div className="row g-3 mb-4">

//             <div className="col-md-3">
//               <div className="dashboard-kpi">
//                 <i className="ti ti-calendar-event"></i>
//                 <h3>12</h3>
//                 <p>Leave Balance</p>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="dashboard-kpi">
//                 <i className="ti ti-clock"></i>
//                 <h3>96%</h3>
//                 <p>Attendance</p>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="dashboard-kpi">
//                 <i className="ti ti-beach"></i>
//                 <h3>3</h3>
//                 <p>Holidays</p>
//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="dashboard-kpi">
//                 <i className="ti ti-wallet"></i>
//                 <h3>Paid</h3>
//                 <p>Payroll</p>
//               </div>
//             </div>

//           </div>
//           <div className="row g-4">

//             <div className="col-md-3">
//               <div className="module-card recruitment">

//                 <div className="module-icon">
//                   <i className="ti ti-users-group"></i>
//                 </div>

//                 <h4>Talent Hub</h4>

//                 <p>Recruitment & Hiring</p>

//                 <div className="module-hover">

//                   <Link to="#">Manage Job Hierarchy</Link>

//                   <Link to="#">Manage Position</Link>

//                   <Link to="/job-grid">
//                     Job Requisitions
//                   </Link>

//                   <Link to="#">Candidates</Link>

//                   <Link to="#">Refferals</Link>

//                 </div>

//               </div>
//             </div>

//             {user_role !== "USER" && (

//               <div className="col-md-3">

//                 <div className="module-card finance">

//                   <div className="module-icon">
//                     <i className="ti ti-cash"></i>
//                   </div>

//                   <h4>Finance Center</h4>

//                   <p>Payroll & Accounts</p>

//                   <div className="module-hover finance-menu">

//                     <div className="menu-item">
//                       <span>Sales ▶</span>

//                       <div className="dash_submenu">
//                         <Link to="#">Leads</Link>
//                         <Link to="#">Opportunity</Link>
//                         <Link to="#">Quotation</Link>
//                       </div>
//                     </div>

//                     <div className="menu-item">
//                       <span>Accounting ▶</span>

//                       <div className="dash_submenu">
//                         <Link to="#">Ledger</Link>
//                         <Link to="#">Journal</Link>
//                       </div>
//                     </div>

//                     <div className="menu-item">
//                       <span>Payroll ▶</span>

//                       <div className="dash_submenu">
//                         <Link to="#">Employee Payroll</Link>
//                         <Link to="#">Payslip</Link>
//                       </div>
//                     </div>

//                   </div>

//                 </div>

//               </div>

//             )}

//             <div className="col-md-3">
//               <div className="module-card operations">

//                 <div className="module-icon">
//                   <i className="ti ti-building"></i>
//                 </div>

//                 <h4>Operations Hub</h4>

//                 <p>Assets & Reports</p>

//                 <div className="module-hover">

//                   <Link to="#">Assets</Link>

//                   <Link to="#">Support</Link>

//                   <Link to="#">Reports</Link>

//                 </div>

//               </div>
//             </div>

//             <div className="col-md-3">
//               <div className="module-card settings">

//                 <div className="module-icon">
//                   <i className="ti ti-settings"></i>
//                 </div>

//                 <h4>Control Center</h4>

//                 <p>System Settings</p>

//                 <div className="module-hover">

//                   <Link to="#">General Settings</Link>

//                   <Link to="#">Website Settings</Link>

//                   <Link to="#">App Settings</Link>

//                 </div>

//               </div>
//             </div>

//           </div>
//           <div className="row mt-4">

//             <div className="col-md-4">
//               <div className="widget-card">

//                 <h5>🎂 Upcoming Birthdays</h5>

//                 <ul>
//                   <li>Rahul - Today</li>
//                   <li>Priya - Tomorrow</li>
//                 </ul>

//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="widget-card">

//                 <h5>📢 Announcements</h5>

//                 <p>
//                   Quarterly meeting on Friday.
//                 </p>

//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="widget-card">

//                 <h5>🗓 Upcoming Holidays</h5>

//                 <ul>
//                   <li>Independence Day</li>
//                   <li>Ganesh Chaturthi</li>
//                 </ul>

//               </div>
//             </div>

//           </div>

//         </div>
//         <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
//           <p className="mb-0">2014 - 2025 © Centram.</p>
//           <p>
//             Designed &amp; Developed By{" "}
//             <Link to="#" className="text-primary">
//               Centram
//             </Link>
//           </p>
//         </div>
//       </div>
//       {/* /Page Wrapper */}
//       <ProjectModals />
//       <RequestModals />
//       <TodoModal />
//     </>

//   );
// };

// export default AdminDashboard;



//---------------------------------------------------------

import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { all_routes } from "../../router/all_routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Chart } from "primereact/chart";
import { Calendar } from 'primereact/calendar';
import ProjectModals from "../../../core/modals/projectModal";
import RequestModals from "../../../core/modals/requestModal";
import TodoModal from "../../../core/modals/todoModal";
import CollapseHeader from "../../../core/common/collapse-header/collapse-header";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/data/redux/store";
import { useNavigate } from "react-router";

const AdminDashboard = () => {

  const routes = all_routes;

  const [isTodo, setIsTodo] = useState([false, false, false]);

  const [date, setDate] = useState(new Date());

  const user: any = useSelector((state: RootState) => state.user);

  const user_role = sessionStorage.getItem("login_role");
  //New Chart
  const [empDepartment] = useState<any>({
    chart: {
      height: 235,
      type: 'bar',
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      toolbar: {
        show: false,
      }
    },
    fill: {
      colors: ['#F26522'], // Fill color for the bars
      opacity: 1, // Adjust opacity (1 is fully opaque)
    },
    colors: ['#F26522'],
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: {
        top: -20,
        left: 0,
        right: 0,
        bottom: 0
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: true,
        barHeight: '35%',
        endingShape: 'rounded'
      }
    },
    dataLabels: {
      enabled: false
    },
    series: [{
      data: [80, 110, 80, 20, 60, 100],
      name: 'Employee'
    }],
    xaxis: {
      categories: ['UI/UX', 'Development', 'Management', 'HR', 'Testing', 'Marketing'],
      labels: {
        style: {
          colors: '#111827',
          fontSize: '13px',
        }
      }
    }
  })

  const [salesIncome] = useState<any>({
    chart: {
      height: 290,
      type: 'bar',
      stacked: true,
      toolbar: {
        show: false,
      }
    },
    colors: ['#FF6F28', '#F8F9FA'],
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        borderRadius: 5,
        borderRadiusWhenStacked: 'all',
        horizontal: false,
        endingShape: 'rounded'
      },
    },
    series: [{
      name: 'Income',
      data: [40, 30, 45, 80, 85, 90, 80, 80, 80, 85, 20, 80]
    }, {
      name: 'Expenses',
      data: [60, 70, 55, 20, 15, 10, 20, 20, 20, 15, 80, 20]
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '13px',
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: '#6B7280',
          fontSize: '13px',
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 5,
      padding: {
        left: -8,
      },
    },
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false // Disable data labels
    },
    fill: {
      opacity: 1
    },
  })

  //Attendance ChartJs
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  useEffect(() => {
    const data = {
      labels: ['Late', 'Present', 'Permission', 'Absent'],
      datasets: [

        {
          label: 'Semi Donut',
          data: [40, 20, 30, 10],
          backgroundColor: ['#0C4B5E', '#03C95A', '#FFC107', '#E70D0D'],
          borderWidth: 5,
          borderRadius: 10,
          borderColor: '#fff', // Border between segments
          hoverBorderWidth: 0,   // Border radius for curved edges
          cutout: '60%',
        }
      ]
    };
    const options = {
      rotation: -100,
      circumference: 200,
      layout: {
        padding: {
          top: -20,    // Set to 0 to remove top padding
          bottom: -20, // Set to 0 to remove bottom padding
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // Hide the legend
        }
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  //Semi Donut ChartJs
  const [semidonutData, setSemidonutData] = useState({});
  const [semidonutOptions, setSemidonutOptions] = useState({});
  const toggleTodo = (index: number) => {
    setIsTodo((prevIsTodo) => {
      const newIsTodo = [...prevIsTodo];
      newIsTodo[index] = !newIsTodo[index];
      return newIsTodo;
    });
  };
  useEffect(() => {

    const data = {
      labels: ["Ongoing", "Onhold", "Completed", "Overdue"],
      datasets: [
        {
          label: 'Semi Donut',
          data: [20, 40, 20, 10],
          backgroundColor: ['#FFC107', '#1B84FF', '#03C95A', '#E70D0D'],
          borderWidth: -10,
          borderColor: 'transparent', // Border between segments
          hoverBorderWidth: 0,   // Border radius for curved edges
          cutout: '75%',
          spacing: -30,
        },
      ],
    };

    const options = {
      rotation: -100,
      circumference: 185,
      layout: {
        padding: {
          top: -20,    // Set to 0 to remove top padding
          bottom: 20, // Set to 0 to remove bottom padding
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false // Hide the legend
        }
      }, elements: {
        arc: {
          borderWidth: -30, // Ensure consistent overlap
          borderRadius: 30, // Add some rounding
        }
      },
    };

    setSemidonutData(data);
    setSemidonutOptions(options);
  }, []);




  return (
    <>
      {/* Page Wrapper */}
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
            <div className="my-auto mb-2">
              <h2 className="mb-1">Admin Dashboard</h2>
              <nav>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <Link to={routes.adminDashboard}>
                      <i className="ti ti-smart-home" />
                    </Link>
                  </li>
                  <li className="breadcrumb-item">Dashboard</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Admin Dashboard
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap ">
              <div className="me-2 mb-2">
                <div className="dropdown">
                  <Link to="#"
                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ti ti-file-export me-1" />
                    Export
                  </Link>
                  <ul className="dropdown-menu  dropdown-menu-end p-3">
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        <i className="ti ti-file-type-pdf me-1" />
                        Export as PDF
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="#"
                        className="dropdown-item rounded-1"
                      >
                        <i className="ti ti-file-type-xls me-1" />
                        Export as Excel{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-2">
                <div className="input-icon w-120 position-relative">
                  <span className="input-icon-addon">
                    <i className="ti ti-calendar text-gray-9" />
                  </span>
                  <Calendar value={date} onChange={(e: any) => setDate(e.value)} view="year" dateFormat="yy" className="Calendar-form" />
                </div>
              </div>
              <div className="ms-2 head-icons">
                <CollapseHeader />
              </div>
            </div>
          </div>
          {/* /Breadcrumb */}
          {/* Welcome Wrap */}
          <div className="border-0">
            <div className="row">
              <div className="col-xxl-12 d-flex">
                <div className="row flex-fill">

                  <div className="col-md-3 d-flex flex-column position-relative recruitment-wrapper">
                    <div className="card flex-fill">
                      <div className="card-field bg-primary card-style text-white text-center p-3">
                        <i className="ti ti-user-star fs-1" />
                        <h4>RECRUITMENT</h4>
                      </div>
                    </div>

                    <div className="bg-primary dropdown-hover-content bg-light border rounded p-3 shadow-sm">
                      <ul className="main-submenu">
                        <li>Manage Job Profile</li>
                        <li>Manage Position</li>
                        <li> <Link to="/job-grid">Jobs Requisitions</Link>
                          {/* <ul>
                              <li>Create via Position</li>
                              <li>Create via Blank Template</li>
                            </ul> */}
                        </li>
                        <li>Candidates</li>
                        <li>Refferals</li>
                      </ul>
                    </div>
                  </div>
                  {user_role !== "USER" ?
                    <div className="col-md-3 d-flex flex-column position-relative recruitment-wrapper">
                      <div className="card flex-fill">
                        <div className="card-field bg-secondary card-style text-white text-center p-3">
                          <i className="ti ti-user-star fs-1" />
                          <h4>FINANCE & ACCOUNTS</h4>
                        </div>
                      </div>

                      <div className="bg-secondary dropdown-hover-content border rounded p-3 shadow-sm">
                        <ul className="main-submenu">
                          <li>Sales</li>
                          <li>Accounting</li>
                          <li>Payroll</li>
                        </ul>
                      </div>
                    </div>
                    : ""}
                  {/* <div className="col-md-3 d-flex">
                    <div className="card flex-fill">
                      <div className="card-field bg-secondary card-style">
                          <i className="ti ti-moneybag fs-1" />
                          <h4>FINANCE & ACCOUNTS</h4>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-md-3 d-flex flex-column position-relative recruitment-wrapper">
                    <div className="card flex-fill">
                      <div className="card-field bg-info card-style text-white text-center p-3">
                        <i className="ti ti-user-star fs-1" />
                        <h4>ADMINISTRATION</h4>
                      </div>
                    </div>

                    <div className="bg-info dropdown-hover-content border rounded p-3 shadow-sm">
                      <ul className="main-submenu">
                        <li>Assets</li>
                        <li>Helo & Support</li>
                        <li>User Management</li>
                        <li>Reports</li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="col-md-3 d-flex">
                    <div className="card flex-fill">
                      <div className="card-field bg-info card-style">
                          <i className="ti ti-users-group fs-1" />
                          <h4>ADMINISTRATION</h4>
                      </div>
                    </div>
                  </div> */}

                  <div className="col-md-3 d-flex flex-column position-relative recruitment-wrapper">
                    <div className="card flex-fill">
                      <div className="card-field bg-purple card-style text-white text-center p-3">
                        <i className="ti ti-user-star fs-1" />
                        <h4>ADMINISTRATION</h4>
                      </div>
                    </div>

                    <div className="bg-purple dropdown-hover-content border rounded p-3 shadow-sm">
                      <ul className="main-submenu">
                        <li>General Settings</li>
                        <li>Websit Settings</li>
                        <li>App Settings</li>
                        <li>System Settings</li>
                      </ul>
                    </div>
                  </div>

                  {/* <div className="col-md-3 d-flex">
                    <div className="card flex-fill">
                      <div className="card-field bg-purple card-style">
                          <i className="ti ti-settings fs-1" />
                          <h4>SETTINGS</h4>
                      </div>
                    </div>
                  </div> */}

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
          <p className="mb-0">2014 - 2025 © Centram.</p>
          <p>
            Designed &amp; Developed By{" "}
            <Link to="#" className="text-primary">
              Centram
            </Link>
          </p>
        </div>
      </div>
      {/* /Page Wrapper */}
      <ProjectModals />
      <RequestModals />
      <TodoModal />
    </>

  );
};

export default AdminDashboard;

