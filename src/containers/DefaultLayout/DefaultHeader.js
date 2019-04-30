import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg';
import sygnet from '../../assets/img/brand/sygnet.svg';
import { useCurrentUser } from 'hooks';

const DefaultHeader = () => {
  const user = useCurrentUser();
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 89, height: 25, alt: 'Logo' }}
        minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      <Nav className="d-md-down-none" navbar>
        <NavItem className="px-3">
          <NavLink to="/dashboard" className="nav-link">
            Dashboard
          </NavLink>
        </NavItem>
      </Nav>
      <Nav className="ml-auto" navbar>
        <AppHeaderDropdown direction="down">
          <DropdownToggle nav>
            <img src={user.avatar} className="img-avatar" alt={user.email} />
          </DropdownToggle>
          <DropdownMenu right style={{ right: 'auto' }}>
            <DropdownItem>
              <i className="fa fa-user" /> Profile
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={e => this.props.onLogout(e)}>
              <i className="fa fa-lock" /> Logout
            </DropdownItem>
          </DropdownMenu>
        </AppHeaderDropdown>
      </Nav>
      <AppAsideToggler className="d-md-down-none" />
      {/*<AppAsideToggler className="d-lg-none" mobile />*/}
    </React.Fragment>
  );
};

export default DefaultHeader;
