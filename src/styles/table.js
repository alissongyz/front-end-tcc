import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "100%",
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    maxWidth: "80%",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    backgroundColor: "#2D8AE0",
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    color: "white",
    backgroundColor: "grey",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));