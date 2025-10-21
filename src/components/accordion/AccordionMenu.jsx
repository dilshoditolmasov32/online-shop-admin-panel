import { useRef, useState } from "react";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import AccordionSummary from "@mui/material/AccordionSummary";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";

import "./AccordionMenu.css";

export default function AccordionMenu() {
  const [checkedItems, setCheckedItems] = useState({});
  const [values, setValues] = useState({
    numberformatOne: "1000",
    numberformatTwo: "10000000",
  });
  const contentRef = useRef(null);

  const theme = createTheme({
    typography: {
      fontFamily: "Neometric",
    },
  });

  const handleCheckBoxChange = (id) => {
    console.log(id);
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const categories = [
    {
      id: "1",
      title: "Yotoqxona mebellari",
      subcategories: [
        { id: "1-1", name: "Krovatlar" },
        { id: "1-2", name: "Shkaflar" },
        { id: "1-3", name: "Tumba va komodlar" },
      ],
    },
    {
      id: "2",
      title: "Oshxona mebellari",
      subcategories: [
        { id: "2-1", name: "Stol va stullar" },
        { id: "2-2", name: "Oshxona garniturlari" },
        { id: "2-3", name: "Shkafchalar" },
      ],
    },
    {
      id: "3",
      title: "Mehmon xona mebellari",
      subcategories: [
        { id: "3-1", name: "Divanlar" },
        { id: "3-2", name: "Kreslolar" },
        { id: "3-3", name: "Stollar" },
      ],
    },
    {
      id: "4",
      title: "Ofis mebellari",
      subcategories: [
        { id: "4-1", name: "Ish stollari" },
        { id: "4-2", name: "Ofis stullari" },
        { id: "4-3", name: "Javonlar" },
      ],
    },
    {
      id: "5",
      title: "Bolalar xonasi mebellari",
      subcategories: [
        { id: "5-1", name: "Bolalar krovatlari" },
        { id: "5-2", name: "O‘yinchoq javonlari" },
        { id: "5-3", name: "Stol va stullar" },
      ],
    },
  ];

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="accordion-menu" ref={contentRef}>
        <h3>Kategoriyalar</h3>

        {categories?.map((category) => (
          <Accordion
            key={category.id}
            disableGutters
            square
            elevation={0}
            sx={{
              background: "none",
              border: "none",
              boxShadow: "none",
              fontFamily: "Neometric",

              width: {
                md: "100%",
              },
              "&::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${category.id}-content`}
              id={`panel${category.id}-header`}
              key={category.id}
              sx={{
                borderColor: "none",
                boxShadow: "none",
                borderBottom: "none",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            >
              <Typography
                component="span"
                sx={{
                  border: "none",
                  color: "#7D7D7D",
                  fontSize: {
                    md: "18px",
                    xl: "22px",
                  },
                  ".Mui-expanded &": {
                    color: "#000000",
                  },
                }}
              >
                {category.title}
              </Typography>
            </AccordionSummary>

            {category?.subcategories?.map((el) => (
              <div className="subcategory-list" key={el.id}>
                <p>{el.name}</p>
                <Checkbox
                  checked={!!checkedItems[el.id]}
                  onChange={() => handleCheckBoxChange(el.id)}
                  disableRipple
                  sx={{
                    padding: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&.Mui-focusVisible": {
                      backgroundColor: "transparent",
                    },
                    "&.Mui-active": {
                      backgroundColor: "transparent",
                    },
                  }}
                  icon={
                    <span
                      style={{
                        width: 25,
                        height: 25,
                        display: "inline-block",
                        borderRadius: 6,
                        backgroundColor: "#D9D9D9",
                      }}
                    />
                  }
                  checkedIcon={
                    <span
                      style={{
                        width: 25,
                        height: 25,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 6,
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                      >
                        <path
                          d="M15.5294 0.409577C15.819 0.682827 15.9881 1.05968 15.9994 1.45728C16.0107 1.85487 15.8632 2.24066 15.5895 2.52982L7.06932 11.5309C6.93124 11.6765 6.7653 11.793 6.58131 11.8736C6.39732 11.9541 6.19902 11.9971 5.99812 11.9999C5.79722 12.0027 5.59779 11.9652 5.41163 11.8898C5.22546 11.8144 5.05633 11.7026 4.91422 11.5609L0.403539 7.06034C0.13795 6.77596 -0.00663846 6.39983 0.000234249 6.01118C0.00710696 5.62253 0.164905 5.25172 0.440383 4.97686C0.715861 4.702 1.08751 4.54456 1.47704 4.5377C1.86656 4.53085 2.24355 4.67511 2.52857 4.9401L5.94667 8.34849L13.4043 0.469584C13.6782 0.180545 14.0559 0.0118539 14.4544 0.000601156C14.8529 -0.0106516 15.2395 0.136455 15.5294 0.409577Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  }
                />
              </div>
            ))}
          </Accordion>
        ))}

        <div className="price-sort">
          <h4>Narx, So’m</h4>
          <div className="price-container">
            <NumericFormat
              // value={values.numberformatOne}
              onChange={handleChange}
              customInput={TextField}
              thousandSeparator=" "
              valueIsNumericString
              variant="standard"
              placeholder="от"
              color="#B9B9B9"
              InputProps={{ disableUnderline: true }}
              sx={{
                backgroundColor: "#FFFFFF",
                outline: "none",
                border: "1px solid #B9B9B9",
                borderRadius: "10px",
                fontSize: "18px",
                color: "#B9B9B9",
                fontFamily: "Neometric",

                "& .MuiOutlinedInput-root": {
                  fontFamily: "Neometric",
                  fontSize: "18px",
                  lineHeight: "22px",
                  borderRadius: "10px",
                  color: "#B9B9B9",
                },
                "& .MuiInputBase-input": {
                  padding: "14px 20px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  color: "#000000",
                  "&:-webkit-autofill": {
                    boxShadow: "0 0 0 1000px #FFFFFF inset !important",
                    WebkitTextFillColor: "#000000 !important",
                    caretColor: "#000000",
                  },
                  "&::placeholder": { color: "#7D7D7D",
              },
                },
              }}
            />

            <NumericFormat
              // value={values.numberformatTwo}
              onChange={handleChange}
              customInput={TextField}
              thousandSeparator=" "
              valueIsNumericString
              variant="standard"
              placeholder="до"
              InputProps={{ disableUnderline: true }}
              sx={{
                backgroundColor: "#FFFFFF",
                outline: "none",
                border: "1px solid #B9B9B9",
                borderRadius: "10px",
                fontSize: "18px",
                fontFamily: "Neometric",
                "& .MuiOutlinedInput-root": {
                  fontFamily: "Neometric",
                  fontSize: "18px",
                  borderRadius: "10px",
                  lineHeight: "22px",
                },
                "& .MuiInputBase-input": {
                  padding: "14px 20px",
                  color: "#7D7D7D",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  "&:-webkit-autofill": {
                    boxShadow: "0 0 0 1000px #FFFFFF inset !important",
                    WebkitTextFillColor: "#000000 !important",
                    caretColor: "#000000",
                  },
                  "&::placeholder": { color: "#7D7D7D"}
                },
              }}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
