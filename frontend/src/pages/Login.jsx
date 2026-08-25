import React, { useState } from "react"
import api from "../services/api"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const [formData, setFormData] = useState({
        emailName: "",
        password: ""
    });
    const { emailName, password } = formData;
    const [errorMsg, setErrorMsg] = useState("");
    const [loader, setLoader] = useState(false);
    const { login } = useAuth();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoader(true);
        try {
            if (!emailName || !password) {
                setLoader(false);
                setErrorMsg("Enter all values")
                return;
            }
            const res = await api.post("/auth/login", {
                emailName,
                password,
            });
            if (res.data.token) {
                login(res.data.token);
                //navigate("/dashboard")
            }
        }
        catch (error) {
            setLoader(false);
            const message = error?.response?.data?.message || "Something went wrong";
            setErrorMsg(message);
        }
        finally {
            setLoader(false);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#f7f9fc] px-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-9 shadow-[0_14px_40px_rgba(41,72,128,0.08)]">
                <div className="mb-8 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-bold text-white">J</span><span className="text-lg font-bold text-slate-800">JobTracker</span></div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-500">Welcome back</p><h2 className="mb-6 mt-2 text-3xl font-bold tracking-tight text-slate-800">Sign in</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Enter Email or User Name" onChange={handleChange} value={emailName} name="emailName"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <input type="password" placeholder="Enter Password" onChange={handleChange} value={password} name="password"
                        className="w-full rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700 focus:border-blue-300 focus:bg-white focus:outline-none"
                    />
                    <button type="submit" disabled={loader} className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white font-medium hover:bg-slate-700">{loader ? (<span className="spinner"></span>) : "Login"}</button>
                </form>
                {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
                <p className="mt-6 text-sm text-slate-400">
                    Don't have an account? <Link to="/register" className="font-semibold text-blue-500">Register</Link>
                </p>
            </div>
        </div>

    );
}

export default Login;
