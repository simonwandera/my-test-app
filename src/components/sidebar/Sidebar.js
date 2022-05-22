import SidebarItem from "./SidebarItem"
import items from "./Sidebar.json"
import './index.css'


const Sidebar = () => {
    return (
      

      <div className='sidebar'>

        { items.map((item, index) => <SidebarItem key={index} {...item} item={item} />)}
          
      </div>
      
    )
  }

export default Sidebar