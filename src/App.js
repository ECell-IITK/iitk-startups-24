import Spline from "@splinetool/react-spline";
import Navbar from "./Navbar";
import "./app.css";
import Grid from "./Grid";
import data from "./data2.json";
import ParticlesComponent from "./ParticlesComponent";
import { useEffect, useState, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AsyncImage } from 'loadable-image'
import { Modal, TextField, Box, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const unicorn_status = [ "Any","Unicorn", "Soonicorn", "Minicorn"];
const locations = ["Any","Noida", "Gurgaon", "Bengaluru", "Mumbai", "Palo Alto", "San Jose", "San Francisco",
"Santa Clara", "San Mateo", "Thiruvananthapuram", "Gurugram", "Redwood City", "Pune",
"Hyderabad", "Chennai", "Goleta", "Sunnyvale", "Claymont", "Delhi", "Thane", "Cambridge",
"Kolkata", "Menlo Park", "Mountain View", "Bothell", "Singapore", "Ahmedabad", "Milpitas",
"Bhopal", "Panaji", "Los Altos", "Boston", "Seattle", "Boulder", "Westlake Village",
"New Castle", "Brossard", "Austin", "Cumming", "Kanpur", "Beaverton", "Plano", "Songpa-gu",
"Ahmedabad", "Aliso Viejo", "Wilmington", "Newark", "Songpa-gu", "West Lafayette", "Walnut",
"Redmond", "Reston", "Sunnyvale", "Toronto", "Madrid", "Riga", "St Lucia", "Princeton",
"Karnal", "Sahibzada Ajit Singh Nagar", "Lucknow", "Chicago", "Indore", "Westerville", "Udaipur",
"Ann Arbor"]

const companyStages = [
  "Any",
  "Seed",
  "Series A",
  "Series B",
  "Series C",
  "Series D",
  "Series E",
  "Series F",
  "Series H",
  "Public",
  "Acquired",
  "Acqui-Hired",
  "Unfunded",
  "Deadpooled",
  "Late Stage",
  "Funding Raised"
];

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,255,255)",
    },
    secondary: {
      main: "rgb(255,255,255)",
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  maxWidth:"80vw",
  maxHeight:"60vh",
  overflowY:"scroll",
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius:"10px",
  margin:"10px",
  p: 4,
};

function App() {
  const [result, setResult] = useState(data.slice(0, 50));
  const [unicornStatus, setUnicornStatus] = useState("");
  const [location,setLocation] = useState("");
  const [companyStage,setCompanyStage] = useState("");
  const [searchText,setSearchText] = useState("");
  const [companyData,setCompanyData] = useState({});

  const containerRef = useRef(null);

  // Function to check if an element is in view
  const isInView = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  // Function to lazy load images
  const lazyLoadImages = () => {
    const elements = containerRef.current.querySelectorAll('img[data-src]');
    elements.forEach((element) => {
      if (isInView(element)) {
        element.src = element.dataset.src;
        element.removeAttribute('data-src');
      }
    });
  };

  useEffect(() => {
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadImages);
    return () => {
      window.removeEventListener('scroll', lazyLoadImages);
    };
  }, []);

  const handleData = () => { 

    setResult(data.filter((item) => 
      ((unicornStatus === "Any" || unicornStatus === "") ? 1 : item.UnicornStatus.toLowerCase() === unicornStatus.toLowerCase())  &&
      ((location === "Any" || location === "") ? 1 : item.Location.toLowerCase() === location.toLowerCase()) &&
      ((companyStage === "Any" || companyStage === "") ? 1 : item.CompanyStage.toLowerCase() === companyStage.toLowerCase()) &&
      ((searchText === "") ? 1 : item.Name.toLowerCase().includes(searchText.toLowerCase()))
    ).slice(0,100))

    // if ((unicornStatus === "Any" || unicornStatus==="") && (location === "Any" || location=== "") && (companyStage==="Any" || companyStage==="")) {
    //   setResult(data.slice(0, 50));
    // }else if(unicornStatus === "Any" || unicornStatus===""){
    //   setResult(data.filter((item) => item.Unicorn_Status.toLowerCase() === unicornStatus.toLowerCase()));
    // }else if(location === "Any" || location===""){
    //   setResult(data.filter((item) => item.Location.toLowerCase() === location.toLowerCase()))
    // }
    //  else {
    //   console.log(unicornStatus);
    //   setResult(data.filter((item) => item.Unicorn_Status.toLowerCase() === unicornStatus.toLowerCase() && item.Location.toLowerCase() === location.toLowerCase()));
    // }
  }
  useEffect(() => {
    handleData();
  }, [unicornStatus,location,companyStage,searchText]);
  const handleChangeUnicornStatus = (event) => {
    setUnicornStatus(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  }
  const handleChangeCompanyStage = (event) => {
    setCompanyStage(event.target.value);
  }
  const handleSearchText = (event) => {
    setSearchText(event.target.value);
    /* setResult(data.filter((item) => item.Name.toLowerCase().includes(searchText.toLowerCase()))); */
  }

  function increaseByOne(index){
    return index + 1;
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Navbar />
        <Grid />
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{border:"0px"}}
        
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {companyData.Name}
          </Typography>
          <Typography variant="body1">
          <img src={companyData.ImageLink} alt={companyData.Name} height="30px"/>
        </Typography>
        <Typography variant="body1">
          Website: <a href={companyData.WebsiteLink}>{companyData.WebsiteLink}</a>
        </Typography>
        <Typography variant="body1">
          Short Description: {companyData.ShortDescription}
        </Typography>
        <Typography variant="body1">
          <b>Funding:</b> {companyData.Funding}
        </Typography>
        <Typography variant="body1">
          <b>Location:</b> {companyData.Location}
        </Typography>
        <Typography variant="body1">
          <b>Founded Year:</b> {companyData.FoundedYear}
        </Typography>
        <Typography variant="body1">
          <b>Investor Name:</b> {companyData.InvestorName}
        </Typography>
        <Typography variant="body1">
          <b>Employee Count:</b> {companyData.EmployeeCount}
        </Typography>
        <Typography variant="body1">
          <b>Valuation:</b> {companyData.Valuation}
        </Typography>
        <Typography variant="body1">
          <b>Annual Revenue:</b> {companyData.AnnualRevenue}
        </Typography>
        <Typography variant="body1">
          <b>Founder and Key People:</b> {companyData.FounderandKeyPeople}
        </Typography>
        <Typography variant="body1">
          <b>Domain Name:</b> {companyData.DomainName}
        </Typography>
        <Typography variant="body1">
          <b>EBIDTA:</b> {companyData.EBIDTA}
        </Typography>
        <Typography variant="body1">
          <b>Net Profit:</b> {companyData.NetProfit}
        </Typography>
        <Typography variant="body1">
          <b>Sector:</b> {companyData.Sector}
        </Typography>
        <Typography variant="body1">
          <b>Business Model:</b> {companyData.BusinessModel}
        </Typography>
        <Typography variant="body1">
          <b>Associated Legal Entity:</b> {companyData.AssociatedLegalEntity}
        </Typography>
        <Typography variant="body1">
          <b>Funding Rounds:</b> {companyData.FundingRounds}
        </Typography>
        <Typography variant="body1">
          <b>Unicorn Status:</b> {companyData.UnicornStatus}
        </Typography>
        <Typography variant="body1">
          <b>Funding Round Facilitators:</b> {companyData.FundingRoundFacilitators}
        </Typography>

        </Box>
      </Modal>
        <ParticlesComponent />
        <div className="ball2"></div>
        <div
          style={{
            overflow: "hidden",
            position: "relative",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {/* <Spline
            style={{ position: "absolute" }}
            scene="https://prod.spline.design/GzVVx11nnOZkogxx/scene.splinecode"
          /> */}
          <div className="ball1"></div>
          <div
            style={{
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "110px",
              gap: "10px",
              position: "relative",
              // overflowY: "hidden",
              // height: "100vh",
            }}
            className="iitkStartupsHeading"
          >
            <span className="iitkHeading">IIT Kanpur's </span>
            <span className="iitkHeadingGap"></span>
            <span className="startupsHeading"> Startups</span>
          </div>
          <div
            style={{
              // fontWeight: "400",
              fontFamily: "Poppins",
              fontSize: "calc(29px + 5 * ((100vw - 320px) / 535))",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              {" "}
              GENESIS{" "}
            </span>
          </div>
          <div
            style={{
              textAlign: "center",
              fontWeight: "500",
              fontSize: "calc(10px + 4.3 * ((100vw - 320px) /535))",
              padding: "25px",
              color: "wheat",
            }}
          >
            AT IIT KANPUR, INNOVATION MEETS AMBITION, CREATING AN
            ENTREPRENEURIAL EPICENTER. OUR VIBRANT ECOSYSTEM BIRTHS STARTUPS
            THAT REDEFINE THE FUTURE
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "20px",
              // height: "100px",
              // width: "100vw",
            }}
          >
            <img
              style={{ filter: "invert(100%)", cursor: "pointer" }}
              src="./images/arrow.png"
              alt=""
              srcset=""
              width="30px"
              // height="30px"
            />
          </div>
        </div>
        <div
          style={{ maxWidth: "100vw", position: "relative"}}
          className="data-circles-parent"
        >
          <div className="datacircle datacircle1">
            <div></div>
            <div></div>
            <div className="text-in-data-circle">1300+ Startups</div>
          </div>
          <div className="datacircle datacircle2">
            <div></div>
            <div></div>
            <div className="text-in-data-circle">14 Unicorns</div>
          </div>
          <div className="datacircle datacircle3">
            <div></div>
            <div></div>
            <div className="text-in-data-circle">29+ Soonicorn</div>
          </div>

          {/* <Spline
            style={{ position: "absolute" }}
            scene="https://prod.spline.design/v1cImhFNdRf5HDZg/scene.splinecode"
          /> */}
        </div>
        <div className="before-startups-data">
          STARTUPS FLOURISH THROUGH THE IIT KANPUR ECOSYSTEM
        </div>
        <div className="filter-box">
          <ThemeProvider theme={theme}>
          <Paper
            elevation={3}
            style={{
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "1200px",
              margin: "auto",
              backgroundColor:"transparent",
              border:"2px solid white",
              color:"white"
            }}
          >
            <div
              style={{ width: "100%", display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",fontWeight:"500",color:"white",marginBottom:"10px"}}
            >
              <TextField onChange={handleSearchText} id="outlined-basic" label="Search" variant="outlined" className="textfield" InputLabelProps={{style:{color:"white"}}} InputProps={{style:{color:"white"}}}  style={{width:"70%",minWidth:"200px",border:"2px solid white",borderRadius:"5px"}}/>
            </div>
            <div style={{display:"flex",justifyContent:"space-around",gap:"10px",flexWrap:"wrap"}}>
            <FormControl size="100" className="textfield" InputProps={{style:{color:"white"}}} style={{backgroundColor:"",border:"2px solid white",borderRadius:"5px"}}>
              <InputLabel id="input1" sx={{color:"white"}}>
                Unicorn Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={unicornStatus}
                label="Unicorn Status"
                onChange={handleChangeUnicornStatus}
                style={{width:"200px",color:"white"}}
                InputLabelProps={{style:{color:"white"}}}
                // autoWidth
                >
                {unicorn_status.map((item, index) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl size="100" style={{border:"2px solid white",borderRadius:"5px"}}>
              <InputLabel id="input2" sx={{color:"white"}}>
                Location
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                label="Location"
                onChange={handleChangeLocation}
                style={{width:"200px",color:"white"}}
                
                // autoWidth
                >
                {locations.map((item, index) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
            <FormControl size="100" style={{border:"2px solid white",borderRadius:"5px"}}>
              <InputLabel id="input3" sx={{color:"white"}}>
                Company Stage
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={companyStage}
                label="Location"
                onChange={handleChangeCompanyStage}
                style={{width:"200px",color:"white"}}
                // autoWidth
                >
                {companyStages.map((item, index) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
            </FormControl>
                </div>
          </Paper>
          </ThemeProvider>
        </div>
        <div
          style={{
            // margin: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          ref={containerRef}
        >
          {result.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                  maxWidth: "220px",

                  borderRadius: "10px",
                  backgroundColor: "white",
                  margin: "10px",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  textDecoration: "none",
                  color: "black",
                  boxShadow:
                    "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                  zIndex: "4",
                  cursor: "pointer",
                }}
                /* href={item.WebsiteLink} */
                onClick={() => {setCompanyData(item);handleOpen();}}
                target="_blank"
                rel="noreferrer"
              >
                <div style={{ width: "200px", height: "200px" }}>
                  {/* <img
                    data-src={`https://www.ecelliitk.org/Images/IITKStartups/image_${increaseByOne(item.Id)}.jpg`}
                    alt=""
                    src="./placeholder.jpg"
                    srcset=""
                    // height="200px"
                    width="200px"
                    style={{ width: 200, height: 200, borderRadius: 10 }} 
                  /> */}
                  <AsyncImage
                  src={"https://www.ecelliitk.org/Images/IITKStartups/image_"+increaseByOne(item.Id)+".jpg"}
                  style={{ width: 200, height: 200 }}
                  loader={<div style={{ background: '#888' }}/>}
                  error={<div style={{ background: '#eee' }}/>}
                />
                </div>
                <div style={{ textAlign: "justify" }}>
                  <div style={{ fontWeight: "500", fontSize: "24px" }}>
                    {item.Name}
                  </div>
                  <div style={{ fontWeight: "400", fontSize: "15px" }}>
                    {item.ShortDescription}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
