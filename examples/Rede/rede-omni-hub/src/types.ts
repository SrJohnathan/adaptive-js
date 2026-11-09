export type ScreenType = 
  | 'chat-omnichannel'
  | 'catalogo-erp'
  | 'estudio-banners'
  | 'armazenamento-midias'
  | 'configuracoes-conta'
  | 'autenticacao';

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stockText: string;
  ifoodPrice: string;
  balcaoPrice: string;
  marginText: string;
  ratingBadge?: string;
  tag?: string;
  tagType?: 'badge' | 'warning' | 'combo' | 'pause';
  image: string;
  activeInIfood: boolean;
  lowStock?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'agent' | 'system';
  senderName?: string;
  text: string;
  time: string;
  status?: string;
  isOrderCard?: boolean;
  orderInfo?: {
    orderNumber: string;
    status: string;
    total: string;
    items: { name: string; price: string }[];
    notes?: string;
    eta: string;
  };
  isDessertCard?: boolean;
  dessertInfo?: {
    title: string;
    desc: string;
    price: string;
    image: string;
  };
}

export interface ConversationItem {
  id: string;
  clientName: string;
  avatar: string;
  channel: 'whatsapp' | 'instagram' | 'telegram' | 'messenger';
  channelBadgeText: string;
  time: string;
  lastMessage: string;
  unreadCount?: number;
  vipStatus?: string;
  orderRef?: string;
  phone: string;
  slaTime: string;
  totalSpentMonth: string;
  completedOrdersCount: number;
  avgTicket: string;
  address: string;
  sentimentPercent: number;
  notes: string;
  messages: ChatMessage[];
}

export interface BannerItem {
  id: string;
  code: string;
  title: string;
  campaignType: string;
  channel: 'whatsapp' | 'instagram' | 'ifood' | 'web';
  channelLabel: string;
  statusBadge: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  image: string;
}
