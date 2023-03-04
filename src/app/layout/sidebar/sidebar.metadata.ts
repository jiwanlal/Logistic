// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  iconType: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  badge: string;
  badgeClass: string;
  role: string[];
  submenu: RouteInfo[];
}
// link: string;
// name: string;
// icon_type: string;
// icon_name: string;
// class: string;
// group_title: boolean;
// badge_name: string;
// badge_class: string;