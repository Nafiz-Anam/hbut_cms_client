import React from "react";
import { useForm } from "react-hook-form";
import { API_BASE_URL } from "../apiconstants";
import axios from "axios";
import "../pages/global.css";

const Form = ({
    defaultData,
    action,
    billID,
    setLoadData,
    setShow,
    label,
    setFilterInfo,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ defaultValues: defaultData });

    const onSubmit = (data) => {
        // console.log("form data =>", data);
        if (action !== "edit") {
            try {
                axios
                    .post(API_BASE_URL + "/api/v1/course/add", data)
                    .then((res) => {
                        if (res.data.status === true) {
                            setFilterInfo({});
                            setLoadData(true);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
        } else {
            data.billID = billID;
            try {
                axios
                    .post(API_BASE_URL + "/api/v1/course/update", data)
                    .then((res) => {
                        if (res.data.status === true) {
                            setFilterInfo({});
                            setLoadData(true);
                        }
                    });
            } catch (err) {
                console.log(err);
            }
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
        <form className="modal-form py-1" onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("course_type", {
                        required: true,
                    })}
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
            <input className="btn add-btn mt-3" type="submit" value={label} />
        </form>
    );
};

export default Form;
