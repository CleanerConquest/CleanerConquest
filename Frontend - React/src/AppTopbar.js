import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class AppTopbar extends Component {

    static defaultProps = {
        onMenuButtonClick: null,
        onTopbarMenuButtonClick: null,
        onTopbarItemClick: null,
        onRightMenuButtonClick: null,
        topbarMenuActive: false,
        activeTopbarItem: null,
        inlineUser: null,
        onThemeChange: null
    }

    static propTypes = {
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        onRightMenuButtonClick: PropTypes.func.isRequired,
        topbarMenuActive: PropTypes.bool.isRequired,
        activeTopbarItem: PropTypes.string,
        inlineUser: PropTypes.bool,
        onThemeChange: PropTypes.func
    }

    constructor() {
        super();
        this.state = {};
    }

    onTopbarItemClick(event, item) {
        if (this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    render() {
        return <div className="layout-topbar">
            <div style={{ padding: '12px 20px' }}>
                {/* <button className="p-link layout-right-panel-button layout-topbar-icon" onClick={this.props.onRightMenuButtonClick}>
                    <i className="pi pi-ellipsis-v"></i>
                </button> */}

                <button className="p-link layout-menu-button layout-topbar-icon" onClick={this.props.onMenuButtonClick}>
                    <i className="pi pi-bars"></i>
                </button>

                <button className="p-link layout-topbar-logo" onClick={() => window.location = "#/"}>
                    <img id="topbar-logo" src="assets/layout/images/Cleaner Conquest Logo.png" alt="Cleaner Conquest" />
                </button>

                {/* <span className="layout-topbar-search">
                <i className="pi pi-search"></i>
                <input type="text" placeholder="Enter your search term"/>
            </span> */}
{/*
                <ul className="topbar-menu">
                    <li className={classNames('user-profile', { 'active-topmenuitem fadeInDown': this.props.activeTopbarItem === 'profile' })}>
                        {!this.props.inlineUser && <button className="p-link" onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
                            <i className="fas fa-user profileImg" />
                        */}
                            {/*<img src="assets/layout/images/avatar.png" alt="profile" />*/}
                            {/*
                            <div className="layout-profile-userinfo">
                                <span className="layout-profile-name">{this.props.name}</span>
                                <span className="layout-profile-role">{this.props.role}</span>
                            </div>
                        </button>}
                    */}
                        {/*<ul className="fadeInDown">
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-fw pi-user"></i>
                                <span>Profile</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-fw pi-cog"></i>
                                <span>Settings</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-fw pi-envelope"></i>
                                <span>Messages</span>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <i className="pi pi-fw pi-bell"></i>
                                <span>Notifications</span>
                            </button>
                        </li>
    </ul>
                    </li>
*/}
                    {/* <li className={classNames({'active-topmenuitem fadeInDown': this.props.activeTopbarItem === 'settings'})}>
                    <button className="p-link layout-topbar-icon" onClick={(e) => this.onTopbarItemClick(e, 'settings')}>
                        <i className="topbar-icon pi pi-fw pi-bell"></i>
                    </button>
                    <ul className="fadeInDown">
                        <li role="menuitem">
                            <button className="p-link">
                                <img src="assets/layout/images/avatar-1.png" alt="Cleaner Conquest"/>
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Bithika Abhedananda</span>
                                    <span className="topbar-menu-role">User interface review is done.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <img src="assets/layout/images/avatar-2.png" alt="Cleaner Conquest"/>
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Dai Jiang</span>
                                    <span className="topbar-menu-role">Uh, we have sort of a problem here.</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <img src="assets/layout/images/avatar-3.png" alt="Cleaner Conquest"/>
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Karlien Nijhuis</span>
                                    <span className="topbar-menu-role">You apparently didn’t put the thing</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <img src="assets/layout/images/avatar-4.png" alt="Cleaner Conquest"/>
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Tom Chun</span>
                                    <span className="topbar-menu-role">Please check the files</span>
                                </div>
                            </button>
                        </li>
                        <li role="menuitem">
                            <button className="p-link">
                                <img src="assets/layout/images/avatar-5.png" alt="Cleaner Conquest"/>
                                <div className="topbar-menu-info">
                                    <span className="topbar-menu-name">Maria Trofimova</span>
                                    <span className="topbar-menu-role">Meeting reports attached.</span>
                                </div>
                            </button>
                        </li>
                    </ul>
                </li> 
                </ul>
                */}
            </div>
        </div>;
    }
}
