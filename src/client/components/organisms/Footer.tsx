import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <footer>
      <Box sx={{ bgcolor: "primary.main", color: "white", px: 14, py: 14 }}>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {/* Left section with logo and social links */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, justifyContent: "center", width: "35%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Image src="/images/logo.svg" width={80} height={80} alt="Logo Preview" />
              <Typography variant="h4">Travel Book</Typography>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 6, p: 4 }}>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </Link>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </Link>
              <Link href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </Link>
            </Box>
          </Box>

          {/* Right section with links */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 16, width: "65%" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, auto)", gap: 12 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ pb: 3 }}>
                  Company
                </Typography>
                <Link href="#">About Us</Link>
                <Link href="#">Contact</Link>
                <Link href="#">Support</Link>
                <Link href="#">News</Link>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ pb: 3 }}>
                  Legal
                </Typography>
                <Link href="#">Imprint</Link>
                <Link href="#">Privacy Policy</Link>
                <Link href="#">Terms of Use</Link>
              </Box>
            </Box>

            {/* Newsletter Section */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ pb: 3 }}>
                Newsletter
              </Typography>
              <Typography>Subscribe to our newsletter.</Typography>
            </Box>
          </Box>
        </Box>

        {/* Footer bottom */}
        <Box sx={{ width: "100%", borderTop: "1px solid white", my: 8 }} />
        <Typography textAlign="center">© 2024 Your Company - All rights reserved.</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
