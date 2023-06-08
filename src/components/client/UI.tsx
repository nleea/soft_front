import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface Iclient {
  nombre_completo: string;
  email: string;
  fecha_nacimiento: string;
  numero_documento: string;
  id?: number;
}

interface Iform {
  type: string;
  name: keyof Iclient;
  placeholder: string;
  label: string;
  xs: number;
}

interface InputBuild {
  form_build: Iform[];
  errors: FieldErrors<Iclient>
  register: UseFormRegister<Iclient>
}

export const Input = ({ form_build, errors, register }: InputBuild) => (
  <>
    {form_build.map((c, index) => {
      return (
        <Grid item xs={c.xs} key={index} >
          <label htmlFor={c.name} style={{ marginBottom: "10px", fontFamily: "cursive" }} >{c.label}</label>
          <TextField placeholder={c.placeholder} variant="outlined" type={c.type} sx={{ width: '100%' }} {...register(c.name)} />
          {errors[c.name]?.type === 'required' && <p role="alert">Este campo es requerido</p>}
          {errors[c.name]?.type === 'min' && <p role="alert">Debe ser mayor a 8 digitos</p>}
          {errors[c.name]?.type === 'max' && <p role="alert">Debe ser de menor a 12 digitos</p>}
        </Grid>
      )
    })}
  </>
);
