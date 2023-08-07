import {
    Card,
    CardHeader,
    Container,
    Row,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    CardBody,
    Col,
  } from "reactstrap";
  import NormHeader from "components/Headers/NormalHeader/NormHeader";
  import ParentPermission from "./ParentPermission/ParentPermission";
  import ChildPermission from "./ChildPermission/ChildPermission";
  import React, { useState } from "react";
  
  const Permissions = (props) => {
    const [activeTab, setActiveTab] = useState("parent");
    const toggleTab = (tab) => {
      if (activeTab !== tab) {
        setActiveTab(tab);
      }
    };
    
    return (
      <>
        <NormHeader />
        <Container className="mt--7" fluid>
        <Row className="mt-2 w-100">
            <Col className="mb-5 w-100">
                <Card className="shadow w-100">
                    <CardHeader className="border-0">
                    <Nav tabs={true}>
                        <NavItem>
                        <NavLink
                            className={activeTab === "parent" ? "active" : ""}
                            onClick={() => toggleTab("parent")}
                        >
                            Parent Permissions
                        </NavLink>
                        </NavItem>
                        <NavItem>
                        <NavLink
                            className={activeTab === "child" ? "active" : ""}
                            onClick={() => toggleTab("child")}
                        >
                            Child Permissions
                        </NavLink>
                        </NavItem>
                    </Nav>
                    </CardHeader>
                    <CardBody className="p-0">
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="parent">
                            <ParentPermission/>
                        </TabPane>

                        <TabPane tabId="child">
                            <ChildPermission/>
                        </TabPane>
                    </TabContent>
                    </CardBody>
                </Card>
            </Col>
        </Row>
      </Container>
      </>
    );
  };
  
  export default Permissions;
  