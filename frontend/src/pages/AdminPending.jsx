import { useEffect, useState } from "react";
import api from "../services/api";

const GetPendingCompanies = () => {
    const [companyData, setCompanyData] = useState([]);
    const fetchPendingCompanies = async () => {
        try {
            const res = await api.get("/company/pending");
            setCompanyData(res.data.data);
        }
        catch (error) {
            console.log("PC fetch error=>", error);
        }
    };
    const updateStatus = async (id, status) => {
        try {
            await api.put("/company/updateStatus/" + id, { status });
            fetchPendingCompanies();
        }
        catch (error) {
            console.log("update status error=>", error);
        }
    };
    useEffect(() => {
        fetchPendingCompanies();
    }, []);
    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6">
            <div className="mx-auto max-w-6xl space-y-6">
                <section className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                    <h2 className="text-2xl font-semibold text-slate-900">Pending Companies</h2>
                    <p className="mt-2 text-sm text-slate-600">Approve or reject pending company requests.</p>
                </section>
                <section className="overflow-x-auto rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                {['Sr.No','Company Name','Contact Name','Contact Type','Created By','Action'].map((label) => (
                                    <th key={label} className="px-4 py-3 text-left font-medium">{label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                            {companyData.length > 0 ? companyData.map((data, index) => (
                                <tr key={data._id} className="hover:bg-slate-50">
                                    <td className="px-4 py-4">{index + 1}</td>
                                    <td className="px-4 py-4">{data.companyName}</td>
                                    <td className="px-4 py-4">{data.contactName}</td>
                                    <td className="px-4 py-4">{data.contactType}</td>
                                    <td className="px-4 py-4">{data.createdBy?.name}</td>
                                    <td className="px-4 py-4 space-x-2">
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
                </section>
            </div>
        </main>
    );
}

export default GetPendingCompanies;
