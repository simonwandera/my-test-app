import SidebarItem from "./SidebarItem"
import items from "./Sidebar.json"
import './index.css'


const Sidebar = ({sidebar}) => {
    return (

      <div className={sidebar ? "sidebar sidebar-open" : "sidebar"}>
        { items.map((item, index) => <SidebarItem key={index} {...item} item={item} />)}   
      </div>
      
    )
  }

export default Sidebar