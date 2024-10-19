import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJobForms } from "../store/slices/JobSlices";
import '../styles/createJobForms.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CreateJob = () => {
    const dispatch = useDispatch();
    const salaryCurrency = ['dollar', 'rupee', 'euro', 'yen'];
    const totalDurationMode = ['month', 'year', 'full-time'];
    const salaryMode = ['per-hour', 'per-day', 'per-month', 'per-annum'];
    const locationMode = ['on-site', 'remote'];
    const [showPreview, setShowPreview] = useState(false);
    const [requiredSkills, setRequiredSkills] = useState([]);
    const [requiredSkill, setRequiredSkill] = useState('');
    const [jobApplication, setJobApplication] = useState({
        jobRole: '',
        jobLocation: '',
        jobLocationType: '',
        company: '',
        requiredSkills: [],
        totalDuration: {
            value: '',
            mode: ''
        },
        workingHours: {
            value: '',
            mode: 'hour',
        },
        salary: {
            value: '',
            currency: '',
            mode: '',
        },
        jobDescription: '',
    });

    const handleJobChange = (event) => {
        const { name, value } = event.target;
        setJobApplication(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSalaryChange = (event) => {
        const { name, value } = event.target;
        setJobApplication(prev => ({
            ...prev,
            salary: {
                ...prev.salary,
                [name]: value,
            },
        }));
    };

    const handleTotalDurationChange = (event) => {
        const { name, value } = event.target;
        setJobApplication(prev => ({
            ...prev,
            totalDuration: {
                ...prev.totalDuration,
                [name]: value,
            },
        }));
    };

    const handlePerDayDurationChange = (event) => {
        const { name, value } = event.target;
        setJobApplication(prev => ({
            ...prev,
            workingHours: {
                ...prev.workingHours,
                [name]: value,
            },
        }));
    };

    const handleRequiredSkillChange = (event) => {
        setRequiredSkill(event.target.value);
    };

    const handleAddSkill = () => {
        if (requiredSkill.trim()) {
            setRequiredSkills(prev => [...prev, requiredSkill.trim()]);
            setJobApplication(prev => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, requiredSkill.trim()],
            }));
            setRequiredSkill('');
        }
    };

    const removeSkill = (index) => {
        setRequiredSkills(prev => {
            const updatedSkills = [...prev];
            updatedSkills.splice(index, 1);
            return updatedSkills;
        });
        setJobApplication(prev => ({
            ...prev,
            requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = () => {
        try {
            if (!jobApplication.jobRole || !jobApplication.jobDescription || !jobApplication.company || !jobApplication.jobLocation || !jobApplication.jobLocationType) {
                alert("Please fill out all required fields.");
                return;
            }

            dispatch(createJobForms({
                content: jobApplication,
            }));
            setJobApplication({
                jobRole: '',
                jobLocation: '',
                jobLocationType: '',
                company: '',
                requiredSkills: [],
                totalDuration: {
                    value: '',
                    mode: ''
                },
                workingHours: {
                    value: '',
                    mode: 'hour',
                },
                salary: {
                    value: '',
                    currency: '',
                    mode: '',
                },
                jobDescription: '',
            });
            setRequiredSkills([]);
            setShowPreview(false);
        } catch (error) {
            console.error("An error occurred while submitting the job application:", error);
        }
    };

    return (
        <div className="create-form-container">
            <div>
                {!showPreview && (
                    <>
                        <div className="create-select">
                            <div className="create-form-control">
                                <label className="create-form-label">Job Role</label>
                                <input
                                    type="text"
                                    name="jobRole"
                                    value={jobApplication.jobRole}
                                    onChange={handleJobChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>

                            <div className="create-form-control">
                                <label className="create-form-label">Company</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={jobApplication.company}
                                    onChange={handleJobChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>
                        </div>

                        <div className="create-select">
                            <div className="create-form-control">
                                <label className="create-form-label">Job Location</label>
                                <input
                                    type="text"
                                    name="jobLocation"
                                    value={jobApplication.jobLocation}
                                    onChange={handleJobChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>
                            <div className="create-form-control">
                                <label className="create-form-label">Location Mode</label>
                                <select
                                    name="jobLocationType"
                                    value={jobApplication.jobLocationType}
                                    onChange={handleJobChange}
                                    className="create-form-select"
                                    required
                                >
                                    <option value="">Select location mode</option>
                                    {locationMode.map(mode => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="create-skills-form-control">
                            <label className="create-form-label">Choose Required skills</label>
                            <div className="create-requiredskills-flex">
                                <input
                                    type="text"
                                    name="jobSkill"
                                    value={requiredSkill}
                                    onChange={handleRequiredSkillChange}
                                    className="create-role-loc-form"
                                    onKeyDown={(e) => { e.key === 'Enter' && handleAddSkill(e) }}
                                />
                                <AddIcon onClick={handleAddSkill} className="create-add-skill-button" />
                            </div>
                        </div>
                        {
                            requiredSkills.length > 0 &&
                            <div className="create-form-selectedSkills">
                                {
                                    requiredSkills.map((skill, index) => (
                                        <div key={index} className="create-form-selected-skill">
                                            <span className="create-form-selected-skill-text">
                                                {skill}
                                            </span>
                                            <RemoveCircleOutlineIcon className="create-remove-skill" onClick={() => removeSkill(index)} />
                                        </div>
                                    ))
                                }
                            </div>
                        }
                        <div className="create-desc-form-control">
                            <label className="create-form-label">Description</label>
                            <textarea
                                name="jobDescription"
                                value={jobApplication.jobDescription}
                                onChange={handleJobChange}
                                required
                                className="create-desc-form-textarea"
                            />
                        </div>

                        <div className="create-select">
                            <div className="create-form-control">
                                <label className="create-form-label">Salary Amount</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={jobApplication.salary.value}
                                    onChange={handleSalaryChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>
                            <div className="create-form-control">
                                <label className="create-form-label">Salary Currency</label>
                                <select
                                    name="currency"
                                    value={jobApplication.salary.currency}
                                    onChange={handleSalaryChange}
                                    className="create-form-select"
                                    required
                                >
                                    <option value="">Select currency</option>
                                    {salaryCurrency.map(currency => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="create-form-control">
                                <label className="create-form-label">Salary Mode</label>
                                <select
                                    name="mode"
                                    value={jobApplication.salary.mode}
                                    onChange={handleSalaryChange}
                                    className="create-form-select"
                                    required
                                >
                                    <option value="">Select salary mode</option>
                                    {salaryMode.map(mode => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="create-select">
                            <div className="create-form-control">
                                <label className="create-form-label">Total Duration</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={jobApplication.totalDuration.value}
                                    onChange={handleTotalDurationChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>
                            <div className="create-form-control">
                                <label className="create-form-label">Total Duration Mode</label>
                                <select
                                    name="mode"
                                    value={jobApplication.totalDuration.mode}
                                    onChange={handleTotalDurationChange}
                                    className="create-form-select"
                                    required
                                >
                                    <option value="">Select duration mode</option>
                                    {totalDurationMode.map(mode => (
                                        <option key={mode} value={mode}>{mode}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="create-select">
                            <div className="create-form-control">
                                <label className="create-form-label">Duration per Day</label>
                                <input
                                    type="text"
                                    name="value"
                                    value={jobApplication.workingHours.value}
                                    onChange={handlePerDayDurationChange}
                                    required
                                    className="create-role-loc-form"
                                />
                            </div>
                            <div className="create-form-control">
                                <label className="create-form-label">Duration Mode</label>
                                <input
                                    type="text"
                                    name="mode"
                                    value='hour'
                                    onChange={handlePerDayDurationChange}
                                    required
                                    className="create-role-loc-form"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="create-button-container">
                            <button className="create-button" onClick={() => setShowPreview(true)}>
                                Preview
                            </button>
                        </div>
                    </>
                )}
                {showPreview && (
                    <div className="create-preview-container">
                        <h2 className="create-preview-heading">Preview Job</h2>
                        {jobApplication.jobRole && jobApplication.company && (
                            <div className="create-preview-field">
                                <span className="create-preview-value">
                                    {jobApplication.jobRole} ({jobApplication.company}) |{" "}
                                    {requiredSkills.map((skill, index) => (
                                        <span key={index}>{skill}{index !== requiredSkills.length - 1 && ", "}</span>
                                    ))}
                                </span>
                            </div>
                        )}

                        {jobApplication.jobLocation && jobApplication.jobLocationType && (
                            <div className="create-preview-field">
                                Location: <span className="preview-value">{jobApplication.jobLocation} ({jobApplication.jobLocationType})</span>
                            </div>
                        )}

                        {jobApplication.salary.value && jobApplication.salary.currency && jobApplication.salary.mode && (
                            <div className="create-preview-field">
                                <span className="create-preview-value">
                                    Salary: {parseInt(jobApplication.salary.value)} {jobApplication.salary.currency} {jobApplication.salary.mode}
                                </span>
                            </div>
                        )}

                        {jobApplication.totalDuration.value && jobApplication.totalDuration.mode && (
                            <div className="create-preview-field">
                                <span className="create-preview-value">
                                    Job Duration: {parseInt(jobApplication.totalDuration.value)} {jobApplication.totalDuration.mode}
                                </span>
                            </div>
                        )}

                        {jobApplication.workingHours.value && jobApplication.workingHours.mode && (
                            <div className="create-preview-field">
                                <span className="create-preview-value">
                                    Working Hours: {parseInt(jobApplication.workingHours.value)} {jobApplication.workingHours.mode}{parseInt(jobApplication.workingHours.value) > 1 ? "s" : ""}
                                </span>
                            </div>
                        )}

                        {jobApplication.jobDescription && (
                            <div className="create-preview-field">
                                <label className="create-preview-label">Description:</label>
                                <span className="create-preview-value">{jobApplication.jobDescription}</span>
                            </div>
                        )}

                        <div className="create-button-container">
                            <button className="create-button" onClick={handleSubmit}>
                                Confirm
                            </button>
                            <button className="create-button" onClick={() => setShowPreview(false)}>
                                Edit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateJob;
