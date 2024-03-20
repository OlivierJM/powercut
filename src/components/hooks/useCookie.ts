import { useState, useCallback } from "react"

function getCookieObject(key: string): string {
    const cookies = document.cookie;
    const cookieArray = cookies.split("; ")
    for (let cookieIndex in cookieArray) {
        const cookie = cookieArray[cookieIndex];
        if (cookie !== '') {
            const cookiePair = cookie.split("=");
            if (cookiePair[0] === key) {
                return cookiePair[1];
            }
        }
    }
    return "";
}

export default function useCookies(key: string) {
    const [storedCookie, setStoredCookie] = useState(() => getCookieObject(key));

    function setCookie(value: any, daysUntilExpiry?: number): any {
        if (value !== undefined) {
            setStoredCookie(value);

            let cookieString = `${key}=${value}`;
            if (daysUntilExpiry) {
                const date = new Date();
                date.setDate(date.getDate() + (daysUntilExpiry));
                cookieString = `${cookieString}; expires=${date}`;
            }
            document.cookie = cookieString;
        }
    }

    return [storedCookie, setCookie] as const;
}