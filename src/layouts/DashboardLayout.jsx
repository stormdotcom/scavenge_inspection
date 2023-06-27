
import { Box } from "@mui/material";
import Header from "../modules/common/header/Header";
import Footer from "../modules/common/footer/Footer";

const DashboardLayout = ({ children }) => {
    return (
        <Box
            sx={{ minHeight: "100vh", width: 1 }}
        >
            <Header />
            <Box sx={{ display: "flex", justifyContent: "space-between ", height: "100%" }}>
                <Box className="scav" sx={{ flexGrow: 1, overflowX: "auto", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 82px) !important ", width: "100%", overflowY: "auto" }}>
                    <Box
                        sx={{ bgcolor: "white.main", borderRadius: "20px", flexGrow: 1 }}
                    >
                        {children}
                    </Box>
                    <Footer />
                </Box>
            </Box>
        </Box >
    );
};

export default DashboardLayout;

