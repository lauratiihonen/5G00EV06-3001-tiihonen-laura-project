const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: "23rem",
    backgroundColor: "grey",
    padding: "1rem",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "white" : "grey",
    backgroundColor: state.isFocused ? "darkGrey" : "grey",
    textAlign: "center",
    color: "white",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  container: (provided, state) => ({
    ...provided,
    width: "25rem",
    padding: "1rem",
    textAlign: "center",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    backgroundColor: "grey",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    backgroundColor: "grey",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  noOptionsMessage: (provided, state) => ({
    ...provided,
    color: "white",
  }),
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
