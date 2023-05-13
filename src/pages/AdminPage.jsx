import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserTab from "../components/admin/users/UserTab";

function AdminPage() {
  return (
    <div className="m-4">
      <Tabs
        defaultActiveKey="users"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="users" title="users">
          <UserTab />
        </Tab>
        <Tab eventKey="service" title="service">
          <label>Service</label>
        </Tab>
        <Tab eventKey="carousel" title="carousel">
          <label>Carousel</label>
        </Tab>
      </Tabs>
    </div>
  );
}

export default AdminPage;
