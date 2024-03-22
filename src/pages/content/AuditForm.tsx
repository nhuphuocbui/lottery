import React, { useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
export default function AuditForm() {

  const { register, handleSubmit, formState: { errors, isSubmitSuccessful  }, reset, setValue, watch  } = useForm();
  const { setAuditeeEmail } = useContext(GeneralContext);

  const onSubmit = async (data: any) => {
    setAuditeeEmail(data);
		if (isSubmitSuccessful) {
			alert("Submitted!");
		}
    reset();
    navigate("/content/audit_manager_form");
  };

  //back button
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/content/audit_trial");
  }
  //getting email content in react quill
	useEffect(() => {
    register("auditee_content", { required: true, minLength: 20 });
    setValue("auditee_content", editorContent || "<p>Dear all,</p><p>We hope this message finds you well. As part of our routine account audit process, we are reaching out to ensure the accurate and secure management of active accounts within our system.</p><p>It appears that your account might be up for review, and we kindly request your assistance in confirming its active use. Your account's status is currently listed for audit to maintain our records' precision and security.</p><p>To facilitate this process, we kindly ask you to access the following link within the next [timeframe] to confirm the ongoing utilization of your account:</p><p><a href=\"http://localhost:3000/content/audit_form123123\" rel=\"noopener noreferrer\" target=\"_blank\">Link</a></p><p>Your prompt action will help us ensure the continued functionality and security of our services. If you no longer require access to this account or have any concerns about its status, please use the same link to indicate your preference, and we'll proceed accordingly.</p><p>Your cooperation is greatly appreciated in this matter. Should you have any questions or require further assistance, please don't hesitate to reach out to our support team at [Support Contact Information].</p><p>Thank you for your attention to this matter.</p>");
  }, [register]);


	const onEditorStateChange = (editorState : any) => {
    setValue("auditee_content", editorState);
  };
	const editorContent = watch("auditee_content") ;

  return (
    <div className="container "  style={{boxSizing:'border-box'}}>
      <h5 className='my-3'>AUDITEE EMAIL</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3 d-flex align-items-center">
          <div className="form-label col-1 mr-3 ">
            From:
          </div>
          <input
            type="email"
            className="form-control col-7 "
            style={{ width:'80%'}}
            aria-describedby="emailHelp"
            defaultValue={"RENESAS-AUDIT@RENESAS.COM"}
            readOnly
          />
          {errors.from && <span className="text-danger ml-3">*Required</span>}
        </div>
        <div className="mb-3 d-flex align-items-center">
          <div className="form-label col-1 mr-3 ">
            To Auditees:
          </div>
          <input
            defaultValue={"an.pham.xn@renesas.com, cuong.pham.xe@renesas.com, phuoc.bui.yg@renesas.com, long.tran.xt@renesas.com, tin.dang.ym@renesas.com "}
            type="text"
            className="form-control col-7"
            style={{ width:'80%'}}
            aria-describedby="emailHelp"
            {...register('auditees_email')}
            readOnly
          />
          {errors.auditees_email && <span className="text-danger ml-3">*Required</span>}
        </div>
        <div className="mb-3 d-flex align-items-center">
          <div className="form-label col-1 mr-3 ">
            Subject:
          </div>
          <input
            type="text"
            className="form-control col-7"
            style={{ width:'80%'}}
            aria-describedby="emailHelp"
            {...register('auditee_subject', { required: true })}
            defaultValue={"Confirmation Required: Your Account Activation Status"}
          />
          {errors.auditee_subject && <span className="text-danger ml-3">*Required</span>}
        </div>
        <div className="my-3 d-flex">
          <p className="form-label col-1 overflow-hidden">
            Content:
          </p>
          <div className="col-lg-9 col-md-10 col-sm-12" aria-describedby="content">
            <ReactQuill
							theme='snow'
							value={editorContent}
        			onChange={onEditorStateChange}
						/>
          </div>
          {errors.auditee_content && <span className="text-danger ml-1">*Required</span>}
        </div>
        <div className='container d-flex mb-2'>
            <button className='btn btn-secondary mx-3' type='button' onClick={handleBack}>Back</button>
            <button type="submit" className="btn btn-primary mr-5">
                Next
            </button>
        </div>
      </form>
    </div>
  );
}
