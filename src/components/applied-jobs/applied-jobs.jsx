import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Dropdown
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  useGetAppliedJobQuery,
  useGetJobByIdQuery,
  useGetWishlistJobQuery,
} from "../../services/jobs";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import moment from "moment";
import { GridExpandMoreIcon } from "@mui/x-data-grid";

const AppliedJobs = (props) => {
  const { gridCol, setGridCol } = props;
  const [jobStatus, setJobStatus] = React.useState("");

  const [id, setId] = useState("");
  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);

  // Dropdown
  const handleChange = (event) => {
    setJobStatus(event.target.value);
  };

  const {
    data: AppliedJObs,
    error: AppliedJObsErr,
    isLoading: isLoadingJobs,
  } = useGetAppliedJobQuery(user?.id);

  const {
    data: JobById,
    error: byIdErr,
    isLoading: byIdLoading,
  } = useGetJobByIdQuery(id);

  const jobDetailsHandler = (job) => {
    setGridCol(8);
    setId(job?._id);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {!isLoadingJobs ? (
          <Grid item md={gridCol} className="order-2 md:order-2 ">
            {AppliedJObs?.myJobs?.map((job) => {
              return (
                <>
                  <Card
                    className="p-3 mb-8 lg:mr-6 mr-0 cursor-pointer"
                    key={job?._id}
                    onClick={() => {
                      jobDetailsHandler(job);
                    }}
                  >
                    <Box className="flex justify-between">
                      <Typography
                        className="!font-poppins !font-semibold"
                        variant="h6"
                      >
                        {job?.title}
                      </Typography>
                      <Typography className="!font-poppins" variant="body1">
                        {job?.jobType}
                      </Typography>
                    </Box>
                    <Typography className="!font-poppins" variant="body2">
                      {job?.company}
                    </Typography>
                    <hr className="my-2" />
                    <Typography
                      className="!font-poppins !font-semibold"
                      variant="h6"
                    >
                      Job Description
                    </Typography>
                    <Typography className="!font-dmsans" variant="body2">
                      {job?.description}
                    </Typography>
                    <Box className="flex justify-between my-3">
                      <span className="!font-dmsans">
                        Job Posted:
                        {moment(job?.datePosted).format("MMMM Do YYYY")}
                      </span>
                      <Button
                        sx={{
                          border: "1px solid #1A1B4B",
                          padding: "6px",
                          minWidth: "0px",
                          borderRadius: "6px",
                          marginLeft: "6px",
                          backgroundColor: "transparent",
                          color: "#1A1B4B",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#1A1B4B",
                            color: "#fff",
                          },
                        }}
                        variant="outlined"
                        size="small"
                      >
                        <BookmarkRemoveIcon fontSize="small" />
                      </Button>
                    </Box>
                  </Card>
                </>
              );
            })}
          </Grid>
        ) : (
          <Grid item md={gridCol}>
            <Box mt={10} sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          </Grid>
        )}

        <Grid
          className="relative bg-white w-full shadow-md rounded-lg p-4 overflow-hidden order-1 md:order-1 lg:order-2"
          sx={{ display: `${gridCol === 12 ? "none" : "block"}` }}
          md={3.9}
          mt={3}
          ml={1}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-7 text-2xl text-black hover:text-blue-900"
            onClick={() => setGridCol(12)}
          >
            ✖
          </button>

          <Card className="p-3 mb-4">
            <Typography className="!font-poppins !font-bold" variant="h6">
              {JobById?.title}
            </Typography>
            <Typography variant="body1" className="!font-poppins">
              {JobById?.company}
            </Typography>

            <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
              <div>
                <div>
                  <h5 className="!font-poppins !font-bold">Pay</h5>
                  <span className="!font-poppins">
                    Rs {JobById?.salary} a month
                  </span>
                </div>
                <div className="mt-5">
                  <h5 className="!font-poppins !font-bold">Job Type</h5>
                  <span className="!font-poppins">{JobById?.jobType}</span>
                </div>
              </div>
              <div>
                <div>
                  <div>
                    <h5 className="!font-poppins !font-bold mt-1 md:mt-0">
                      Location
                    </h5>
                    <span className="!font-poppins">{JobById?.location}</span>
                  </div>
                  <h5 className="!font-poppins !font-bold mt-5 md:mt-4 lg:mt-4">
                    Date Posted
                  </h5>
                  <span className="!font-poppins">
                    {moment(JobById?.datePosted).format("MMMM Do YYYY")}
                  </span>
                </div>

                {/* <div className="my-5">
                  <h5 className="font-bold">Work Environment</h5>
                  <span></span>
                </div> */}
              </div>
            </Box>

            {/* Buttons */}
            <Box className="flex justify-end items-center">
              <Button
                sx={{
                  border: "1px solid #1A1B4B",
                  padding: "6px",
                  minWidth: "0",
                  borderRadius: "6px",
                  "&:hover": {
                    backgroundColor: "#1A1B4B",
                    color: "#fff",
                    border: "#fff",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                  "&:hover": {
                    backgroundColor: "#1A1B4B",
                    color: "#fff",
                    border: "#fff",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#fff",
                  },
                }}
                variant="outlined"
                size="small"
              >
                <ThumbDownOffAltIcon sx={{ color: "#000" }} fontSize="small" />
              </Button>

              <Button
                sx={{
                  border: "1px solid #1A1B4B",
                  padding: "6px",
                  minWidth: "0px",
                  borderRadius: "6px",
                  marginLeft: "6px",
                  backgroundColor: "transparent",
                  color: "#1A1B4B",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1A1B4B",
                    color: "#fff",
                  },
                }}
                variant="outlined"
                size="small"
              >
                <BookmarkRemoveIcon fontSize="small" />
              </Button>

              <FormControl
                sx={{
                  m: 1,
                  minWidth: 200,
                  backgroundColor: "#1a1b4b",
                  border: "none",
                  borderRadius: "4px",
                  color: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
                size="small"
              >
                <Select
                  labelId="job-status-label"
                  id="job-status"
                  value={jobStatus}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    color: "#fff",
                    "& .MuiSelect-icon": {
                      color: "#fff",
                    },
                    width: "100%",
                    whiteSpace: "normal",
                    overflow: "visible",
                    textOverflow: "unset",
                    paddingX: "16px",
                  }}
                  IconComponent={(props) => (
                    <ExpandMoreIcon {...props} style={{ color: "#fff" }} />
                  )}
                >
                  <MenuItem value="">
                    <em>Job Status</em>
                  </MenuItem>
                  <MenuItem value={10} sx={{ whiteSpace: "normal" }}>
                    Applied
                  </MenuItem>
                  <MenuItem value={20} sx={{ whiteSpace: "normal" }}>
                    Interviewing
                  </MenuItem>
                  <MenuItem value={30} sx={{ whiteSpace: "normal" }}>
                    Offered
                  </MenuItem>
                  <MenuItem value={40} sx={{ whiteSpace: "normal" }}>
                    Hired
                  </MenuItem>
                  <MenuItem value={50} sx={{ whiteSpace: "normal" }}>
                    Not Selected
                  </MenuItem>
                  <MenuItem value={60} sx={{ whiteSpace: "normal" }}>
                    No Response
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <div className="my-5">
              <h5 className="!font-poppins !font-bold">Job Description</h5>
              <p className="!font-poppins">{JobById?.description}</p>
            </div>
            <div className="my-5">
              <h5 className="!font-poppins !font-bold">
                Key Responsibilities:
              </h5>
              <ul className="ml-7 list-disc !font-poppins">
                {JobById?.responsibilities?.map((resp) => {
                  return <li>{resp}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="!font-poppins !font-bold">Requirements:</h5>
              <ul className="ml-7 list-disc !font-poppins">
                {JobById?.requirements?.map((resp) => {
                  return <li>{resp}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="!font-bold !font-poppins">Education:</h5>
              <ul className="ml-7 list-disc !font-poppins">
                <li>{JobById?.education}</li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="!font-bold !font-poppins">Language:</h5>
              <ul className="ml-7 list-disc !font-poppins">
                {JobById?.language?.map((lang) => {
                  return <li>{lang}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="!font-bold !font-poppins">Apply:</h5>
              <a
                className="!font-poppins break-words overflow-hidden text-ellipsis whitespace-normal max-w-full"
                href={JobById?.link}
              >
                {JobById?.link}
              </a>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppliedJobs;
