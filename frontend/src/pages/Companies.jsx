import { useEffect, useState } from "react";
import api from "../services/api";

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
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Apply to company</h3>
                <label className="block text-sm text-slate-700 mb-2">Applied Date</label>
                <input
                    type="date"
                    value={applyDate}
                    onChange={(e) => setApplyDate(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                />
                <div className="mt-6 flex justify-end gap-3">
                    <button onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">Close</button>
                    <button onClick={handleSubmit} disabled={!applyDate} className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60">Apply</button>
                </div>
            </div>
        </div>
    );
};

const GetCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(null);

    const fetchCompanies = async () => {
        try {
            const allCompanyList = await api.get("/company/get");
            const myAppliedList = await api.get("/application/get");
            setCompanies(allCompanyList.data.data);
            setApplications(myAppliedList.data.data);
        } catch (error) {
            console.log("getcompanies error", error);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const applicationsMap = applications.reduce((acc, app) => {
        acc[app.CompanyId._id] = app;
        return acc;
    }, {});

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-semibold text-slate-900">Companies</h2>
                    <p className="mt-2 text-sm text-slate-600">Browse companies and apply directly.</p>
                </section>
                <section className="overflow-x-auto rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                {['#','Company','Contact Name','Contact Email','Contact Phone','Type','Action'].map((label) => (
                                    <th key={label} className="px-4 py-3 text-left font-medium">{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {companies.map((company, index) => {
                                const hasApplied = applicationsMap[company._id];
                                return (
                                    <tr key={company._id} className="hover:bg-slate-50">
                                        <td className="px-4 py-4">{index + 1}</td>
                                        <td className="px-4 py-4">{company.companyName}</td>
                                        <td className="px-4 py-4">{company.contactName}</td>
                                        <td className="px-4 py-4">{company.contactEmail}</td>
                                        <td className="px-4 py-4">{company.contactPhone}</td>
                                        <td className="px-4 py-4">{company.contactType}</td>
                                        <td className="px-4 py-4">
                                            {hasApplied ? (
                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{hasApplied.Status}</span>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setSelectedCompanyId(company._id);
                                                        setShowPopup(true);
                                                    }}
                                                    className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-700"
                                                >
                                                    Apply
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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
