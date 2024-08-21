import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

// Yup Validation imports
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  inputBorder,
  inputBorderDefault,
} from "../user-auth/sign-in/styles/sign-in-style";

const PostJob = () => {
  const signUpSchema = yup
    .object()
    .shape({
      title: yup.string().required("Title is required"),
      company: yup.string().required("Company name is required"),
      location: yup.string().required("Location is required"),
      salary: yup.string().required("Salary is required"),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ p: 3, mt: 5 }}>
      <Typography variant="h6" className="font-bold">
        Post Job
      </Typography>

      <Grid container>
        <Grid item md={12}>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
            })}
          >
            <Grid container>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          label="Title"
                          placeholder="Job title"
                          size="small"
                          value={value}
                          onChange={onChange}
                          sx={
                            !errors?.firstName?.message
                              ? inputBorderDefault
                              : inputBorder
                          }
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.title?.message}
                  </div>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          label="Company"
                          placeholder="Company name"
                          size="small"
                          value={value}
                          onChange={onChange}
                          sx={
                            !errors?.company?.message
                              ? inputBorderDefault
                              : inputBorder
                          }
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.company?.message}
                  </div>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="location"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Location
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Location"
                            onChange={onChange}
                          >
                            <MenuItem value={10}>On-site</MenuItem>
                            <MenuItem value={20}>Remote</MenuItem>
                            <MenuItem value={30}>Hybrid</MenuItem>
                          </Select>
                        </>
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.location?.message}
                  </div>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="salary"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          label="Salary"
                          placeholder="Job salary"
                          size="small"
                          value={value}
                          onChange={onChange}
                          sx={
                            !errors?.salary?.message
                              ? inputBorderDefault
                              : inputBorder
                          }
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.salary?.message}
                  </div>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              disabled={!isDirty || false}
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#08008F",
                "&:hover": {
                  backgroundColor: "#08008F",
                },
                textTransform: "capitalize",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              type="submit"
            >
              {false ? (
                <CircularProgress size="1.5rem" color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostJob;
