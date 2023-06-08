import { useState, useEffect } from 'react';
import { Content, StyledLink } from "../../components/client/styles";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Card, CardHeader, CardActions } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Avatar from '@mui/material/Avatar';
import { EditClient } from "./EditClient";
import { GetFetch } from "../../utils/hooks/getData";
import { instance } from "../../utils/instance";
import Swal from 'sweetalert2'
import moment from "moment";

interface Iclient {
    nombre_completo: string;
    email: string;
    fecha_nacimiento: string;
    fecha_creacion: string;
    numero_documento: string;
    id: number;
}

export const ListClient = () => {
    const [openEdit, setOpenEdit] = useState(false);
    const [client, setClient] = useState<Iclient>();

    const { data, fetch } = GetFetch<Iclient[]>();


    useEffect(() => {
        handlrerFetch()
    }, []);


    const handlrerFetch = async (params: string = '') => {
        await fetch("cliente/" + params);
    }

    const formatDate = (date: string) => {
        const date_by = new Date(date)
        return moment(date_by).format("Do MMMM YYYY")
    }

    const handlerDelete = async (id: number) => {
        try {
            const data = await (await instance.delete("cliente/eliminar/" + id + "/")).data
            handlrerFetch();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.message
            })
        }
    }


    const handlerInputChange = (e: any) => {
        let fecha_valid = moment(e.target.value, "YYYY-MM-DD", true).isValid()

        if (fecha_valid) {
            let resulst = new URLSearchParams()
            resulst.append("fecha", e.target.value)
            handlrerFetch("?" + resulst.toString())
        } else {
            let resulst = new URLSearchParams()
            resulst.append("nombre", e.target.value)
            handlrerFetch("?" + resulst.toString())
        }

        if (!e.target.value.length) {
            handlrerFetch()
        }
    }

    const handleClickOpenEdit = (client: any) => {
        setClient(client)
        setOpenEdit(true);
    };

    const handleClose = () => {
        setOpenEdit(false);
    };


    return (
        <>
            <Content $position="-50px" >
                <Box sx={{ flexGrow: 1, padding: '2rem', width: "100vw", minHeight: "50vh" }} >
                    <Grid container spacing={2} >
                        {/* HEADER */}
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 2rem 0 0' }}>
                            <h1>Listado de clientes</h1>
                            <StyledLink to="/client/create" style={{ height: "50px", background: "#1976d2" }} $margin='0'>
                                <AddIcon />
                                Nuevo cliente
                            </StyledLink>
                        </Grid>
                        {/* SEARCH */}
                        <Box sx={{ flexGrow: 1, padding: '2rem' }}>
                            <Grid container spacing={2} sx={{ background: 'white' }}>
                                <Grid item xs={12}>
                                    <TextField
                                        sx={{ width: '100%', padding: '2rem' }}
                                        variant="outlined"
                                        placeholder="Buscar..."
                                        name="filtro"
                                        onChange={handlerInputChange}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton>
                                                    <SearchIcon />
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Grid>
                                {/* LIST */}
                                {
                                    data?.map((client, index) => (
                                        <Grid item xs={12} sx={{ padding: '20px' }} key={index} >
                                            <Card sx={{ width: '100%' }}>
                                                <p style={{ textAlign: "right", margin: "0 5px 0 5px", fontFamily: "cursive" }} >{formatDate(client.fecha_nacimiento)} | {formatDate(client.fecha_creacion)}</p>
                                                <CardHeader
                                                    avatar={<Avatar alt={client.nombre_completo} src={client.nombre_completo} />}
                                                    action={
                                                        <CardActions disableSpacing>
                                                            <IconButton aria-label="Editar" style={{ background: '#1976d3', color: 'white', margin: '5px' }} onClick={() => handleClickOpenEdit(client)}>
                                                                <ModeEditIcon />
                                                            </IconButton>
                                                            <IconButton aria-label="Eliminar" style={{ background: '#f33f37', color: 'white', margin: '5px' }} onClick={() => handlerDelete(client.id)} >
                                                                <DeleteForeverIcon />
                                                            </IconButton>
                                                        </CardActions>
                                                    }
                                                    title={client.nombre_completo}
                                                    subheader={`Email: ${client.email}`}
                                                />
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </Box>
                        {/* LIST  */}
                    </Grid>
                </Box>
            </Content>

            {
                openEdit ? <EditClient openEdit={openEdit} handleClose={handleClose} client={client!} handlerFetch={handlrerFetch} /> : null
            }


        </>
    )
}