import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const liCss = "pr-6 text-2xl";

const BasicMenu = () => {

const loginState = useSelector((state : RootState) => state.loginSlice)

return (
<nav id='navbar' className=" flex bg-blue-300">
<div className="w-4/5 bg-gray-500" >
<ul className="flex p-4 text-white font-bold">
<li className={liCss}> <Link to={'/'}>Main</Link> </li>
<li className={liCss}> <Link to={'/about'}>About</Link> </li>
{loginState.email ? 
<>
<li className={liCss}> <Link to={'/todo/'}>Todo</Link> </li>
<li className={liCss}><Link to={'/products/'}>Products</Link></li>
</> : <></>}
</ul>
</div>
<div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
{ !loginState.email ?
<div className="text-white text-sm m-1 rounded" >
<Link to={'/member/login'}>Login</Link>
</div>
: <div className="text-white text-sm m-1 rounded" >
<Link to={'/member/logout'}>Logout</Link>
</div>
}
</div>
</nav>
);
}

export default BasicMenu;
