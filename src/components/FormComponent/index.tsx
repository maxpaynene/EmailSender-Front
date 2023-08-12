import React, { useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { FilledInput } from "@mui/material";
import { sendEmail } from "../../services";

const validationSchema = yup.object({
  name: yup.string().required("Nombre es requerido"),
  rut: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Contraseña es requerida"),
  email: yup
    .string()
    .email("Ingresa un email valido")
    .required("Email es requerido"),
  file: yup.mixed().required("Fichero es requerido"),
});

const FormComponent = () => {
  const inputRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rut: "",
      file: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      sendEmail(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Nombre"
        type="text"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <div style={{ paddingTop: 10 }} />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <div style={{ paddingTop: 10 }} />
      <TextField
        fullWidth
        id="rut"
        name="rut"
        label="Rut"
        type="text"
        value={formik.values.rut}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rut && Boolean(formik.errors.rut)}
        helperText={formik.touched.rut && formik.errors.rut}
      />
      <div style={{ paddingTop: 10 }} />
      <input
        id="file"
        name="file"
        type="file"
        ref={inputRef}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          const files = target.files;
          if (!files) {
            return;
          }
          formik.setFieldValue("file", files);
        }}
      />
      <div style={{ paddingTop: 10 }} />
      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default FormComponent;
