import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function Home() {
    return (
        <div className="bg-amber-50 h-[100vh]">
            <UserButton showName={true} />
        </div>
    );
}
