import React, {useState} from "react";
import api from "../services/api";

const Profile = () => {
    const [formData, setFormData] = useState({
        name: "", surName: "", mobileNo: ""
    });
    const { name, surName, mobileNo } = formData;
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = () => {
        
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6">
            <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-5">Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={name}
                        name="name"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={surName}
                        name="surName"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        onChange={handleChange}
                        value={mobileNo}
                        name="mobileNo"
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-slate-700 focus:outline-none"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
                {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
            </div>
        </main>
    );
};

export default Profile;