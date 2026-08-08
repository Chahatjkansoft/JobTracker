const Profile = require("../models/Profile");

const getProfileData = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Profile.findOne({ userId: id })
            .populate("userId");

        if (!data) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.status(200).json({ message: "Record fetch successful", data: data });
    } catch (error) {
        console.log("Error=>", error);
        return res.status(500).json({ message: "Server error geting profile" });
    }
};

const createProfile = async ({ name, surName = "", mobileNo = "", userId }) => {
    try {
        // const { name, surName, mobileNo, userId } = req.body;
        if (!name || !userId) {
            //return res.status(400).json({ message: "name or userId not provided to create Profile" });
            throw new Error("name or userId not provided to create Profile");
        }
        const profileData = await Profile.findOne({ userId: userId });
        if (profileData) {
            //return res.status(201).json({ message: "Profile already created" }) 
            return profileData;
        }
        const profile = await Profile.create({
            name,
            surName,
            mobileNo,
            userId
        });
        //return res.status(200).json({ message: "Profile created successful", data: profile });
        return profile;
    } catch (error) {
        console.log("Error=>", error);
        //return res.status(500).json({ message: "Server error creating profile" });
        throw new Error("Server error creating profile=>", error);
    }
};

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surName, mobileNo, userName } = req.body.data;
        console.log("data=>", req.body.data);
        if (!name || !surName || !userName) {
            return res.status(400).json({ message: "Enter all data" });
        }
        const profileData = await Profile.findOne({ userId: id }).populate("userId");
        if (!profileData) {
            return res.status(400).json({ message: "Profile not found login again" });
        }
        profileData.name = name;
        profileData.surName = surName;
        profileData.mobileNo = mobileNo ?? "";
        profileData.userId.userName = userName;
        await profileData.save();
        await profileData.userId.save();
        return res.status(200).json({ message: "Profile Updated", data: profileData });
    } catch (error) {
        console.log("Error=>", error);
        return res.status(500).json({ message: "Server error updating profile" });
    }
}

module.exports = { createProfile, getProfileData, updateProfile };