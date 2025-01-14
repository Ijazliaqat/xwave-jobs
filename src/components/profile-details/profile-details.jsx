import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Card,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import { Edit } from "@mui/icons-material";

const ProfileDetails = () => {
  const userDetails = localStorage.getItem("token");
  const { user } = JSON.parse(userDetails);

  const [name, setName] = useState(user?.name || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  console.log(user.name);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("firstName", user?.name);
    setValue("lastName", user?.lastName);
    setValue("email", user?.email);
    setValue("phoneNumber", user?.phoneNumber);
  }, [userDetails]);

  const onSubmit = (data) => {
    setName(data.firstName);
    setLastName(data.lastName);
    setEmail(data.email);
    setPhoneNumber(data.phoneNumber);

    localStorage.setItem(
      "token",
      JSON.stringify({
        user: {
          name: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
        },
      })
    );
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      position: "top-right",
    });

    setShowVerifyButton(true);
  };
  const editProfile = () => {
    setIsEditing(true);
    setShowVerifyButton(false);
  }
  const handleVerifyClick = () => {
    toast.info("Verification code sent to your phone number", {
      position: "top-right",
    });
  };

  return (
    <>
      <ToastContainer autoClose={3000} />

      <Box sx={{ p: 3, mt: 9 }}>
        <Card
          sx={{
            background: "#EAF4FE",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: "10px",
          }}
        >
          <Avatar
            sx={{
              height: 80,
              width: 80,
              backgroundColor: "#1A1B4B",
              color: "#FFFFFF",
              fontSize: "32px",
            }}
          >
            {name.charAt(0)}
            {lastName.charAt(0)}
          </Avatar>
          <Box sx={{ textAlign: "left", flex: 1, marginLeft: "20px" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {name} {lastName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {email}
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            padding: "30px",
            marginTop: "20px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontWeight: "bold",
              marginBottom: "20px",
              textAlign: "left",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Edit Profile
              <button
                onClick={() => editProfile()}
                style={{ marginLeft: "15px" }}
              >
                <Edit sx={{ color: "black", fontSize: "20px" }} />
              </button>
            </Box>
          </Typography>


          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                  sx={{
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName ? errors.firstName.message : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                  sx={{
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName ? errors.lastName.message : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  disabled={!isEditing}
                  sx={{
                    borderRadius: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                    },
                  }}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    disabled={!isEditing}
                    sx={{
                      borderRadius: "10px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                    {...register("phoneNumber", {
                      required: "Phone Number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid phone number",
                      },
                    })}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber ? errors.phoneNumber.message : ""}
                  />
                  <Button
                    variant="outlined"
                    sx={{
                      color: "#1A1B4B",
                      borderColor: "#1A1B4B",
                      padding: "10px 15px",
                      textTransform: "lowercase",
                      borderRadius: "10px",
                      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "#EAF4FE",
                      },
                    }}
                    onClick={handleVerifyClick}
                  >
                    Verify
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "80px",
                gap: "15px",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#1A1B4B",
                  color: "#FFFFFF",
                  padding: "10px 25px",
                  borderRadius: "10px",
                  textTransform: "uppercase",
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    backgroundColor: "#15203D",
                  },
                }}
              >
                Save Changes
              </Button>
            </Box>
          </form>
        </Card>
      </Box>
    </>
  );
};

export default ProfileDetails;
