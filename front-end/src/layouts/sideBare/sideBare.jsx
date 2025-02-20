import SideBareItems from "./sideBareItems";
import items from './sidebare.json'

export default function SideBar() {
    return (
        <div className="main">
            <div className="sidebare">
                {items.map((item, index) => <SideBareItems key={index} item={item} />)}
            </div>
        </div>
    )
}
