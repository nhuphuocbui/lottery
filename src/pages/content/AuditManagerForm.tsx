import React, {useContext, useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useForm} from 'react-hook-form';
import ApiService from '../../services/api-service';
import {useNavigate} from 'react-router-dom';
import {GeneralContext} from '../../context/GeneralContext';
import Toast from '../../utils/notification';

export default function AuditManagerForm() {
    const {register, handleSubmit, formState: {errors}, reset, setValue, watch} = useForm();
    const [content, setContent] = useState('');
    const {duration, auditeeEmail} = useContext(GeneralContext);
    useEffect(() => {
        let date = new Date();
        let formattedDateTime =
            date.getFullYear() +
            "-" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "-" +
            ("0" + date.getDate()).slice(-2) +
            " " +
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2) +
            ":" +
            ("0" + date.getSeconds()).slice(-2);

        console.log("Date_sent: " + formattedDateTime);

        setValue("managers_email", ["terry.quinlivan.df@gr.renesas.com"]);
        setValue("date_sent", formattedDateTime);
        setValue("duration", parseInt(duration));
        setValue("reminder_period", 1);
        setValue("auditee_subject", auditeeEmail.auditee_subject);
        setValue("auditee_content", auditeeEmail.auditee_content);
    }, [setValue]);

    const onSubmit = async (data: any) => {

        console.log(data);
        ApiService.sendEmail(data);

        Toast.notifySuccess("Email sent!!!");
        reset();
        navigate("/content/audit_trial")
    };

    //back button
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/content/audit_form");
    }
    //getting email content in react quill
    useEffect(() => {
        register("manager_content", {required: true, minLength: 20});
        setValue("manager_content", editorContent || "<p>Dear all,</p><p>I hope this message finds you well.</p><p>I wanted to inform you that your team members have diligently submitted their confirmations for the usergroups as part of our ongoing audit process. We greatly appreciate their prompt response and cooperation in ensuring the accuracy of our records.</p><p>Your approval is the final step needed to complete this audit process. Once we receive your confirmation, we'll be able to conclude this phase and proceed accordingly through this <a href=\"http://localhost:3000/12331\" rel=\"noopener noreferrer\" target=\"_blank\">link</a>.</p><p>Should you require any further details or have any queries regarding the submissions, please feel free to reach out. Your timely approval will enable us to swiftly finalize this audit.</p><p>Thank you for your attention to this matter. Your support is instrumental in maintaining the integrity and efficiency of our processes.</p><p>Looking forward to your prompt approval.</p><p>Best regards,</p>");

    }, [register]);
    const onEditorStateChange = (editorState: any) => {
        setValue("manager_content", editorState);
    };
    const editorContent = watch("manager_content");

    return (
        <div className="container">
            <h5 className="my-3">MANAGER EMAIL</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3 d-flex align-items-center">
                    <div className="form-label col-1 mr-3 ">From:</div>
                    <input
                        type="email"
                        className="form-control col-7"
                        aria-describedby="emailHelp"
                        defaultValue={"RENESAS-AUDIT@RENESAS.COM"}
                        readOnly
                    />
                    {errors.from && <span className="text-danger ml-3">*Required</span>}{" "}
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <div className="form-label col-1 mr-3 ">To managers:</div>
                    <input
                        defaultValue={
                            "terry.quinlivan.df@gr.renesas.com"
                        }
                        type="email"
                        className="form-control col-7 "
                        aria-describedby="emailHelp"
                        {...register("managers_email")}
                        readOnly
                    />
                    {errors.managers_email && <span className="text-danger ml-3">*Required</span>}
                </div>
                <div className="mb-3 d-flex align-items-center">
                    <div className="form-label col-1 mr-3 ">Subject:</div>
                    <input
                        type="text"
                        className="form-control col-7"
                        aria-describedby="emailHelp"
                        {...register("manager_subject", {required: true})}
                        defaultValue={
                            "Confirmation Required: Check Your Employee Account Activation Status"
                        }
                    />
                    {errors.manager_subject && (
                        <span className="text-danger ml-3">*Required</span>
                    )}
                </div>
                <div className="my-4 d-flex">
                    <p className="form-label col-1 overflow-hidden">Content:</p>
                    <div
                        className="col-lg-9 col-md-10 col-sm-12"
                        aria-describedby="content"
                    >
                        <ReactQuill
                            theme="snow"
                            value={editorContent}
                            onChange={onEditorStateChange}
                        />
                    </div>
                    {errors.manager_content && (
                        <span className="text-danger ml-1">*Required</span>
                    )}
                </div>
                <div className="container d-flex">
                    <button
                        className="btn btn-secondary mr-3"
                        type="button"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                    <button type="submit" className="btn btn-primary mx-3">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
