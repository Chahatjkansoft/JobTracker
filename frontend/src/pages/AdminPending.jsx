import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";

const GetPendingCompanies = () => {
    const [companyData, setCompanyData] = useState([]);
    const [loader, setLoader] = useState(true);
    const fetchPendingCompanies = async () => {
        try {
            setLoader(true);
            const res = await api.get("/company/pending");
            setCompanyData(res.data.data);
        }
        catch (error) {
            console.log("PC fetch error=>", error);
        }
        finally {
            setLoader(false);
        }
    };
    const updateStatus = async (id, status) => {
        try {
            let reason = "";
            if (status == "rejected") {

                while (!reason || !reason.trim()) {
                    reason = prompt("Please enter the rejection reason:", "Not relible");
                    if (reason === null) {
                        // User clicked Cancel
                        return;
                    }
                }
                // if (reason && reason.trim()) {
                //     // Reject company
                //     console.log("Reason:", reason);
                // }
            }
            await api.put("/company/updateStatus/" + id, { status, reason });
            fetchPendingCompanies();
        }
        catch (error) {
            console.log("update status error=>", error);
        }
    };
    useEffect(() => {
        fetchPendingCompanies();
    }, []);
    if (loader) return <Loader />;
    return (
        <main className="min-h-screen bg-[#f7f9fc] px-4 pb-8 pt-24 sm:px-6 md:px-10 md:pb-12 md:pt-32">
            <div className="mx-auto max-w-[1200px] space-y-5 md:space-y-7">
                <PageHeader eyebrow="Administration" title="Company approval" description="Approve or reject company requests." />
                <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_14px_40px_rgba(41,72,128,0.06)]">
                    {/* Desktop Table View */}
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px] divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50 text-slate-400">
                                <tr>
                                    {['Sr.No', 'Company Name', 'Contact Name', 'Contact Type', 'Created By', 'Action'].map((label) => (
                                        <th key={label} className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide">{label}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                                {companyData.length > 0 ? companyData.map((data, index) => (
                                        <tr key={data._id} className="text-slate-600 hover:bg-blue-50/30">
                                        <td className="px-5 py-4">{index + 1}</td>
                                        <td className="px-5 py-4 font-semibold text-slate-800">{data.companyName}</td>
                                        <td className="px-5 py-4">{data.contactName}</td>
                                        <td className="px-5 py-4">{data.contactType}</td>
                                        <td className="px-5 py-4">{data.createdBy?.name}</td>
                                        <td className="px-4 py-4 text-center space-x-2">
                                            <button onClick={() => updateStatus(data._id, "approved")} className="rounded-full bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-500">Approve</button>
                                            <button onClick={() => updateStatus(data._id, "rejected")} className="rounded-full bg-rose-600 px-3 py-2 text-sm text-white hover:bg-rose-500">Reject</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-8 text-center text-slate-500">No data found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View removed for the web-only interface. */}
                    <div className="hidden">
                        {companyData.length > 0 ? (
                            <div className="space-y-4">
                                {companyData.map((data) => (
                                    <div key={data._id} className="rounded-2xl border border-slate-300 bg-slate-50 p-4 space-y-3">
                                        <h3 className="font-semibold text-slate-900">{data.companyName}</h3>
                                        <div className="text-sm text-slate-600 space-y-2">
                                            <p><span className="font-medium">Contact:</span> {data.contactName}</p>
                                            {data.contactType && <p><span className="font-medium">Type:</span> {data.contactType}</p>}
                                            <p><span className="font-medium">Added by:</span> {data.createdBy?.name}</p>
                                        </div>
                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => updateStatus(data._id, "approved")}
                                                className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition"
                                            >
                                                ✓ Approve
                                            </button>
                                            <button
                                                onClick={() => updateStatus(data._id, "rejected")}
                                                className="flex-1 rounded-lg bg-rose-600 py-2 text-sm font-medium text-white hover:bg-rose-500 transition"
                                            >
                                                ✕ Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">No data found.</div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default GetPendingCompanies;
