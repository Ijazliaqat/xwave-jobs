import { Avatar, Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ProfileDetails = () => {
  const navigate = useNavigate();

  const userDetails = localStorage.getItem("token");

  // Convert the JSON string back to an object
  const { user } = JSON.parse(userDetails);
  return (
    <>
      <ToastContainer autoClose={3000} />
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

        <Box className="flex justify-end mt-5">
          <Button
            variant={"outlined"}
            onClick={() => {
              toast.success("Log Out Successfully!", {
                position: "top-right",
              });

              setTimeout(() => {
                navigate("/");
              }, 1500);
            }}
            sx={{
              border: ` 1px solid #1A1B4B`,
              color: "#1A1B4B",
            }}
            size="small"
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDetails;
