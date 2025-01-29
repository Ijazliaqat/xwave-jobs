export const inputBorder = {
  "& .MuiOutlinedInput-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FF0000",
      borderRadius: "8px",
      borderWidth: "2px",
      fontSize: "16px",
    },
  },
  "& .MuiInputLabel-outlined": {
    color: "#FF0000",
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
      borderColor: "#08008F",
      borderWidth: "1px",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#08008F",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-outlined": {
   
  },
  "&:hover .MuiInputLabel-outlined": {
    
  },
  
  "& .MuiInputLabel-outlined.Mui-focused": {
    color: "#08008F",
    fontWeight: "bold",
  }
  

};
