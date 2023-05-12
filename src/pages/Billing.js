import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Table from "../components/Table/Table";
import "./global.css";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../apiconstants";
import { Modal } from "react-bootstrap";

const Billing = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loadData, setLoadData] = useState(false);

    useEffect(() => {
        console.log("object");
        getData();
        setLoadData(false);
    }, [loadData]);

    const getData = async () => {
        console.log("ok");
        try {
            const response = await axios(API_BASE_URL + "/api/v1/course/list");
            console.log(response.data.data);
            setData(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

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
        // console.log("form data =>", data);
        try {
            axios
                .post(API_BASE_URL + "/api/v1/course/add", data)
                .then((res) => {
                    if (res.data.status === true) {
                        setLoadData(true);
                    }
                });
        } catch (err) {
            console.log(err);
        }
        reset({
            course_name: "",
            course_credits: "",
            course_duration: "",
            course_teacher: "",
        });
        setShow(false);
    };

    return (
        <Layout>
            <div className="d-flex justify-content-between align-items-center">
                <h2 className="billing-title">Course List</h2>
                <button className="btn btn-primary" onClick={handleShow}>
                    Add New
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
                    <Modal.Title>Add New Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form
                        className="modal-form py-1"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <input
                                type="text"
                                placeholder="Course Name"
                                {...register("course_name", {
                                    required: true,
                                    pattern: /[A-Za-z\s]/,
                                })}
                            />
                            {errors.course_name &&
                                errors.course_name.type === "required" && (
                                    <span className="text-danger">
                                        This field is required
                                    </span>
                                )}
                            {errors.course_name &&
                                errors.course_name.type === "pattern" && (
                                    <span className="text-danger">
                                        Name must be in alphabets
                                    </span>
                                )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Course Credit"
                                {...register("course_credits", {
                                    required: true,
                                })}
                            />
                            {errors.course_credits &&
                                errors.course_credits.type === "required" && (
                                    <span className="text-danger">
                                        This field is required
                                    </span>
                                )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Class Hours"
                                {...register("course_duration", {
                                    required: true,
                                    pattern: /[0-9]/,
                                })}
                            />
                            {errors.course_duration &&
                                errors.course_duration.type === "required" && (
                                    <span className="text-danger">
                                        This field is required
                                    </span>
                                )}
                            {errors.course_duration &&
                                errors.course_duration.type === "pattern" && (
                                    <span className="text-danger">
                                        Duration must be in numeric
                                    </span>
                                )}
                        </div>
                        <div>
                            <select
                                {...register("course_type", { required: true })}
                            >
                                <option value="compulsory">Compulsory</option>
                                <option value="optional">Optional</option>
                            </select>
                            {errors.course_type &&
                                errors.course_type.type === "required" && (
                                    <span className="text-danger">
                                        This field is required
                                    </span>
                                )}
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Course Teacher"
                                {...register("course_teacher", {
                                    required: true,
                                })}
                            />
                            {errors.course_teacher &&
                                errors.course_teacher.type === "required" && (
                                    <span className="text-danger">
                                        This field is required
                                    </span>
                                )}
                        </div>
                        <input
                            className="btn add-btn mt-3"
                            type="submit"
                            value="Add Course"
                        />
                    </form>
                </Modal.Body>
            </Modal>

            {/* add model  */}
        </Layout>
    );
};

export default Billing;
