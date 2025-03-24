import Image from "next/image";
import React from "react";

export default function Layout({ children }) {
    return (
        <div className="flex min-h-screen">
            <section className="flex flex-1 flex-col items-center justify-center bg-white  sm:p-4  py-10 lg:justify-center lg:p-10 lg:py-0">
                {children}
            </section>
        </div>
    );
}
