import {FC} from "react";
import Tab, {TabsProps} from "./tab";
import TabItem, {TabItemProps} from "./tabItem";

export type ITabComponent = FC<TabsProps> & {
	TabItem: FC<TabItemProps>
}
const TransTab = Tab as ITabComponent

TransTab.TabItem = TabItem

export default TransTab