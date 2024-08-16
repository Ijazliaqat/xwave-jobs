import React, { useState } from "react";
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
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import moment from "moment";

const AppliedJobs = (props) => {
  const { gridCol, setGridCol } = props;

  const [id, setId] = useState("");
  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);

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
    setGridCol(6);
    setId(job?._id);
  };
  return (
    <div>
      <Grid container spacing={3}>
        {!isLoadingJobs ? (
          <Grid item md={gridCol}>
            {AppliedJObs?.myJobs?.map((job) => {
              return (
                <>
                  <Card
                    className="p-3 mb-4"
                    key={job?._id}
                    onClick={() => {
                      jobDetailsHandler(job);
                    }}
                  >
                    <Box className="flex justify-between">
                      <Typography variant="h6">{job?.title}</Typography>
                      <Typography variant="body1">{job?.jobType}</Typography>
                    </Box>
                    <Typography variant="body2">{job?.company}</Typography>
                    <hr className="my-2" />
                    <Typography variant="h6">Job Description</Typography>
                    <Typography variant="body2">{job?.description}</Typography>
                    <Box className="flex justify-between my-3">
                      <span>
                        Job Posted:
                        {moment(job?.datePosted).format("MMMM Do YYYY")}
                      </span>
                      <Button
                        sx={{ border: ` 1px solid #1A1B4B` }}
                        variant="outlined"
                        size="small"
                      >
                        <BookmarkRemoveIcon
                          sx={{ color: `#1A1B4B` }}
                          fontSize="small"
                        />
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
          sx={{ display: `${gridCol === 12 ? "none" : "block"}` }}
          md={5.9}
          mt={3}
          ml={1}
        >
          <Card className="p-3 mb-4">
            <Typography className="font-bold" variant="h6">
              {JobById?.title}
            </Typography>
            <Typography variant="body1">{JobById?.company}</Typography>

            <Box className="flex justify-between mt-5">
              <div>
                <div>
                  <h5 className="font-bold">Pay</h5>
                  <span>Rs {JobById?.salary} a month</span>
                </div>
                <div className="my-5">
                  <h5 className="font-bold">Job Type</h5>
                  <span>{JobById?.jobType}</span>
                </div>
                <div>
                  <h5 className="font-bold">Date Posted</h5>
                  <span>
                    {moment(JobById?.datePosted).format("MMMM Do YYYY")}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <h5 className="font-bold">Location</h5>
                  <span>{JobById?.location}</span>
                </div>
                {/* <div className="my-5">
                  <h5 className="font-bold">Work Environment</h5>
                  <span></span>
                </div> */}
              </div>
            </Box>

            <hr className="mt-4" />

            <div className="my-5">
              <h5 className="font-bold">Job Description</h5>
              <p>{JobById?.description}</p>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Key Responsibilities:</h5>
              <ul className="ml-7 list-disc">
                {JobById?.responsibilities?.map((resp) => {
                  return <li>{resp}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Requirements:</h5>
              <ul className="ml-7 list-disc">
                {JobById?.requirements?.map((resp) => {
                  return <li>{resp}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Education:</h5>
              <ul className="ml-7 list-disc">
                <li>{JobById?.education}</li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Language:</h5>
              <ul className="ml-7 list-disc">
                {JobById?.language?.map((lang) => {
                  return <li>{lang}</li>;
                })}
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Apply:</h5>
              <a href={JobById?.link}>{JobById?.link}</a>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AppliedJobs;
