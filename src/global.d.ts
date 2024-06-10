import { type MouseEvent } from 'react';
import { TAB_LIST } from './config';

type Tab = (typeof TAB_LIST)[number];

declare global {
  type TTabLabel = Tab['label'];
  type TTabIcon = Tab['icon'];
  type TTabUrl = Tab['url'];

  type TTabItem = {
    id: string;
    label: TTabLabel;
    icon: TTabIcon;
    url: TTabUrl;
  };

  type CtxMenuRef = {
    openCtxMenu: (event: MouseEvent) => void;
  };
}
