import React, { useState } from "react"
import api from "../services/api"
import PageHeader from "../components/PageHeader";

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
        <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32">
            <div className="mx-auto max-w-[820px]">
                <PageHeader title="Add company" description="Keep a record of companies and their contact details." />
                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_14px_40px_rgba(41,72,128,0.06)] sm:p-8">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <input
                        type="text"
                        placeholder="Enter Company Name"
                        onChange={handleChange}
                        value={companyName}
                        name="companyName"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Name"
                        onChange={handleChange}
                        value={contactName}
                        name="contactName"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Email"
                        onChange={handleChange}
                        value={contactEmail}
                        name="contactEmail"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Enter Employee Phone"
                        onChange={handleChange}
                        value={contactPhone}
                        name="contactPhone"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {errorMsg && <p className="mt-5 text-sm text-blue-600">{errorMsg}</p>}
                </section>
            </div>
        </main>
    );
}

export default CreateCompany;
