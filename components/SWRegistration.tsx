"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        serwist?: {
            register: () => void;
        };
    }
}

export default function SWRegistration() {
    useEffect(() => {
        if ("serviceWorker" in navigator && window.serwist !== undefined) {
            window.serwist.register();
        }
    }, []);

    return null;
}
