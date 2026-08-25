import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext"
import PageHeader from "../components/PageHeader";

const ApplyAtCompany = ({ id, onClose, refresh }) => {
    const [applyDate, setApplyDate] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!applyDate) return;
            await api.post("/application/create", { companyId: id, date: applyDate });
            refresh();
            onClose();
        }
        catch (error) {
            console.log("Apply error=>", error?.response || error);
            onClose();
        }
    }
    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Applied to company</h3>
                <label className="block text-sm text-slate-700 mb-2">Applied Date</label>
                <input
                    type="date"
                    value={applyDate}
                    onChange={(e) => setApplyDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                />
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">Close</button>
                    <button onClick={handleSubmit} disabled={!applyDate} className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">Submit</button>
                </div>
            </div>
        </div>
    );
};

const moveCompanyToPending = async (id, callBaqckFunc) => {
    try {
        let reason = "";
        while (!reason || !reason.trim()) {
            reason = prompt("Please enter the rejection reason:", "Not relible");
            if (reason === null) {
                // User clicked Cancel
                return;
            }
        }
        await api.put("/company/updateStatus/" + id, { status: "pending", reason });
        callBaqckFunc();
    } catch (error) {
        console.log("Error=>", error);
    }
}

const GetCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);
    const [loader, setLoader] = useState(true);
    const { user } = useAuth();

    const isAdmin = user?.role?.toLowerCase() === "admin";

    const fetchCompanies = async () => {
        try {
            setLoader(true);
            const allCompanyList = await api.get("/company/get");
            const myAppliedList = await api.get("/application/get");
            setCompanies(allCompanyList.data.data);
            setApplications(myAppliedList.data.data);
        } catch (error) {
            console.log("getcompanies error", error);
        }
        finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const applicationsMap = applications.reduce((acc, app) => {
        acc[app.CompanyId._id] = app;
        return acc;
    }, {});

    if (loader) return <Loader />;

    return (
        <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32">
            <div className="mx-auto max-w-[1200px] space-y-5 md:space-y-7">
                <PageHeader title="Companies" description="Browse companies and contact details." />
                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(41,72,128,0.06)]">
                    {/* Desktop Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50 text-slate-400">
                                <tr>
                                    {['#', 'Company', 'Contact Name', 'Contact Email', 'Contact Phone', 'Type', 'Action'].map((label) => (
                                        <th key={label} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {companies.length > 0 ? (companies.map((company, index) => {
                                    const hasApplied = applicationsMap[company._id];
                                    return (
                                        <tr key={company._id} className="text-slate-600 hover:bg-blue-50/30">
                                            <td className="px-5 py-4">{index + 1}</td>
                                            <td className="px-5 py-4 font-semibold text-slate-800">{company.companyName}</td>
                                            <td className="px-5 py-4">{company.contactName}</td>
                                            <td className="px-5 py-4">{company.contactEmail}</td>
                                            <td className="px-5 py-4">{company.contactPhone}</td>
                                            <td className="px-5 py-4">{company.contactType}</td>
                                            {!isAdmin ? (<td className="px-4 py-4 text-center">
                                                {hasApplied ? (
                                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{hasApplied.Status}</span>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCompanyId(company._id);
                                                            setShowPopup(true);
                                                        }}
                                                        className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700">
                                                        Apply
                                                    </button>
                                                )}
                                            </td>) : (<td className="px-4 py-4 text-center">
                                                <button
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
                                                    onClick={() => moveCompanyToPending(company._id, fetchCompanies)}>
                                                    Mark Pending
                                                </button>
                                            </td>)}
                                        </tr>
                                    );
                                })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </section>
            </div>
            {showPopup && (
                <ApplyAtCompany
                    id={selectedCompanyId}
                    onClose={() => setShowPopup(false)}
                    refresh={fetchCompanies}
                />
            )}
        </main>
    );
};

export default GetCompanies;
