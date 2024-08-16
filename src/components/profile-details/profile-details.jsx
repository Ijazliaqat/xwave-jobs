import { Avatar, Box, Card, Typography } from "@mui/material";
import React from "react";

const ProfileDetails = () => {
  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);
  return (
    <>
      <Box sx={{ p: 3, mt: 9 }}>
        <Card className="flex items-center py-5" sx={{ background: "#EAF4FE" }}>
          <Avatar
            sx={{ height: 70, width: 70 }}
            alt="Profile Avatar"
            src={""}
            className="ml-6"
          />
          <div className="ml-4">
            <Typography variant="h5">{user?.name}</Typography>
            <Typography variant="body1">{user?.email}</Typography>
          </div>
        </Card>
      </Box>
    </>
  );
};

export default ProfileDetails;
