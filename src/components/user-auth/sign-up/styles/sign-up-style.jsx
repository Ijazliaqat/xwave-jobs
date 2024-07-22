export const inputBorder = {
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#808080",
      borderRadius: "8px",
      borderWidth: "2px",
      fontSize: "16px",
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "#808080",
    fontWeight: "bold",
  },
};

export const inputBorderDefault = {
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "8px",
      fontSize: "16px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#808080",
      borderWidth: "1px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#808080",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#808080",
    fontWeight: "bold",
  }
};
