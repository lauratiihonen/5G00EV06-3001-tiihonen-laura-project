//React Select styles to the dropdown menu
const customStyles = {
  //Menu opened
  menu: (provided, state) => ({
    ...provided,
    width: "23rem",
    backgroundColor: "grey",
    padding: "1rem",
  }),
  //Menu options
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "white" : "grey",
    backgroundColor: state.isFocused ? "darkGrey" : "grey",
    textAlign: "center",
    color: "white",
  }),
  //Departure and destination text
  placeholder: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  //Menu container placement
  container: (provided, state) => ({
    ...provided,
    width: "25rem",
    padding: "1rem",
    textAlign: "center",
  }),
  //User search input
  input: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  //No stations found
  noOptionsMessage: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  //Selected station color
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
  }),

  control: (base, state) => ({
    ...base,
    "&:hover": { borderColor: "gray" }, // border style on hover
    border: "1px solid white", // default border color
    boxShadow: "none", // no box-shadow
    backgroundColor: "grey",
  }),
};

export default customStyles;
