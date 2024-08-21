import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import AppliedJobs from "../applied-jobs/applied-jobs";
import WishlistJobs from "../wishlist-jobs/wishlist-jobs";

const MyJobs = () => {
  const [gridCol, setGridCol] = useState(12);

  const [toggleBtn, setToggleBtn] = useState("applied");

  return (
    <Box sx={{ p: 3, mt: 5 }}>
      <Box className="flex justify-between my-3">
        <span className="">
          {toggleBtn === "applied" ? " My Jobs" : "Wish list Jobs"}
        </span>
        <div>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled button group"
          >
            <Button
              onClick={() => setToggleBtn("applied")}
              sx={{
                background: toggleBtn === "applied" ? `#1A1B4B` : "transparent",
                border: ` 1px solid #1A1B4B`,
                color: toggleBtn === "applied" ? "#fff" : "#1A1B4B",
              }}
            >
              Applied
            </Button>
            <Button
              variant={toggleBtn === "saved" ? "contained" : "outlined"}
              onClick={() => setToggleBtn("saved")}
              sx={{
                background: toggleBtn === "saved" ? `#1A1B4B` : "",
                border: ` 1px solid #1A1B4B`,
                color: toggleBtn === "saved" ? "#fff" : "#1A1B4B",
              }}
            >
              Saved
            </Button>
          </ButtonGroup>
        </div>
      </Box>

      {toggleBtn === "applied" && (
        <AppliedJobs gridCol={gridCol} setGridCol={setGridCol} />
      )}
      {toggleBtn === "saved" && (
        <WishlistJobs gridCol={gridCol} setGridCol={setGridCol} />
      )}
    </Box>
  );
};

export default MyJobs;
