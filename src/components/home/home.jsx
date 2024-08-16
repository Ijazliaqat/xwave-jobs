import {
  Box,
  Button,
  Card,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  useAddWishListMutation,
  useAppliedJobMutation,
  useDeleteJobMutation,
  useGetJobByIdQuery,
  useGetJobsQuery,
} from "../../services/jobs";
import moment from "moment";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const HomeJobs = () => {
  const [gridCol, setGridCol] = useState(12);
  const [id, setId] = useState("");

  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);
  console.log(user, "user");

  const {
    data: allJobs,
    error: allJobsErr,
    isLoading: allJobsLoading,
    refetch: refecthJobs,
    refetch,
  } = useGetJobsQuery();

  const [deleteJob] = useDeleteJobMutation();

  const [appliedJob, { isLoading: isApplied }] = useAppliedJobMutation();
  const [addWishList, { isLoading: isAddedWishList }] =
    useAddWishListMutation();

  const {
    data: JobById,
    error: byIdErr,
    isLoading: byIdLoading,
  } = useGetJobByIdQuery(id);

  console.log(JobById, "byIdJob");

  const jobDetailsHandler = (job) => {
    setId(job?._id);
    setGridCol(6);
  };

  const wishListHandler = async (id) => {
    const jobDetails = {
      userId: user?.id,
      jobId: id,
    };

    try {
      const applied = await addWishList(jobDetails).unwrap();

      toast.success("Job Added Successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-right",
      });
    }
  };

  const appliedJobHandler = async (id) => {
    const jobDetails = {
      userId: user?.id,
      jobId: id,
    };

    try {
      const applied = await appliedJob(jobDetails).unwrap();

      toast.success("Job Applied Successfully!", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err?.data?.message, {
        position: "top-right",
      });
    }
  };

  const deleteJobHandler = async (id) => {
    Swal.fire({
      icon: "question",
      html: `Are you sure you want to delete this Job? `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `Delete`,
      confirmButtonColor: "#ff2144",
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `Cancel`,
      cancelButtonAriaLabel: "Thumbs down",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteJob(id).unwrap();

          Swal.fire("Deleted!", "Job has been deleted.", "success");
          setGridCol(12);
          refecthJobs();
        } catch (error) {
          Swal.fire("Deleted!", "Something went wrong.", "error");
        }
      }
    });
  };

  useEffect(() => {
    refetch();
  }, [id]);
  return (
    <>
      <ToastContainer autoClose={3000} />

      <Box sx={{ p: 3, mt: 9 }}>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Job title, keywords or company
          </InputLabel>
          <OutlinedInput
            size="small"
            sx={{ width: 600 }}
            id="outlined-adornment-password"
            type={"text"}
            startAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="start"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Job title, keywords or company"
            endAdornment={
              <InputAdornment position="">
                <Button sx={{ backgroundColor: "#1A1B4B" }} variant="contained">
                  Search
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <Grid container spacing={3}>
          {!allJobsLoading ? (
            <Grid item md={gridCol}>
              {allJobs?.map((job) => {
                return (
                  <>
                    <Card
                      className="p-3 mb-4 cursor-pointer"
                      key={job?.id}
                      onClick={() => {
                        jobDetailsHandler(job);
                      }}
                    >
                      <Box className="flex justify-between">
                        <Typography variant="h6">{job?.title}</Typography>
                        <Typography variant="body1">{job?.type}</Typography>
                      </Box>
                      <Typography variant="body2">{job?.company}</Typography>
                      <hr className="my-2" />
                      <Typography variant="h6">Job Description</Typography>
                      <Typography variant="body2">
                        {job?.description}
                      </Typography>
                      <Box className="flex justify-between my-3">
                        <span className="">
                          {moment(job?.datePosted).format("MMMM Do YYYY")}
                        </span>
                        <div>
                          {user?.isAdmin && (
                            <Button
                              sx={{
                                border: ` 1px solid #1A1B4B`,
                                marginRight: 2,
                              }}
                              variant="outlined"
                              size="small"
                              onClick={() => {
                                deleteJobHandler(job?._id);
                              }}
                            >
                              <DeleteForeverIcon
                                sx={{ color: `#ff2144` }}
                                fontSize="small"
                              />
                            </Button>
                          )}
                          <Button
                            sx={{ border: ` 1px solid #1A1B4B` }}
                            variant="outlined"
                            size="small"
                          >
                            <BookmarkBorderIcon
                              sx={{ color: `#1A1B4B` }}
                              fontSize="small"
                            />
                          </Button>
                        </div>
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
              <Box className="flex justify-end my-3">
                <Button
                  sx={{ border: ` 1px solid #1A1B4B` }}
                  variant="outlined"
                  size="small"
                >
                  <ThumbDownIcon sx={{ color: `#1A1B4B` }} fontSize="small" />
                </Button>
                <Button
                  sx={{ border: ` 1px solid #1A1B4B`, mx: 1 }}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    wishListHandler(JobById?._id);
                  }}
                >
                  <BookmarkBorderIcon
                    sx={{ color: `#1A1B4B` }}
                    fontSize="small"
                  />
                </Button>
                <Button
                  sx={{ background: `#1A1B4B` }}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    appliedJobHandler(JobById?._id);
                  }}
                >
                  {isApplied ? (
                    <CircularProgress size="1.5rem" color="inherit" />
                  ) : (
                    "Marked as Applied"
                  )}
                </Button>
              </Box>

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
      </Box>
    </>
  );
};

export default HomeJobs;
