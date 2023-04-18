import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';
import { AppRightMenu } from './AppRightMenu';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fortawesome/fontawesome-free/js/all.js';
import Loading from './Components/Loading'
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import { AuthService } from './Service/AuthService'
import Customer from './Customer/Customer';
import Order from './Order/Order';
import Product from './Product/Product';
import Worker from './Worker/Worker';
import Home from './Home/Home';
import SignUp from './pages/SignUp';
const $ = window.$;

class CleanerConquest extends React.Component {
  constructor(props) {
    document.title = "Cleaner Conquest"
    super(props);
    this.state = {
      /*these are the roma theme states */
      name: "",
      role: "",
      layoutMode: 'static',
      lightMenu: true,
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
      isRTL: false,
      topbarColor: 'layout-topbar-light',
      inlineUser: false,
      topbarMenuActive: false,
      activeTopbarItem: null,
      rightPanelMenuActive: null,
      inlineUserMenuActive: false,
      menuActive: false,
      themeColor: 'blue',
      configDialogActive: false,
      menu: []


    };


    /*these are the roma theme functions */

    this.onDocumentClick = this.onDocumentClick.bind(this);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
    this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
    this.onRightMenuButtonClick = this.onRightMenuButtonClick.bind(this);
    this.onRightMenuClick = this.onRightMenuClick.bind(this);
    // this.onProfileMenuClick = this.onProfileMenuClick.bind(this);
    this.changeMenuMode = this.changeMenuMode.bind(this);
    this.changeMenuColor = this.changeMenuColor.bind(this);
    // this.changeProfileMode = this.changeProfileMode.bind(this);
    this.changeOrientation = this.changeOrientation.bind(this);
    this.changeTopbarColor = this.changeTopbarColor.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.onConfigButtonClick = this.onConfigButtonClick.bind(this);
    this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
    this.onConfigClick = this.onConfigClick.bind(this);


    this.authService = new AuthService()


  }

  componentDidMount() {
    var token = localStorage.getItem('token')
    this.createMenu();


    if (!token) {
      if (this.props.location.pathname !== "/login") {
        $.ErrorToast({ detail: "Loading Failed, Session Timed out , please login again" })
        this.props.history.push("/login")
      }
    }
    else {

    }

  }




  //////////////////////////////////////////////////////////////////////

  toggleSideBar = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }

  onDocumentClick(event) {
    if (!this.topbarItemClick) {
      this.setState({
        activeTopbarItem: null,
        topbarMenuActive: false
      });
    }

    if (!this.rightMenuClick) {
      this.setState({ rightPanelMenuActive: false });
    }

    if (!this.configClick) {
      this.setState({ configDialogActive: false });
    }

    // if (!this.profileClick && this.isSlim() && !this.isMobile()) {
    //   this.setState({ inlineUserMenuActive: false })
    // }

    if (!this.menuClick) {
      if (this.isHorizontal() || this.isSlim()) {
        this.setState({
          menuActive: false
        })
      }

      if (this.state.overlayMenuActive || this.state.staticMenuMobileActive) {
        this.hideOverlayMenu();
      }

      this.setState({ menuHoverActive: false });
      this.unblockBodyScroll();
    }

    this.topbarItemClick = false;
    this.menuClick = false;
    this.rightMenuClick = false;
    // this.profileClick = false;
    this.configClick = false;
  }


  onMenuButtonClick(event) {
    this.menuClick = true;
    this.setState(({
      topbarMenuActive: false,
      rightPanelMenuActive: false
    }));

    if (this.isOverlay()) {
      this.setState({
        overlayMenuActive: !this.state.overlayMenuActive
      });
    }

    if (this.isDesktop())
      this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
    else {
      this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
      if (this.state.staticMenuMobileActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    event.preventDefault();
  }



  onConfigButtonClick(event) {
    this.configClick = true;
    this.setState({ configDialogActive: !this.state.configDialogActive })
  }

  onConfigCloseClick() {
    this.setState({ configDialogActive: false })
  }

  onConfigClick() {
    this.configClick = true;
  }

  onTopbarMenuButtonClick(event) {
    this.topbarItemClick = true;
    this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
    this.hideOverlayMenu();
    event.preventDefault();
  }

  onTopbarItemClick(event) {
    this.topbarItemClick = true;

    if (this.state.activeTopbarItem === event.item)
      this.setState({ activeTopbarItem: null });
    else
      this.setState({ activeTopbarItem: event.item });

    event.originalEvent.preventDefault();
  }
  onMenuClick(event) {
    this.menuClick = true;
  }

  blockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }
  unblockBodyScroll() {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
        'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  }
  onRightMenuButtonClick(event) {
    this.rightMenuClick = true;
    this.setState({ rightPanelMenuActive: !this.state.rightPanelMenuActive });

    this.hideOverlayMenu();

    event.preventDefault();
  }

  onRightMenuClick(event) {
    this.rightMenuClick = true;
  }

  // onProfileMenuClick(event) {
  //   this.profileClick = true;
  //   this.setState({ inlineUserMenuActive: !this.state.inlineUserMenuActive })
  // }

  hideOverlayMenu() {
    this.setState({
      overlayMenuActive: false,
      staticMenuMobileActive: false
    })
  }
  onMenuItemClick(event) {
    if (!event.item.items) {
      this.hideOverlayMenu();
    }
    if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
      this.setState({
        menuActive: false
      })
    }
  }

  onRootMenuItemClick(event) {
    this.setState({
      menuActive: !this.state.menuActive
    });
  }

  isTablet() {
    const width = window.innerWidth;
    return width <= 1024 && width > 640;
  }

  isDesktop() {
    return window.innerWidth > 896;
  }

  isMobile() {
    return window.innerWidth <= 1025;
  }

  isStatic() {
    return this.state.layoutMode === 'static';
  }

  isOverlay() {
    return this.state.layoutMode === 'overlay';
  }

  isHorizontal() {
    return this.state.layoutMode === 'horizontal';
  }

  isSlim() {
    return this.state.layoutMode === 'slim';
  }
  changeMenuMode(event) {
    this.setState({
      layoutMode: event.menuMode,
      staticMenuDesktopInactive: false,
      overlayMenuActive: false
    });
    if (event.menuMode === 'slim' || event.menuMode === 'horizontal') {
      this.setState({
        inlineUser: false,
        inlineUserMenuActive: false
      })
    }
  }

  changeMenuColor(event) {
    this.setState({ lightMenu: event.lightMenu })
  }

  // changeProfileMode(event) {
  //   if (!event.inlineUser) {
  //     this.setState({
  //       inlineUser: event.inlineUser,
  //       inlineUserMenuActive: event.inlineUser
  //     })
  //   }
  //   else {
  //     if (!this.isHorizontal()) {
  //       this.setState({
  //         inlineUser: event.inlineUser
  //       })
  //     }
  //   }
  // }



  changeOrientation(event) {
    this.setState({ isRTL: event.isRTL })
  }

  changeTopbarColor(event) {
    this.setState({ topbarColor: event.topbarColor });
    const topbarLogoLink = document.getElementById('topbar-logo');
    topbarLogoLink.src = 'assets/layout/images/' + event.logo;
  }

  changeTheme(event) {
    this.setState({ themeColor: event.theme })
    this.changeStyleSheetUrl('layout-css', event.theme, 'layout');
    this.changeStyleSheetUrl('theme-css', event.theme, 'theme');
  }

  changeStyleSheetUrl(id, value, prefix) {
    let element = document.getElementById(id);
    let urlTokens = element.getAttribute('href').split('/');
    urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
    let newURL = urlTokens.join('/');

    this.replaceLink(element, newURL);
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
  }

  replaceLink(linkElement, href) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
    }
    else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);
      });
    }
  }


  createMenu() {
    var items = []

    var mainPage = {
      label: " Home",
      icon: "pi pi-fw pi-home",
      to: "/"
    }
    items.push(mainPage)

    items.push({
      label: " Customer",
      icon: "fa-solid fa-person-military-pointing",
      to: "/customer",
    })
    items.push({
      label: " Product",
      icon: "pi pi-box",
      to: "/product",
    })
    items.push({
      label: " Worker",
      icon: "pi pi-user",
      to: "/worker",
    })
    items.push({
      label: " Order",
      icon: "pi pi-shopping-cart",
      to: "/order",
    })
    
    localStorage.getItem("role") === 'ADMIN' ?

      items.push({
        label: "Sign Up",
        icon: "fa-solid fa-user-plus",
        to: "/signup",
      })
      : <div></div>


    items.push({
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => this.logout()
    })
    this.setState({ menu: items })
  }


  logout = () => {
    this.authService.logout(this)
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  render() {

    const layoutClassName = classNames('layout-wrapper', {
      'layout-horizontal': this.state.layoutMode === 'horizontal',
      'layout-overlay': this.state.layoutMode === 'overlay',
      'layout-static': this.state.layoutMode === 'static',
      'layout-slim': this.state.layoutMode === 'slim',
      'layout-menu-light': this.state.lightMenu === true,
      'layout-menu-dark': this.state.lightMenu === false,
      'layout-overlay-active': this.state.overlayMenuActive,
      'layout-mobile-active': this.state.staticMenuMobileActive,
      'layout-static-inactive': this.state.staticMenuDesktopInactive,
      'layout-rtl': this.state.isRTL
    }, this.state.topbarColor);

    if (this.state.loading)
      return <Loading />
    else

      return (
        <div className="App">
          <div className={layoutClassName} onClick={this.onDocumentClick}>
            <link href='https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.css' rel='stylesheet' />

            <AppTopbar name={this.state.name} role={this.state.role} topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem} inlineUser={this.state.inlineUser}
              onRightMenuButtonClick={this.onRightMenuButtonClick} onMenuButtonClick={this.onMenuButtonClick}
              onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} onTopbarItemClick={this.onTopbarItemClick} />

            <div className='layout-menu-container' onClick={this.onMenuClick}>
              <div className="menu-scroll-content">
                <AppMenu model={this.state.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                  layoutMode={this.state.layoutMode} active={this.state.menuActive} />
              </div>
            </div>

            <AppRightMenu rightPanelMenuActive={this.state.rightPanelMenuActive} onRightMenuClick={this.onRightMenuClick}></AppRightMenu>

            <div className="layout-main">
              <div className="layout-content">
                <Route exact path="/" component={Home} />
                <Route path="/customer" component={Customer} />
                <Route path="/product" component={Product} />
                <Route path="/worker" component={Worker} />
                <Route path="/order" component={Order} />
                <Route path="/signup" component={SignUp} />

              </div>

              <AppConfig layoutMode={this.state.layoutMode} lightMenu={this.state.lightMenu} inlineUser={this.state.inlineUser} isRTL={this.state.isRTL}
                themeColor={this.state.themeColor} topbarColor={this.state.topbarColor} changeMenuMode={this.changeMenuMode} changeMenuColor={this.changeMenuColor}
                changeOrientation={this.changeOrientation} changeTopbarColor={this.changeTopbarColor} changeTheme={this.changeTheme}
                onConfigButtonClick={this.onConfigButtonClick} onConfigCloseClick={this.onConfigCloseClick} onConfigClick={this.onConfigClick} configDialogActive={this.state.configDialogActive} />
            </div>
            <AppFooter />
            <div className="layout-content-mask"></div>
          </div>
        </div>
      );
  }


}
export default withRouter(CleanerConquest)



// 			);
// 	}

// }

