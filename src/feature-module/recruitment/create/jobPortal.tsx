import React, { useState } from "react";
import { Form, Input, Button, DatePicker, InputNumber, Select, Switch, message, Row, Col, Card, Radio } from 'antd';

const { Option } = Select;

const JobPortalProfile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [title, setTitle] = useState('Create a job profile');

  const tabs = ["My Documents", "Profile Information", "Current Work Experience", "Previous Employment", "Education", "Language", "Job-Specific Information"];

  const handleNext = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleCancel = () => {
    setActiveTab(0); // reset to first tab
  };

  const handleSubmit = () => {
    alert("Form submitted!");
  };

  return (
    <>
      {/* Sidebar */}
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
            <div className="my-auto mb-2">
              <h2 className="mb-1">{`${title}`}</h2>
            </div>
          </div>
          <div className="job-portal-sec">
          <div className="tab-section">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`tab ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </div>
            ))}
          </div>
        {/* Content Area */}
        <div className="content">
          <h2>{tabs[activeTab]}</h2>
         
         {/* Tab-specific content */}
          {activeTab === 0 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={12}>
                <div className="resume-upload-container">
                  <label htmlFor="resume-upload" className="resume-label">
                    * Resume
                  </label>
                  <div className="upload-box">
                    <input
                      type="file"
                      id="resume-upload"
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="upload-placeholder">
                      Upload a Resume
                      <span className="upload-icon">+</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="resume-upload-container">
                  <label htmlFor="resume-upload" className="resume-label">
                    * Cover Letter
                  </label>
                  <div className="upload-box">
                    <input
                      type="file"
                      id="resume-upload"
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="upload-placeholder">
                    Attach a Cover Letter
                      <span className="upload-icon">+</span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="resume-upload-container">
                  <label htmlFor="resume-upload" className="resume-label">
                    * Additional Attachments
                  </label>
                  <div className="upload-box">
                    <input
                      type="file"
                      id="resume-upload"
                      className="file-input"
                      accept=".pdf,.doc,.docx"
                    />
                    <div className="upload-placeholder">
                    Add a Document
                      <span className="upload-icon">+</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}

          {activeTab === 1 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="middleName"
                    label="Middle Name"
                    rules={[{ message: 'Please enter middle name!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter last name!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please enter email!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="primaryPhone"
                    label="Primary Phone"
                    rules={[{ required: true, message: 'Please enter phone number!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="secondaryPhone"
                    label="Secondary Phone"
                    rules={[{ message: 'Please enter secondary phone number!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="addressLine1"
                    label="Address Line 1"
                    rules={[{ required: true, message: 'Please enter address line 1!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: 'Please enter city!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="country"
                    label="Country"
                    rules={[{ required: true, message: 'Please enter city!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="stateProvince"
                    label="State / Province"
                    rules={[{ required: true, message: 'Please enter state!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="postalcode"
                    label="Postal Code"
                    rules={[{ required: true, message: 'Please enter state!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
                <Form.Item
                    name="linkedinUrl"
                    label="Linkedin URL"
                    rules={[{ message: 'Please enter state!' }]}
                >
                    <Input />
                </Form.Item>
            </Col>
        </Row>
          )}

          {activeTab === 2 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="lastName"
                      label="Currently Employed"
                      rules={[{ required: true, message: 'Please enter Currently Employed!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ message: 'Please enter title!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="employmentStartDate"
                  label="Start Date"
                  rules={[{ message: 'Please select start date!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="employmentEndDate"
                  label="End Date"
                  rules={[{ message: 'Please select end date!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="currentlyStudent"
                      label="Currently A Student"
                      rules={[{ message: 'Please enter title!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="CompanyName"
                      label="Company Name"
                      rules={[{ message: 'Please enter Company Name!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="JobResponsibilities"
                      label="Job Responsibilities"
                      rules={[{ message: 'Please enter Job Responsibilities!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
            </Row>
          )}

          {activeTab === 3 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="previousStartDate"
                    label="Start Date"
                    rules={[{ message: 'Please select start date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="previousEndDate"
                    label="End Date"
                    rules={[{ message: 'Please select end date!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="title"
                      label="Title"
                      rules={[{ message: 'Please enter Title!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="jobResponsibility"
                      label="Job Responsibilities"
                      rules={[{ message: 'Please enter Job Responsibilities!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="companyName"
                      label="Company Name"
                      rules={[{ message: 'Please enter Company Name!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="reasonLiving"
                      label="Reason for Leaving"
                      rules={[{ message: 'Please enter reason for leaving!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
            </Row>
          )}

          {activeTab === 4 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="Degree/Diploma"
                      label="Degree/Diploma"
                      rules={[{ message: 'Please enter reason for leaving!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="otherspecify"
                      label="If Other, please specify:"
                      rules={[{ message: 'Please enter specify!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="DegreeCompleted"
                      label="Degree Completed"
                      rules={[{ message: 'Please enter Degree Completed!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="EducationalInstitution"
                      label="Educational Institution"
                      rules={[{ message: 'Please enter Educational Institution!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="Certification"
                      label="Certification"
                      rules={[{ message: 'Please enter Certification!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
            </Row>
          )}

        {activeTab === 5 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="Language"
                  label="Language"
                  rules={[{ required: true, message: "Please select Language!" }]}
                >
                  <Select placeholder="Select Language">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="NativeLanguage"
                  label="Native Language"
                  rules={[{ required: true, message: "Please select Native Language!" }]}
                >
                  <Select placeholder="Select Native Language">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="SpeakingProficiency"
                  label="Speaking Proficiency"
                  rules={[{ required: true, message: "Please select Speaking Proficiency!" }]}
                >
                  <Select placeholder="Select Speaking Proficiency">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="ReadingProficiency"
                  label="Reading Proficiency"
                  rules={[{ required: true, message: "Please select Reading Proficiency!" }]}
                >
                  <Select placeholder="Select Reading Proficiency">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name="WritingProficiency"
                  label="Writing Proficiency"
                  rules={[{ required: true, message: "Please select Writing Proficiency!" }]}
                >
                  <Select placeholder="Select Writing Proficiency">
                    <Option value="yes">Yes</Option>
                    <Option value="no">No</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          )}

        {activeTab === 6 && (
            <Row gutter={{ xs: 6, sm: 12, md: 12, lg: 12 }}>
              <Col className="gutter-row" span={24}>
                <h3>Personal Information</h3>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="previousName"
                      label="Previous Name(s) (if applicable)"
                      rules={[{ message: 'Please enter Previous Name!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                      name="PreferredName"
                      label="Preferred Name"
                      rules={[{ message: 'Please enter Preferred Name!' }]}
                  >
                      <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={24}>
                <h3>Candidate Source</h3>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="position"
                    label="How did you hear about this position?"
                    rules={[{ required: true, message: "Please select position!" }]}
                  >
                    <Select placeholder="Select position">
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="referredWhom"
                    label="If referred, by whom?"
                    rules={[{ required: true, message: "Please select position!" }]}
                  >
                    <Input />
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={24}>
                <h3>Voluntary Self-Identification</h3>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="Gender"
                    label="Gender"
                    rules={[{ required: true, message: "Please select Gender!" }]}
                  >
                    <Select placeholder="Select Gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="EthnicGroup"
                    label="Ethnic Group"
                    rules={[{ required: true, message: "Please select Ethnic Group!" }]}
                  >
                    <Select placeholder="Select Ethnic Group">
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                    name="Nativepreferredlanguage"
                    label="Native preferred language"
                    rules={[{ required: true, message: "Please select Native preferred language!" }]}
                  >
                    <Select placeholder="Select Ethnic Group">
                      <Option value="yes">Yes</Option>
                      <Option value="no">No</Option>
                    </Select>
                  </Form.Item>
              </Col>
              <Col className="gutter-row" span={24}>
                <h3>Profile and Application Sign-Off</h3>
                <p>By entering your full name in the boxes below, you are hereby agreeing that you have read and understand the APPLICATION TERMS, listed at the bottom of this application.</p>
                <p>You are also hereby agreeing that your electronic signature may be relied upon by the Company to the same extent as your handwritten signature.</p>
                <p>This application will be closed when the position for which you have applied has been filled. If you would like to be considered for any other position, you must file a new application.</p>
                <p>APPLICATION TERMSIn consideration of my application for employment being considered by Company, Inc. and its subsidiaries and affiliates (the “Company”), I agree to all of the following terms and conditions. I expressly provide the Company with my permission to make inquiries of my past employers and other relevant third parties in order to verify all information as provided by me in this application, including my response to the application questions below, and my associated candidate profile (collectively, the “Application”). I understand and agree that my personal information will be collected, verified, and processed by either the Company or its third-party provider to determine my eligibility for employment. At my request, and to the extent a third-party provider authorized by the Company is engaged to conduct a background verification check, the contact details of that third-party provider will be provided to me. I hereby release the Company from all liability whatsoever that may arise from verifying the information in this Application. I also agree to cooperate in such inquiries and release from all liability or responsibility all persons, corporations or institutions supplying such information.</p>
                <p>The Company is committed to maintaining a safe, healthful, and productive working environment for all parties having business with the Company. The Company recognizes that substance abuse by an employee will impair his or her performance and can have serious adverse effects on the safety, efficiency, and productivity of other employees and the Company as a whole. Therefore, I understand and accept the following: • In jurisdictions where permitted by law, including but not limited to the United States, Company job applicants are subject to drug testing during the course of post-offer physical examinations. • In jurisdictions where drug testing is permitted by law, any applicant refusing to participate in such testing will not be hired. • Any applicant testing positive for illegal substances will not be considered qualified for employment with the Company and may have their offer of employment withdrawn, or may have their employment terminated (where such employment has already commenced, and as allowed by applicable law).</p>
                <p>I agree that the contents of this Application (including but not limited to all of my personal information provided in the Application) may be used by the Company in whatever reasonable manner it may wish, including for evaluation purposes, and other purposes in connection with my Human Resources onboarding should I be offered employment, in accordance with the terms of company privacy policy accordance with all applicable laws including, where applicable, the General Data Protection Regulation. Should this Application result in my employment, it will not be construed to imply the existence of any employment contract for any specified period of time. I understand and agree that my employment may, to the extent enforceable by applicable laws, be terminated for any reason, and at any time, at the option of either the Company or myself in accordance with applicable laws.</p>
                <p>To the best of my knowledge, I have responded honestly to all inquiries on this Application without omission, evasion, distortion, or concealment of the truth. I understand and agree that any false or misleading answers or statements or omissions by me on this Application or on any supplement hereto, or in interviews with any company representative, regardless of when my false or misleading answers or statements or omissions are discovered, will be grounds for cancellation of this Application or, if employed, the immediate termination of my employment, where applicable by law.</p>
                <p>Company is an equal opportunity employer committed to recruiting and hiring qualified individuals in all job titles without regard to race, color, sex, age, national origin, religion, disability, genetic information, sexual orientation, gender identity, veteran status, or other categories protected by applicable law.</p>
                <Col className="gutter-row" span={12}>
                  <Form.Item
                      name="FullName"
                      label="Full Name"
                      rules={[{ message: 'Please enter Full Name!' }]}
                  >
                      <Input />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={24}>
                  <Form.Item
                    name="legallyAuthorized"
                    label="Are you legally authorized to work in the country in which the position for which you are applying resides?"
                    rules={[{ required: true, message: "Please select your employment status!" }]}
                  >
                    <Radio.Group>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col className="gutter-row" span={24}>
                  <Form.Item
                    name="companyAuthorized"
                    label=" Will you now or in the future ask Company to sponsor your work authorization?"
                    rules={[{ required: true, message: "Please select your employment status!" }]}
                  >
                    <Radio.Group>
                      <Radio value="yes">Yes</Radio>
                      <Radio value="no">No</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Col>
            </Row>
          )}
          <div className="buttons next-btn">
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
            {activeTab < tabs.length - 1 ? (
              <button onClick={handleNext} className="next-btn">Next</button>
            ) : (
              <button onClick={handleSubmit} className="submit-btn">Submit</button>
            )}
          </div>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPortalProfile;
