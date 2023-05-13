import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table/Table";
import "./global.css";
import { API_BASE_URL } from "../apiconstants";
import { Modal } from "react-bootstrap";
import Form from "../components/Form";
import { useForm } from "react-hook-form";

const Billing = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow2(true);
    const [billID, setBillID] = useState("");
    const [action, setAction] = useState("");
    const [defaultData, setDefaultData] = useState(null);
    const [loadData, setLoadData] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [filterInfo, setFilterInfo] = useState({});

    console.log(loadData);

    const handleAdd = () => {
        setAction("add");
        setDefaultData({});
        setShow(true);
    };

    // useEffect(() => {
    //     console.log("here");
    //     getData();
    //     setLoadData(false);
    // }, [loadData]);

    useEffect(() => {
        getData(filterInfo);
        setLoadData(false);
    }, [filterInfo, loadData]);

    const getData = async (data) => {
        try {
            axios
                .post(API_BASE_URL + "/api/v1/course/list", data)
                .then((res) => {
                    if (res.data.status === true) {
                        setData(res.data.data);
                        setLoadData(true);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const getDetails = async (id) => {
        try {
            const response = await axios(
                API_BASE_URL + `/api/v1/course/details/${id}`
            );
            // console.log(response.data.data);
            let data = {
                course_name: response.data.data[0].course_name,
                course_type: response.data.data[0].course_type,
                course_credits: response.data.data[0].course_credits,
                course_duration: response.data.data[0].course_duration,
                course_teacher: response.data.data[0].course_teacher,
            };
            setDefaultData(data);
        } catch (err) {
            console.log(err);
        }
    };

    const editBilling = async (props) => {
        const id = (props?.row?.original?.id).substring(1);
        setAction("edit");
        await getDetails(id);
        setShow(true);
        setBillID(id);
    };

    const deleteBilling = (props) => {
        const id = (props?.row?.original?.id).substring(1);
        try {
            axios
                .delete(API_BASE_URL + `/api/v1/course/delete/${id}`)
                .then((res) => {
                    if (res.data.status === true) {
                        setFilterInfo({});
                        setLoadData(true);
                    }
                });
        } catch (err) {
            console.log(err);
        }
    };

    const handleReset = () => {
        reset({
            course_name: "",
            course_type: "",
            course_teacher: "",
        });
        setFilterInfo({});
        handleClose2();
    };

    // console.log(defaultData);

    const columns = [
        {
            Header: "Course ID",
            accessor: "id",
        },
        {
            Header: "Course Name",
            accessor: "course_name",
        },
        {
            Header: "Course Type",
            accessor: "course_type",
        },
        {
            Header: "Course Credit",
            accessor: "course_credits",
        },
        {
            Header: "Course Duration",
            accessor: "course_duration",
        },
        {
            Header: "Course Teacher",
            accessor: "course_teacher",
        },
        {
            Header: "Action",
            accessor: "action",
            Cell: (props) => (
                <div className="d-flex">
                    <i
                        className="fas fa-edit p-2"
                        onClick={() => editBilling(props)}
                    ></i>
                    <i
                        className="fas fa-trash p-2"
                        onClick={() => deleteBilling(props)}
                    ></i>
                </div>
            ),
        },
    ];

    const itemsPerPage = [
        {
            text: "5",
            value: 5,
        },
        {
            text: "15",
            value: 15,
        },
        {
            text: "50",
            value: 50,
        },
    ];

    const onSubmit = (data) => {
        setFilterInfo(data);
        handleClose2();
    };

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="billing-title">Course List</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    Add New
                </button>
            </div>
            <div className="d-flex align-items-center filter">
                <button className="btn btn-primary" onClick={handleShow}>
                    Filter Options
                </button>
            </div>
            <Table
                columns={columns}
                data={data && data}
                pageSize={5}
                sizePerPageList={itemsPerPage}
                isSortable={true}
                pagination={true}
                isSearchable={true}
            />

            {/* modal add*/}

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {action !== "edit" ? "Add New Course" : "Update Course"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* {action === "edit" && !Object.keys(defaultData).length ? ( */}
                    {action === "edit" && defaultData === null ? (
                        <span>Loading...</span>
                    ) : (
                        <Form
                            defaultData={defaultData}
                            action={action}
                            billID={billID}
                            setLoadData={setLoadData}
                            setShow={setShow}
                            setFilterInfo={setFilterInfo}
                            label={
                                action !== "edit"
                                    ? "Add Course"
                                    : "Update Course"
                            }
                        />
                    )}
                </Modal.Body>
            </Modal>

            {/* add model  */}

            {/* filter modal */}

            <Modal show={show2} onHide={handleClose2} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Courses</Modal.Title>
                </Modal.Header>
                <Modal.Body className="filter">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("course_type")}>
                            <option value="">Select Course Type</option>
                            <option value="optional">Optional</option>
                            <option value="compulsory">Compulsory</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Course Name"
                            {...register("course_name", {})}
                        />
                        <input
                            type="text"
                            placeholder="Teacher Name"
                            {...register("course_teacher", {})}
                        />

                        <div className="d-flex justify-content-between align-items-center gap-5">
                            <div className="w-50">
                                <input
                                    className="add-btn mt-3 p-0"
                                    type="submit"
                                    value="Filter Now"
                                    style={{ fontSize: "20px" }}
                                />
                            </div>
                            <div className="w-50">
                                <button
                                    className="w-100 reset mt-2"
                                    onClick={handleReset}
                                >
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            {/* filter modal */}
        </Layout>
    );
};

export default Billing;
