import { Box, Button, Card, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { jobsData } from "../home/helper/data";
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';

const MyJobs = () => {
  const [gridCol, setGridCol] = useState(12);

  const jobDetailsHandler = () => {
    setGridCol(6);
  };
  return (
    <Box sx={{ p: 3, mt: 9 }}>
      <Box className="flex justify-between my-3">
        <span className="">My Jobs</span>
        <div>
          <Button
            className="font-bold"
            sx={{ background: `#1A1B4B`, mr: 1 }}
            variant="contained"
            size="small"
          >
            Saved
          </Button>
          <Button
            className="font-bold"
            sx={{ border: ` 1px solid #1A1B4B`, color: "#1A1B4B" }}
            variant="outlined"
            size="small"
          >
            Applied
          </Button>
        </div>
      </Box>

      <Grid container spacing={3}>
        <Grid item md={gridCol}>
          {jobsData?.map((job) => {
            return (
              <>
                <Card
                  className="p-3 mb-4"
                  key={job?.id}
                  onClick={jobDetailsHandler}
                >
                  <Box className="flex justify-between">
                    <Typography variant="h6">{job?.title}</Typography>
                    <Typography variant="body1">{job?.type}</Typography>
                  </Box>
                  <Typography variant="body2">{job?.companyName}</Typography>
                  <hr className="my-2" />
                  <Typography variant="h6">Job Description</Typography>
                  <Typography variant="body2">{job?.desp}</Typography>
                  <Box className="flex justify-between my-3">
                    <span className="">Just Posted</span>
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

        <Grid
          sx={{ display: `${gridCol === 12 ? "none" : "block"}` }}
          md={5.9}
          mt={3}
          ml={1}
        >
          <Card className="p-3 mb-4">
            <Typography className="font-bold" variant="h6">
              UI UX Designer
            </Typography>
            <Typography variant="body1">Berserk Corp</Typography>

            <Box className="flex justify-between mt-5">
              <div>
                <div>
                  <h5 className="font-bold">Pay</h5>
                  <span>Rs 50,000 a month</span>
                </div>
                <div className="my-5">
                  <h5 className="font-bold">Job Type</h5>
                  <span>Full Time</span>
                </div>
                <div>
                  <h5 className="font-bold">Date Posted</h5>
                  <span>Today</span>
                </div>
              </div>
              <div>
                <div>
                  <h5 className="font-bold">Location</h5>
                  <span>Karachi</span>
                </div>
                <div className="my-5">
                  <h5 className="font-bold">Work Environment</h5>
                  <span>Remote</span>
                </div>
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
              >
                Marked as Applied
              </Button>
            </Box>

            <div className="my-5">
              <h5 className="font-bold">Job Description</h5>
              <p>
                At Berserk Corp, we create exceptional products that enhance our
                customers' lives. Join our innovative and collaborative team as
                a Remote UI/UX Designer.
              </p>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Key Responsibilities:</h5>
              <ul className="ml-7 list-disc">
                <li>
                  Collaborate with cross-functional teams to understand project
                  requirements and user needs
                </li>
                <li>
                  Design intuitive user interfaces that effectively communicate
                  the product vision and enhance user engagement
                </li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Requirements:</h5>
              <ul className="ml-7 list-disc">
                <li>Proven experience of 2 years as a UI/UX Designer.</li>
                <li>
                  Proficient in design tools such as Adobe XD, Sketch, or Figma.
                </li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Education:</h5>
              <ul className="ml-7 list-disc">
                <li>Bachelor's (Required)</li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Language:</h5>
              <ul className="ml-7 list-disc">
                <li>English (Required)</li>
              </ul>
            </div>
            <div className="my-5">
              <h5 className="font-bold">Apply:</h5>
              <span>application.link.form.com</span>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyJobs;
