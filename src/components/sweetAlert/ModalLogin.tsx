"use client"; // Deja usar el cliente
import * as React from 'react';

// Componentes SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Componentes MUI
import { Button } from '@mui/material';

// Componente custom MUI
import Tabs from '@/components/MUI/Tabs';

const MySwal = withReactContent(Swal);

// Componente detro del modal
const ModalContent = () => {
    return (
        <div>
            <Tabs />
        </div>
    );
};

const Login = () => {
    const handleButtonClick = () => {
        MySwal.fire({
            html: <ModalContent />,
            showConfirmButton: false,
        });
    };

    return (
        <Button
            onClick={handleButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
            Ingresa al Club
        </Button>
    );
};

export default Login;