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

        // <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        //     <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        //         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        //             <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-left">
        //                 Sign in to your account
        //             </h1>
        //             <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
        //                 <div>
        //                     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Email Or Name</label>
        //                     <input type="text" id="email" onChange={handleChange} value={emailName} name="emailName" placeholder="Email or User Name"
        //                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        //                     />
        //                 </div>
        //                 <div>
        //                     <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-left">Password</label>
        //                     <input type="password" onChange={handleChange} value={password} name="password" id="password" placeholder="••••••••"
        //                         className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        //                 </div>
        //                 <div className="flex items-center justify-between">
        //                     <a href="#" className="text-sm font-medium text-purple-500 hover:underline dark:text-purple-500">
        //                         Forgot password?
        //                     </a>
        //                 </div>
        //                 <button type="submit" disabled={loader}
        //                     className="w-full text-white bg-purple-500 hover:bg-purple-600 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-400">
        //                     {loader ? (<span className="spinner"></span>) : "Login"}
        //                 </button>
        //                 {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
        //                 <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        //                     Don’t have an account yet? <Link to="/register" className="font-medium text-purple-500 hover:underline dark:text-purple-500">
        //                         Sign up</Link>
        //                 </p>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );
}

export default Login;
