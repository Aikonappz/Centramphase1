import React, { useEffect, useState } from 'react';
import "./Budget_Allocate.scss";
import { Link } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header/collapse-header";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../core/data/redux/store';
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";


const Budget_Allocate = () => {
    interface BudgetFilters {
        organisationId: number | null;
        businessUnitId: number | null;
        divisionId: number | null;
        departmentId: number | null;
    }

    const [filters, setFilters] = useState<BudgetFilters>({
        organisationId: null,
        businessUnitId: null,
        divisionId: null,
        departmentId: null,
    });

    const [allOrganisations, setAllOrganisations] = useState<any[]>([]);
    const [allBusinessUnits, setAllBusinessUnits] = useState<any[]>([]);
    const [allDivisions, setAllDivisions] = useState<any[]>([]);
    const [allDepartments, setAllDepartments] = useState<any[]>([]);

    const [organisationOptions, setOrganisationOptions] = useState<any[]>([]);
    const [businessUnitOptions, setBusinessUnitOptions] = useState<any[]>([]);
    const [divisionOptions, setDivisionOptions] = useState<any[]>([]);
    const [departmentOptions, setDepartmentOptions] = useState<any[]>([]);

    const jobs: any = useSelector((state: RootState) => state.jobs) || [];

    useEffect(() => {
        if (jobs?.organisation?.content) {
            setAllOrganisations(jobs.organisation.content);
            setOrganisationOptions(
                jobs.organisation.content.map((org: any) => ({
                    label: org.code
                        ? `${org.name} (${org.code})`
                        : org.name,
                    value: org.id
                }))
            );
        }

        if (jobs?.businessUnit?.content) {
            setAllBusinessUnits(jobs.businessUnit.content);
        }

        if (jobs?.division?.content) {
            setAllDivisions(jobs.division.content);
        }

        if (jobs?.department?.content) {
            setAllDepartments(jobs.department.content);
        }
    }, [jobs]);

    const handleOrganisationChange = (orgId: number) => {
        setFilters(prev => ({
            ...prev,
            organisationId: orgId,
            businessUnitId: null,
            divisionId: null,
            departmentId: null
        }));

        setDivisionOptions([]);
        setDepartmentOptions([]);

        const filteredBU = allBusinessUnits.filter(
            bu => bu.mapperId === orgId
        );

        setBusinessUnitOptions(
            filteredBU.map((bu: any) => ({
                label: bu.code
                    ? `${bu.name} (${bu.code})`
                    : bu.name,
                value: bu.id
            }))
        );
    };

    const handleBusinessUnitChange = (businessUnitId: number) => {
        setFilters(prev => ({
            ...prev,
            businessUnitId,
            divisionId: null,
            departmentId: null
        }));
        setDepartmentOptions([]);
        const filteredDivisions = allDivisions.filter(
            div => div.mapperId === businessUnitId
        );
        setDivisionOptions(
            filteredDivisions.map((div: any) => ({
                label: div.code
                    ? `${div.name} (${div.code})`
                    : div.name,
                value: div.id
            }))
        );
    };

    const handleDivisionChange = (divisionId: number) => {
        setFilters(prev => ({
            ...prev,
            divisionId,
            departmentId: null
        }));

        const filteredDepartments = allDepartments.filter(
            dep => dep.mapperId === divisionId
        );
        setDepartmentOptions(
            filteredDepartments.map((dep: any) => ({
                label: dep.code
                    ? `${dep.name} (${dep.code})`
                    : dep.name,
                value: dep.id
            }))
        );
    };

    const handleDepartmentChange = (departmentId: number) => {
        setFilters(prev => ({
            ...prev,
            departmentId
        }));
    };

    const totalBudget = 1000000;
    const allocatedBudget = 600000;
    const remainingBudget = totalBudget - allocatedBudget;

    const budgetSeries = [
        allocatedBudget,
        remainingBudget
    ];

    const budgetOptions: ApexOptions = {
        chart: {
            type: "donut"
        },
        labels: [
            "Allocated",
            "Remaining"
        ],
        colors: [
            "#F97316",
            "#22C55E"
        ],
        legend: {
            position: "bottom"
        },
        dataLabels: {
            enabled: true
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "70%",
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: "Total",
                            formatter: () => `₹${totalBudget.toLocaleString()}`
                        }
                    }
                }
            }
        }
    };

    return (

        <div className="page-wrapper">

            <div className="content">

                {/* Breadcrumb */}

                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-4">

                    <div className="my-auto">

                        <h2 className="mb-1">Budget Allocation</h2>

                        <nav>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <Link to={all_routes.adminDashboard}>
                                        <i className="ti ti-smart-home"></i>
                                    </Link>
                                </li>

                                <li className="breadcrumb-item">
                                    Recruitment
                                </li>

                                <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                >
                                    Budget Allocation
                                </li>
                            </ol>
                        </nav>

                    </div>

                    <div className="head-icons">
                        <CollapseHeader />
                    </div>

                </div>

                {/* Main Section */}

                <div className="budget-page">

                    <div className="row g-4 w-100">

                        {/* Left Form */}

                        <div className="col-xl-8">

                            <div className="budget-form-card">

                                <div className="allocation-header">

                                    <div>

                                        <h3>Budget Allocation</h3>

                                        <p>
                                            Allocate department budgets across your organization hierarchy
                                        </p>

                                    </div>

                                    <div className="allocation-badge">
                                        <i className="ti ti-cash"></i>
                                    </div>

                                </div>

                                <div className="row">

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-building me-2"></i>
                                            Organization
                                        </label>

                                        <select
                                            className="form-control budget-select"
                                            value={filters.organisationId ?? ""}
                                            onChange={(e) =>
                                                handleOrganisationChange(Number(e.target.value))
                                            }
                                        >
                                            <option value="">
                                                Select Organization
                                            </option>
                                            {organisationOptions.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-sitemap me-2"></i>
                                            Business Unit
                                        </label>

                                        <select
                                            className="form-control budget-select"
                                            value={filters.businessUnitId ?? ""}
                                            onChange={(e) =>
                                                handleBusinessUnitChange(Number(e.target.value))
                                            }
                                        >
                                            <option value="">
                                                Select Business Unit
                                            </option>
                                            {businessUnitOptions.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-git-branch me-2"></i>
                                            Division
                                        </label>

                                        <select
                                            className="form-control budget-select"
                                            value={filters.divisionId ?? ""}
                                            onChange={(e) =>
                                                handleDivisionChange(Number(e.target.value))
                                            }
                                        >
                                            <option value="">
                                                Select Division
                                            </option>
                                            {divisionOptions.map((item) => (

                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-users-group me-2"></i>
                                            Department
                                        </label>

                                        <select
                                            className="form-control budget-select"
                                            value={filters.departmentId ?? ""}
                                            onChange={(e) =>
                                                handleDepartmentChange(Number(e.target.value))
                                            }
                                        >

                                            <option value="">
                                                Select Department
                                            </option>

                                            {departmentOptions.map((item) => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-currency-rupee me-2"></i>
                                            Currency
                                        </label>

                                        <select className="form-control budget-select">
                                            <option>INR</option>
                                            <option>USD</option>
                                            <option>EUR</option>
                                        </select>

                                    </div>

                                    <div className="col-md-6 mb-4">

                                        <label>
                                            <i className="ti ti-wallet me-2"></i>
                                            Budget Amount
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control budget-select"
                                            placeholder="Enter Budget Amount"
                                        />

                                    </div>

                                    <div className="col-12">

                                        <label>
                                            <i className="ti ti-file-description me-2"></i>
                                            Description
                                        </label>

                                        <textarea
                                            rows={4}
                                            className="form-control budget-textarea"
                                            placeholder="Enter Budget Allocation Description"
                                        ></textarea>

                                    </div>

                                </div>

                                <div className="budget-actions">

                                    <button className="btn btn-light">
                                        Cancel
                                    </button>

                                    <button className="btn btn-budget">
                                        Save Allocation
                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* Right Chart */}

                        <div className="col-xl-4">

                            <div className="budget-chart-card">

                                <h5>Budget Overview</h5>

                                <ReactApexChart
                                    options={budgetOptions}
                                    series={budgetSeries}
                                    type="donut"
                                    height={320}
                                />

                                <div className="budget-summary">

                                    <div>
                                        <span>Total Budget</span>
                                        <h6>₹10,00,000</h6>
                                    </div>

                                    <div>
                                        <span>Allocated</span>
                                        <h6 className="allocated">
                                            ₹6,50,000
                                        </h6>
                                    </div>

                                    <div>
                                        <span>Remaining</span>
                                        <h6 className="remaining">
                                            ₹3,50,000
                                        </h6>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">

                <p className="mb-0">
                    2014 - 2025 © Centram.
                </p>

                <p>
                    Designed & Developed By
                    <Link
                        to="#"
                        className="text-primary ms-1"
                    >
                        Centram
                    </Link>
                </p>

            </div>

        </div>

    );
};

export default Budget_Allocate;