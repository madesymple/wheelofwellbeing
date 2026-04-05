import { Container } from "@/components/container";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ background: "#FDF8F0", color: "#1A1A2E", minHeight: "100vh" }}>
      <Container className="md:px-11 px-2 pt-6">
        <Navbar />
        {children}
        <Footer />
      </Container>
    </div>
  );
};

export default Layout;
