import React, { useState } from "react"
import api from "../services/api"

const CreateCompany = () => {
    const [formData, setFormData] = useState({
        companyName: "", contactEmail: "", contactPhone: "", contactName: ""
    });
    const { companyName, contactEmail, contactPhone, contactName } = formData;
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!companyName || !contactEmail  || !contactName) {
                setErrorMsg("Enter all values");
                return;
            }
            if (!/\S+@\S+\.\S+/.test(contactEmail)) {
                return setErrorMsg("Enter a valid email address");
            }
            setLoading(true);
            await api.post("/company/create", {
                companyName,
                contactEmail,
                contactPhone,
                contactName
            });
            setErrorMsg("Record saved successfully.");
            setFormData({ companyName: "", contactEmail: "", contactPhone: "", contactName: "" });
        }
        catch (error) {
            const message = error?.response?.data?.message || "Error in creating company";
            setErrorMsg(message);
        }
        finally { setLoading(false); }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-5">Add Company</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        value={companyName}
                        name="companyName"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Name"
                        onChange={handleChange}
                        value={contactName}
                        name="contactName"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Email"
                        onChange={handleChange}
                        value={contactEmail}
                        name="contactEmail"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Phone"
                        onChange={handleChange}
                        value={contactPhone}
                        name="contactPhone"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
            </div>
        </main>
    );
}

export default CreateCompany;
