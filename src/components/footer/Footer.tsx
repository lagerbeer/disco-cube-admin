import * as React from "react";
import { Segment } from "../segment/Segment";
import { Menu } from "antd";
import { CodeOutlined, UserOutlined, AppstoreOutlined, DashboardOutlined } from "@ant-design/icons";
import { Horizontal } from "gls/lib";
import { routes } from "../../routes";

interface Props {
  currentPath: string;
  onGotoPath: (path: string) => any;
}

export const Footer: React.FC<Props> = ({ currentPath, onGotoPath }) => {
  console.log("currentPath", currentPath);

  return (
    <Segment style={{ padding: 8 }} spacing={10} width="100%" maxWidth={500}>
      <Horizontal horizontalAlign="center">
        <Menu selectedKeys={["/" + currentPath.split("/")[1]]} mode="horizontal">
          <Menu.Item key="/stats" onClick={() => onGotoPath(routes.stats.path())}>
            <DashboardOutlined style={{ fontSize: "2em" }} />
          </Menu.Item>
          <Menu.Item key="/terminal" onClick={() => onGotoPath(routes.terminal.path())}>
            <CodeOutlined style={{ fontSize: "2em" }} />
          </Menu.Item>
          <Menu.Item key="/apps" onClick={() => onGotoPath(routes.apps.path())}>
            <AppstoreOutlined style={{ fontSize: "2em" }} />
          </Menu.Item>
          <Menu.Item key="/account" onClick={() => onGotoPath(routes.account.path())}>
            <UserOutlined style={{ fontSize: "2em" }} />
          </Menu.Item>
        </Menu>
      </Horizontal>
    </Segment>
  );
};
