import Vue from 'vue';

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
locale.use(lang);


import { Container, Aside, Menu, Submenu, MenuItemGroup, MenuItem, Header, Dropdown, DropdownMenu, DropdownItem, Main, Row, Col, Card, Button, Badge, Table, TableColumn, Pagination, Input, Loading, Alert, Notification, Message, Dialog, Form, FormItem, Select, Option, Checkbox, CheckboxGroup, Breadcrumb, BreadcrumbItem, Upload, Tabs, TabPane, Popover, Progress, Switch, Tooltip, ColorPicker, InputNumber } from 'element-ui';

Vue.use(Container);
Vue.use(Aside);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Main);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Button);
Vue.use(Badge);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Input);
Vue.use(Loading.directive);
Vue.use(Alert);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Upload);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Switch);
Vue.use(Tooltip);
Vue.use(ColorPicker);
Vue.use(InputNumber);


import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
