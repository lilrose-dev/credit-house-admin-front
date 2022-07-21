
import { NavLink } from 'react-router-dom';
import '../App.css'

function Menu() {

    return(<>
    <div className="left">
        <h2 className='heading'>Admin panel</h2>
        <div className="menu">
            <NavLink className={'menu_link'} to={'/'}><div className="link link_dashboard">Dashboard</div></NavLink>
            <NavLink className={'menu_link'} to={'/bank'}><div className="link link_bank">Bank</div></NavLink>
            <NavLink className={'menu_link'} to={'/company'}><div className="link link_company">Company</div></NavLink>
            <NavLink className={'menu_link'} to={'/complex'}><div className="link link_complex">Complex</div></NavLink>
            <NavLink className={'menu_link'} to={'/room'}><div className="link link_room">Room</div></NavLink>
            {/* <NavLink className={'menu_link menu_link--order'} to={'/order'}><div className="link link_order">Order</div></NavLink> */}
        </div>
    </div>
    </>)
}
export default Menu;
