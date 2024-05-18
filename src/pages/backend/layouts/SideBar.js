import { NavLink } from "react-router-dom";

const SideBar = () => {
  //   const navigate = useNavigate();
  const items = [
    {
      label: "Home",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/admin" }],
    },
    {
      label: "UI Components",
      items: [
        {
          label: "User",
          icon: "pi pi-fw pi-id-card",
          to: "/admin/test",
        },
      ],
    },
  ];
  const Menues = (
    <ul className="layout-menu">
      {items.map((item, key) => (
        <li className="layout-root-menuitem" key={key}>
          <div className="layout-menuitem-root-text">{item.label}</div>
          <a href="/">
            <i className="layout-menuitem-icon"></i>
            <span className="layout-menuitem-text">{item.label}</span>
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          </a>

          <ul className="layout-submenu">
            {item.items.length > 0 &&
              item.items.map((sub_item, sub_item_key) => (
                <li key={sub_item_key}>
                  <NavLink
                    aria-current="page"
                    to={sub_item.to}
                    className="router-link-active router-link-exact-active active-route"
                  >
                    <i
                      className={`pi pi-fw ${sub_item.icon} layout-menuitem-icon`}
                    ></i>
                    <span className="layout-menuitem-text">
                      {sub_item.label}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );

  return <>{Menues}</>;
};

export default SideBar;
