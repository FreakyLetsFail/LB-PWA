"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Profile from '@components/Profile'

const MyProfile = () => {
    const { data: session } = useSession(); // Retrieve the session object
    console.log("Session:", session); // Debug log to check the session object

    const handleEdit = () => {
        // Edit logic
    }

    const handleDelete = async () => {
        // Delete logic
    }

    // Check if the user's name exists in the session object
    if (!session?.user?.name) {
        return <div>Loading...</div>; // Or any other fallback UI
    }

    return (
        <Profile
            name={session.user.name} // Access the user's name from the session object
            desc="Willkommen zu deinem Profil"
            data={[]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile;
