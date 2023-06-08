import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ContentDialog } from "../../components/client/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { PutFetch } from "../../utils/hooks/putData";
import Swal from 'sweetalert2'
import { Input } from "../../components/client/UI";


interface Iclient {
    nombre_completo: string;
    email: string;
    fecha_nacimiento: string;
    numero_documento: string;
    id?: number;
}

interface Props {
    openEdit: boolean;
    handleClose: () => void;
    handlerFetch: () => void;
    client: Iclient;
}

interface Iform {
    type: string;
    name: keyof Iclient;
    placeholder: string;
    label: string;
    xs: number;
}

export const EditClient = ({ openEdit, handleClose, client, handlerFetch }: Props) => {
    const { fetch } = PutFetch<{ message: string, ok: boolean }>();

    const schema = yup.object({
        nombre_completo: yup.string().required(),
        numero_documento: yup.string().required().min(8).max(12),
        fecha_nacimiento: yup.string().required(),
        email: yup.string().required().email(),
    }).required();

    const { register, formState: { errors }, handleSubmit } = useForm<Iclient>({
        resolver: yupResolver(schema),
        values: { ...client }
    });

    const form_build: Iform[] = [
        {
            "type": "text", "name": "nombre_completo", "placeholder": "Nombre completo", "label": "Nombre completo", "xs": 7
        },
        {
            "type": "number", "name": "numero_documento", "placeholder": "Numero Documento", "label": "Numero Documento", "xs": 5
        },
        {
            "type": "date", "name": "fecha_nacimiento", "placeholder": "Fecha de nacimiento", "label": "Fecha de nacimiento", "xs": 4
        },
        {
            "type": "text", "name": "email", "placeholder": "Email", "label": "Email", "xs": 8
        }
    ]

    const onSubmit = async (data: Iclient) => {

        Object.keys(client).map((key: any) => {
            if (data[key as keyof Iclient] === client[key as keyof Iclient]) {
                delete data[key as keyof Iclient]
            }
        });

        const { response, response_error } = await fetch("cliente/actualizar/" + client.id + "/", data)

        if (response && response.ok) {
            handlerFetch()
            handleClose();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            handleClose();

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
        <Dialog open={openEdit} onClose={handleClose} >
            <ContentDialog>
                <div className="header-contentDialog">
                    <DialogTitle sx={{ color: 'white' }}>Editar cliente</DialogTitle>
                </div>
                <div className="body-contentDialog">
                    <DialogContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} sx={{ padding: '20px' }} >
                                <Grid container spacing={2} sx={{ padding: '20px' }} >
                                    {Input({ form_build, errors, register })}
                                    <Grid item xs={12} sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }} >
                                        <Button variant="contained" color="error" style={{ margin: "10px" }} onClick={handleClose}>Cancelar</Button>
                                        <Button variant="contained" type='submit' style={{ margin: "10px" }} >Guardar</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>


                    </DialogActions>
                </div>
            </ContentDialog>
        </Dialog>
    )
}