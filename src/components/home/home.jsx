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
  Skeleton,
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showAllJobs, setShowAllJobs] = useState(true);

  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);

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

  // Handle search functionality when the search button is clicked
  const handleSearchClick = () => {
    setShowAllJobs(false);
    const filtered = allJobs?.filter((job) =>
      job?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job?.company?.toLowerCase().includes(searchQuery.toLowerCase())

    );
    setFilteredJobs(filtered);
  };

  // Show all jobs by default before search is triggered
  useEffect(() => {
    if (allJobs && showAllJobs) {
      setFilteredJobs(allJobs);
    }
  }, [allJobs, showAllJobs]);


  return (
    <>
      <ToastContainer autoClose={3000} />

      <Box sx={{ p: 3, mt: 5 }}>
        <FormControl sx={{ width: { xs: "85vw", sm: "90vw", md: "50vw", lg: "50vw" }, m: 1, }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Job title, keywords or company
          </InputLabel>
          <OutlinedInput

            size="small"
            // aligned the button by giving the pr :0  and also handle the responsiveness
            sx={{
              pr: 0, width: "100%", "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1A1B4B",
              },
            }}
            id="outlined-adornment-password"
            type={"text"}

            value={searchQuery} // Add this line
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query as user types

            startAdornment={
              <InputAdornment position="">
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
                <Button
                  sx={{
                    fontSize: "16px", fontWeight: "600", fontFamily: "Poppins",
                    backgroundColor: "#1A1B4B",
                    width: { xs: "100px", sm: "120px" },
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#1A1B4B",
                    },
                  }}
                  onClick={handleSearchClick}
                >
                  Search
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>

        <Grid container spacing={3}>
          {!allJobsLoading ? (
            <Grid item md={gridCol}>
              {filteredJobs?.map((job) => {
                return (
                  <>
                    <Card
                      className="p-3 pt-5 m-1 mb-4 cursor-pointer"
                      key={job?.id}
                      onClick={() => {
                        jobDetailsHandler(job);
                      }}
                      // i have given the 50% width and   flexshrink
                      sx={{
                        border: '1px solid #E6E6E6', 
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', 
                        width: { xs: "95%", sm: "100%", md: "100%", lg: "37vw" },
                        flexShrink: 0,
                        minWidth: { xs: "300px", md: "400px", lg: "40vh" }
                      }}
                    >
                      <Box className="flex justify-between">
                        <Box sx={{ width: "100%" }} className="flex justify-between items-baseline">
                          <Typography sx={{   fontSize: { xs: "15px", md: "18px" },fontWeight: "600", color: "#404040", fontFamily: "Poppins" }} variant="h6">
                            {job?.title}
                          </Typography>
                          <Typography  sx={{  fontSize: { xs: "14px", md: "16px" }, fontWeight: "400", fontFamily: "Poppins" }} variant="h6">Karachi(Remote)</Typography>
                        </Box>
                        <Typography variant="body1">{job?.type}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: "16px", fontWeight: "400", fontFamily: "Poppins" }} variant="body2">{job?.company}</Typography>
                      <hr className="my-2" />
                      <Typography sx={{ fontSize: "16px", fontWeight: "600", fontFamily: "Poppins" }} variant="h6">Job Description</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "400", fontFamily: "DM Sans", color: "#404040" }} variant="body2">
                        {job?.description}
                      </Typography>
                      <Box className="flex justify-between my-3">
                        <Typography sx={{ fontSize: "14px", fontWeight: "400", fontFamily: "DM Sans", color: "#555555" }} className="">
                          {moment(job?.datePosted).format("MMMM Do YYYY")}
                        </Typography>
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

                          {/* OnClick triggered in this button which  Prevents the description from opening and Calls wishlist handler only */}
                          <Button
                            disabled={user?.isAdmin}
                            sx={{ border: ` 1px solid #1A1B4B` }}
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              wishListHandler(job?._id);
                            }}
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
              <Box mt={2} sx={{ display: "flex", flexDirection: "column" }}>
                {[...Array(5)].map((_, index) => (
                  <Card
                    key={index}
                    className="p-3 m-1 mb-4 cursor-pointer"
                    sx={{
                      width: { xs: "80vw", sm: "90vw", lg: "37vw" },
                      flexShrink: 0,
                      minWidth: { xs: "300px", md: "400px", lg: "40vh" },
                    }}
                  >
                    <Skeleton variant="text" height={30} width="100%" />
                    <Skeleton variant="rectangular" height={70} width="100%" />
                    <Box className="flex justify-between my-3" width="100%">
                      <Skeleton variant="text" width="30%" />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                      </Box>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          )}

          <Grid
            sx={{ display: `${gridCol === 12 ? "none" : "block"}` }}
            md={5.9}
            mt={3}
            ml={1}
          >
            {byIdLoading ? (
              <Card sx={{ width: "100%" }} className="p-3 mb-4 m-2">
                <Skeleton variant="text" height={40} width="100%" />
                <Skeleton variant="text" height={30} width="100%" />
                <Skeleton variant="rectangular" height={100} width="100%" />
                <Box className="flex justify-between mt-5" width="100%">
                  <Skeleton variant="text" width="45%" />
                  <Skeleton variant="text" width="45%" />
                </Box>
                <Box className="flex justify-end my-3" width="100%">
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={120} height={40} />
                </Box>
                <Skeleton variant="text" height={100} width="100%" />
                <Skeleton variant="text" height={100} width="100%" />
                <Skeleton variant="text" height={100} width="100%" />
                <Skeleton variant="text" height={100} width="100%" />
              </Card>
            ) : (
              <Card className="p-3 mb-4 m-2">
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
                  </div>
                </Box>
                <Box className="flex justify-end my-3">
                  <Button
                    disabled={user?.isAdmin}
                    sx={{ border: ` 1px solid #1A1B4B` }}
                    variant="outlined"
                    size="small"
                  >
                    <ThumbDownIcon sx={{ color: `#1A1B4B` }} fontSize="small" />
                  </Button>
                  <Button
                    disabled={user?.isAdmin}
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
                    disabled={user?.isAdmin}
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
                      return <li key={resp}>{resp}</li>;
                    })}
                  </ul>
                </div>
                <div className="my-5">
                  <h5 className="font-bold">Requirements:</h5>
                  <ul className="ml-7 list-disc">
                    {JobById?.requirements?.map((resp) => {
                      return <li key={resp}>{resp}</li>;
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
                      return <li key={lang}>{lang}</li>;
                    })}
                  </ul>
                </div>
                <div className="my-5">
                  <h5 className="font-bold">Apply:</h5>
                  <a href={JobById?.link}>{JobById?.link}</a>
                </div>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HomeJobs;