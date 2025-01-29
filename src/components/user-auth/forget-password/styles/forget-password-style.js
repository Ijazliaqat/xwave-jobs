export const inputBorder = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "&.Mui-error": {
      "& > fieldset": { borderColor: "#d32f2f" },
    },
  },
};

export const inputBorderDefault = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& > fieldset": { borderColor: "#E5E7EB" },
    "&:hover fieldset": { borderColor: "#2E026D" },
    "&.Mui-focused fieldset": { borderColor: "#2E026D" },
  },
};

