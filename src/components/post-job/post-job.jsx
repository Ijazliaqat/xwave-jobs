import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

// Yup Validation imports
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useJobPostMutation } from "../../services/jobs";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const PostJob = () => {
  const [requirement, setRequirement] = useState("");
  const [requirementArr, setRequirementArr] = useState([]);
  const [responsibilities, setResponsibilities] = useState("");
  const [responsibilitiesArr, setResponsibilitiesArr] = useState([]);

  const [jobPost, { isLoading, isError, error }] = useJobPostMutation();

  const signUpSchema = yup
    .object()
    .shape({
      title: yup.string().required("Title is required"),
      company: yup.string().required("Company name is required"),
      location: yup.string().required("Location is required"),
      salary: yup.string().required("Salary is required"),
      description: yup.string().required("Description is required"),
      jobType: yup.string().required("Job type is required"),
      link: yup.string().required("Link is required"),
      education: yup.string().required("Education is required"),
    })
    .required();

  const requirementHandler = (e) => {
    setRequirement("");
    setRequirementArr((prev) => [...prev, requirement]);
  };
  const responsibilitiesHandler = (e) => {
    setResponsibilities("");
    setResponsibilitiesArr((prev) => [...prev, responsibilities]);
  };

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      jobType: "",
      link: "",
      education: "",
    },
  });

  const jobPostFields = watch();

  console.log(jobPostFields);

  const onSubmit = async (data) => {
    const currentDate = moment()
      .utc()
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    const job = {
      title: data?.title,
      description: data?.description,
      company: data?.company,
      location: data?.location,
      salary: data?.salary,
      pay: "annual",
      jobType: data?.jobType,
      datePosted: currentDate,
      link: data?.link,
      requirements: requirementArr,
      responsibilities: responsibilitiesArr,
      education: data?.education,
      language: ["English"],
    };

    try {
      const applied = await jobPost(job).unwrap();

      toast.success("Job Created Successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Something Went Wrong", {
        position: "top-right",
      });
    }
  };

  return (
    <Box sx={{ p: 3, mt: 8 }}>
      <ToastContainer autoClose={3000} />
      <Typography variant="h6" className="font-bold">
        Post Job
      </Typography>

      <Grid container>
        <Grid item md={isDirty ? 5.5 : 12}>
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
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Location"
                            onChange={onChange}
                          >
                            <MenuItem value={"on-site"}>On-site</MenuItem>
                            <MenuItem value={"remote"}>Remote</MenuItem>
                            <MenuItem value={"hybrid"}>Hybrid</MenuItem>
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
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.salary?.message}
                  </div>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <FormControl fullWidth>
                  <Controller
                    name="jobType"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <>
                          <InputLabel id="demo-simple-select-label">
                            Job Type
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Location"
                            onChange={onChange}
                          >
                            <MenuItem value={"Full Time"}>Full Time</MenuItem>
                            <MenuItem value={"Part Time"}>Part Time</MenuItem>
                            <MenuItem value={"Freelance"}>Freelance</MenuItem>
                            <MenuItem value={"Contract"}>Contract</MenuItem>
                            <MenuItem value={"Internship"}>Internship</MenuItem>
                            <MenuItem value={"Temporary"}>Temporary</MenuItem>
                          </Select>
                        </>
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.jobType?.message}
                  </div>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="link"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          label="Link"
                          placeholder="Company name"
                          size="small"
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.link?.message}
                  </div>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="education"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextField
                          label="Education"
                          placeholder="Education required"
                          size="small"
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.education?.message}
                  </div>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <TextField
                  style={{ width: "92%" }}
                  label="Requirements"
                  placeholder="Job requirements"
                  size="small"
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                />
                <Button
                  sx={{
                    color: "#fff",
                    marginLeft: "10px",
                    backgroundColor: "#08008F",
                    "&:hover": {
                      backgroundColor: "#08008F",
                    },
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={requirementHandler}
                >
                  Add
                </Button>
                <div className="text-red-500 my-2 text-sm">
                  {/* {errors?.education?.message} */}
                </div>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  style={{ width: "92%" }}
                  label="Responsibilities"
                  placeholder="Job responsibilities"
                  size="small"
                  value={responsibilities}
                  onChange={(e) => setResponsibilities(e.target.value)}
                />
                <Button
                  sx={{
                    color: "#fff",
                    marginLeft: "10px",
                    backgroundColor: "#08008F",
                    "&:hover": {
                      backgroundColor: "#08008F",
                    },
                    textTransform: "capitalize",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={responsibilitiesHandler}
                >
                  Add
                </Button>
                <div className="text-red-500 my-2 text-sm">
                  {errors?.education?.message}
                </div>
              </Grid>

              <Grid item sm={12}>
                <FormControl fullWidth>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <TextareaAutosize
                          minRows={3}
                          maxRows={5}
                          label="Description"
                          placeholder="Job description..."
                          size="small"
                          style={{
                            border: "1px solid #E0E0E0",
                            borderRadius: "10px",
                            padding: "5px",
                          }}
                          value={value}
                          onChange={onChange}
                        />
                      );
                    }}
                  />
                  <div className="text-red-500 my-2 text-sm">
                    {errors?.description?.message}
                  </div>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              disabled={!isDirty || isLoading}
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
              {isLoading ? (
                <CircularProgress size="1.5rem" color="inherit" />
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Grid>
        {isDirty && (
          <Grid md={isDirty ? 6 : 12}>
            <Card className="p-3 mb-4">
              {jobPostFields?.title && (
                <Typography className="font-bold" variant="h6">
                  {jobPostFields?.title}
                </Typography>
              )}
              {jobPostFields?.company && (
                <Typography variant="body1">
                  {jobPostFields?.company}
                </Typography>
              )}

              <Box className="flex justify-between mt-5">
                <div>
                  {jobPostFields?.salary && (
                    <div>
                      <h5 className="font-bold">Pay</h5>
                      <span>Rs {jobPostFields?.salary} a month</span>
                    </div>
                  )}
                  {jobPostFields?.jobType && (
                    <div className="my-5">
                      <h5 className="font-bold">Job Type</h5>
                      <span>{jobPostFields?.jobType}</span>
                    </div>
                  )}
                  {jobPostFields?.datePosted && (
                    <div>
                      <h5 className="font-bold">Date Posted</h5>
                      <span>
                        {moment(jobPostFields?.datePosted).format(
                          "MMMM Do YYYY"
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  {jobPostFields?.location && (
                    <div>
                      <h5 className="font-bold">Location</h5>
                      <span>{jobPostFields?.location}</span>
                    </div>
                  )}
                </div>
              </Box>

              {jobPostFields?.description && (
                <div className="my-5">
                  <h5 className="font-bold">Job Description</h5>
                  <p>{jobPostFields?.description}</p>
                </div>
              )}
              {responsibilitiesArr.length > 0 && (
                <div className="my-5">
                  <h5 className="font-bold">Key Responsibilities:</h5>
                  <ul className="ml-7 list-disc">
                    {responsibilitiesArr?.map((resp) => {
                      return <li>{resp}</li>;
                    })}
                  </ul>
                </div>
              )}
              {requirementArr?.length > 0 && (
                <div className="my-5">
                  <h5 className="font-bold">Requirements:</h5>
                  <ul className="ml-7 list-disc">
                    {requirementArr?.map((resp) => {
                      return <li>{resp}</li>;
                    })}
                  </ul>
                </div>
              )}
              {jobPostFields?.education && (
                <div className="my-5">
                  <h5 className="font-bold">Education:</h5>
                  <ul className="ml-7 list-disc">
                    <li>{jobPostFields?.education}</li>
                  </ul>
                </div>
              )}
              {jobPostFields?.link && (
                <div className="my-5">
                  <h5 className="font-bold">Apply:</h5>
                  <a href={jobPostFields?.link}>{jobPostFields?.link}</a>
                </div>
              )}
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PostJob;
