import { Content } from "../../components/client/styles";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { StyledLink } from "../../components/client/styles";
import { PostFetch } from "../../utils/hooks/postData";
import Swal from 'sweetalert2'
import { Input } from "../../components/client/UI";

interface Iclient {
    nombre_completo: string;
    email: string;
    fecha_nacimiento: string;
    numero_documento: string;
}

interface Iform {
    type: string;
    name: keyof Iclient;
    placeholder: string;
    label: string;
    xs: number;
}

export const AddClient = () => {

    const { fetch } = PostFetch<{ message: string, ok: boolean }>();

    const schema = yup.object({
        nombre_completo: yup.string().required(),
        numero_documento: yup.string().required().min(8).max(12),
        fecha_nacimiento: yup.string().required(),
        email: yup.string().required().email(),
    }).required();

    const { register, formState: { errors }, handleSubmit, reset } = useForm<Iclient>({ resolver: yupResolver(schema) });

    const form_build: Iform[] = [
        {
            "type": "text", "name": "nombre_completo", "placeholder": "Nombre completo", "label": "Nombre completo", "xs": 8
        },
        {
            "type": "number", "name": "numero_documento", "placeholder": "Numero Documento", "label": "Numero Documento", "xs": 4
        },
        {
            "type": "date", "name": "fecha_nacimiento", "placeholder": "Fecha de nacimiento", "label": "Fecha de nacimiento", "xs": 4
        },
        {
            "type": "text", "name": "email", "placeholder": "Email", "label": "Email", "xs": 8
        }
    ]

    const onSubmit = async (data: Iclient) => {
        const { response, response_error } = await fetch("cliente/crear/", data)

        if (response && response.ok) {
            reset();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
        } else {

            let message = ""

            for (let i in response_error.message) {
                message += response_error.message[i][0]
            }

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: message
            })
        }
    };

    return (
        <Content $position="-100px" >
            <Box sx={{ flexGrow: 1, padding: '2rem' }}>
                <Grid container spacing={2} sx={{ margin: "auto" }} >
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 2rem 2rem 0' }}>
                        <h1>Nuevo cliente</h1>
                    </Grid>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2} sx={{ background: 'white', padding: '20px' }} >
                            {Input({form_build,errors,register})}
                            <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }} >
                                <StyledLink to="/client/list" color="#d32f2f" $margin="10px">Cancelar</StyledLink>
                                <Button variant="contained" sx={{ margin: "10px" }} type="submit" >Guardar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid >
            </Box>
        </Content>
    )
} 