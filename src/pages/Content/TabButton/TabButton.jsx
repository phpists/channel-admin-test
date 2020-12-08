import React from "react";
import classnames from "classnames";
import { Button, Nav, NavItem, NavLink } from "reactstrap";

const TabButton = (props) => {
  const { activeTab, toggleTab, characters, videos } = props;
  const buttons = [
    { name: "Upload", tab: "3" },
    { name: "Playlists", tab: "1", count: 0, total: characters?.length },
    { name: "Videos", tab: "2", count: 0, total: videos?.length },
  ];
  return (
    <Nav className="border-0 navi" vertical>
      {buttons.map((b) => {
        return (
          <>
            {b.name === "Upload" ? (
              <NavItem>
                <NavLink
                  className="px-0"
                  className={classnames({
                    active: activeTab === b.tab,
                  })}
                  onClick={() => {
                    toggleTab(b.tab);
                  }}
                >
                  <Button className="w-100 mb-4" color="success">
                    {b.name}
                  </Button>
                </NavLink>
              </NavItem>
            ) : (
              <NavItem className="d-flex justify-content-between align-items-baseline">
                <NavLink
                  className="px-0"
                  className={classnames({
                    active: activeTab === b.tab,
                  })}
                  onClick={() => {
                    toggleTab(b.tab);
                  }}
                >
                  <i className="dripicons-star mr-2"></i> {b.name}
                </NavLink>
                <span>{b.total}</span>
              </NavItem>
            )}
          </>
        );
      })}
    </Nav>
  );
};

export default TabButton;
