import { RegisterForm } from "@/components/auth/RegisterForm";
import { RegisterProvider } from "@/context/auth/RegisterState";
import { getToken } from "@/utils/StoreToken";
import { useEffect } from "react";

export default function Register() {
    useEffect(() => {
        getToken()
            .then(({ data, error }) => {
                if (error) {
                    console.log(error);
                }
                if (data && data.length > 0) {
                    console.log(data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <RegisterProvider>
            <RegisterForm></RegisterForm>
        </RegisterProvider>
    );
}
