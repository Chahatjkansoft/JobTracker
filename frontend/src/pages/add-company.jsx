import react, { useState } from "react"
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
            if (!companyName || !contactEmail || !contactPhone || !contactName) {
                setErrorMsg("Enter All Values");
                return;
            }
            if (!/\S+@\S+\.\S+/.test(contactEmail)) {
                return setErrorMsg("Enter a valid email address");
            }
            //on this later 
            // if (!/^\d{10}$/.test(contactPhone)) {
            //     return setErrorMsg("Enter a valid 10-digit phone number");
            // }
            var companyData = {
                companyName,
                contactEmail,
                contactPhone,
                contactName
            }
            setLoading(true);
            const res = await api.post("/company/create", companyData);
            console.log("company saved=>", res);
            setErrorMsg("Record Saved");
            setFormData({companyName: "", contactEmail: "", contactPhone: "", contactName: ""});
            // setTimeout(()=>{setErrorMsg("")},4000);
        }
        catch (error) {
            console.log("Error in add-company", error?.response);
            var message = error?.response?.data?.message || "Error in creating Company";
            setErrorMsg(message);
        }
        finally{setLoading(true);}
    };
    if (loading) return <p>Loading...</p>;
    return (
        <div>
            <h2>Company</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Company Name" onChange={handleChange} value={companyName} name="companyName" /><br/>
                <input type="text" placeholder="Enter Employee Name" onChange={handleChange} value={contactName} name="contactName" /><br/>
                <input type="text" placeholder="Enter Employee Email" onChange={handleChange} value={contactEmail} name="contactEmail" /><br/>
                <input type="text" placeholder="Enter Employee Phone" onChange={handleChange} value={contactPhone} name="contactPhone" /><br/>
                <button disabled={loading} type="submit">{loading ? "Submitting..." : "Submit"}</button><br/>
            </form>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>
    );
}

export default CreateCompany;