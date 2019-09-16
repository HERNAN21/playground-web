import React from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import IndexHeader from "components/Headers/IndexHeader.jsx";
import AuthFooter from "components/Footers/AuthFooter.jsx";

class Index extends React.Component {
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="main-content">
          <IndexHeader />
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Index;
