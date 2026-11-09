import { ProductItem, ConversationItem, BannerItem } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbWKcPMArWAMxL_fqUzdTzKZDKVErJEZWrz9y7283jz65OkFJspTAHPG_e4mOTOWYO9qoGKtBbHjxF6uUvMNu7KkPtAJ9QhsFlZqL7ie8APjadgyY7curR8lnzyPx3Nj2O6nQgAu_CrwN-NKdeRKpkVroPhQ00n643RwlrbAMzZHfJirRuxNer8Lcokk8pbOkMnep3cWYrwz2hdmzi2IqiWhDpOcY2RH7bHd6rUQ';
export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6gpIsOBMuEJ0-13FNOLKHsVGMNNiR1BXYpiPjzZER5ueUVEg7j_ZnMjEwmcpw2hW0kq9-Z6HmVUIJmZq66b-b6JTFYfEYshgZ3S4iLz3h5Q6mFHDJ2o9CNdRYyD7z0lIRSCKtLIshMlcyjJa39DvzoJSbHHloIqJBPgUe9dAhDUbC0ybA1o79rKxbqw034pgBQlevwzw0jQG4EuH_aEnkOzm_K-oLJ9mcNGKLBw';
export const MAP_IMAGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXEF7WNpZlR_s7jM473QCWLBmpHsLxeBBJvyanW8rgmBH_nYONTRcHzjvqkrc34g0fst-nQ8fIQnLr2MLKPC6lJ6KEsoBwBAqS8QJWRFZW4zUMeIXJgOGpX3LZlza1XjVBGZe8fccWAeRiBDedbEBaS7qa6U4K6s2YRHwlyey9mlyiDOQSjMcyhvNYNEEGxoHLJdmYHcouV7EZSnfG5d0e--fc1fVWG0xwpX-iS99Qd48Xdha4ePU';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Pizza Margherita Especial',
    sku: 'ERP-9042',
    category: 'Pizzas Tradicionais',
    stockText: '48 un. preparadas',
    ifoodPrice: 'R$ 68,90',
    balcaoPrice: 'R$ 56,00',
    marginText: '+23% margem',
    ratingBadge: 'Mais Pedido ★ 4.8',
    tag: 'Forno a Lenha',
    tagType: 'badge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-NeqRdKDCdf6plMGqmaEEIHIZPbyxNVW57GO-FrFw_SvzwevMFTZT_OkL-HjIFImlIi1mjrZPnJgZBuy9Wl_g8grfv9qIvQQhy2l6NslCSwfhWhuPZBF27p1qaSaSUBlijrp8dLTZKxLN7JxYQynQ5PxVxwtlDPZztMdx-tQZL-zF21Z0-2zHD6KgRDFJakCT_Xp5WQ3yN1eR1uqAdtfXZ_DCCvuKsJTc2rJYXks-G-wy_ZeDLOQ',
    activeInIfood: true,
  },
  {
    id: 'prod-2',
    name: 'Combo Smash Burger Duplo',
    sku: 'ERP-3310',
    category: 'Hamburgueria & Batata',
    stockText: '92 un. pães em estoque',
    ifoodPrice: 'R$ 49,90',
    balcaoPrice: 'R$ 39,90',
    marginText: '+25% margem',
    ratingBadge: 'Combo iFood Top 1',
    tagType: 'combo',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhgbDDKgXxAwUD41gj9UFoiYBTkPnDYxRjBbCsTJaf5LNvnRMIzRZsQvxGfjTqTI1EiYcPkblDE_SIBy7SCOvXHkVIdk3WqPblEmxdFMA2SEJS_4xLxoAWbMKMs6eUYJAwxXU9Wfq7rJf_1ZtNQnIGftv_Llok7RNHB1ooChPVk2uEJ-NHWe7snlNK8pLMGiu6o7lN3KBz0CaMBUh86XtB0i5MoQQCHG7LKYPqePM-0NLYZX_h5Sk',
    activeInIfood: true,
  },
  {
    id: 'prod-3',
    name: 'Bowl Fit Salmão Grelhado',
    sku: 'ERP-5112',
    category: 'Fitness & Bowls',
    stockText: 'Alerta: 4 un. (Salmão fresco)',
    ifoodPrice: 'R$ 54,00',
    balcaoPrice: 'R$ 46,00',
    marginText: '+17% margem',
    ratingBadge: 'Healthy • Sem Glúten',
    tagType: 'warning',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD641CQr7cfU_e7-KJBzUKvS_I2J01IYtlaj7psyTYrrj-6QkkIInBiWWcB7Q-GCIdQ-WLR5ibMdP8PG8Sk0rWLHPo7esQtoIVnX1vLOJEe5A3OPKKZhtR5SKf877eghq2i4tNAm15h4eCaqpaX7ZDp8Q0nV2pmAWfX7rfyvQjRO4s503et8W23P6r6fqRIXjaOdvN-UNLt7HyTogQ2fx6D5moAk3t7sLzoeYF_9GX8gbm9KZASuac',
    activeInIfood: true,
    lowStock: true,
  },
  {
    id: 'prod-4',
    name: 'Feijoada Executiva Premium',
    sku: 'ERP-1844',
    category: 'Pratos Tradicionais',
    stockText: '35 porções preparadas',
    ifoodPrice: 'R$ 59,90',
    balcaoPrice: 'R$ 48,00',
    marginText: '+24% margem',
    ratingBadge: 'Quarta & Sábado',
    tagType: 'badge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLXRfD2M8Z2yhocn84mI42nuWM6NDQbnI8f0XvU-2PcSUCll-JhxcoI2D7uOAHJpM0pdywkJmShlx8h0D0ixgq7dwcZ4DoX_azY-7YGlkDG5Rnw32lndEw9EgLqe8HpcRzlrQWBlbHCHj7SmyTvXHU_0Eyg4WJLmSkn98-sQH5vkO-R6uMcn3f0cLQiI2gbdFdulk1GD539atIztCmr8dQtMcM39tXAhNrMJJCJSes0xD9eq-0vs4',
    activeInIfood: true,
  },
  {
    id: 'prod-5',
    name: 'Suco Artesanal Maracujá 500ml',
    sku: 'ERP-0822',
    category: 'Bebidas & Sucos',
    stockText: '60 un. garrafas prontas',
    ifoodPrice: 'R$ 16,90',
    balcaoPrice: 'R$ 12,00',
    marginText: '+40% margem',
    ratingBadge: '100% Natural',
    tagType: 'badge',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChDlwg9ItfT0pRvmECEqcana7XXHVDaurBuZci11lQpBjtVLYsVX5o-1SWyVp-xpZ1aNV97_Jg3SQMZioaLnWNi9CPRN67smZIuCaO6FuYUx0K2sFjIc3BJ-QAXaZyBBjVjzLkt48f-ACg6lyKI1KnuXr-8n6BoY3ZQhB56jZQb6b7CoAcU3nh84XobsC7x-sHe-XXUcZKrKf_lPrtjkFBS34r-v4tJuOQer4H2vDmaw_aH88O-Bs',
    activeInIfood: true,
  },
  {
    id: 'prod-6',
    name: 'Petit Gâteau Belga com Gelato',
    sku: 'ERP-7201',
    category: 'Sobremesas Finas',
    stockText: 'Pausa temporária de cozinha',
    ifoodPrice: 'R$ 28,00',
    balcaoPrice: 'R$ 22,00',
    marginText: '+27% margem',
    ratingBadge: 'Pausado no Horário de Pico',
    tagType: 'pause',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDph3dKJvtwXsCr0SMHRrwrJUQTRkGZYiZwTT8YMr9DdAPLkIs-7o1YvagIz14SCKor30wEze9tPm_xxOtpgXZ8INFS_etm0guF1FkFqjv5YTFJ74LcctEubKowrGuyA51z36NwVZCpEuWtNXpOT9InGSIgGnwzrZ8lVgs0ybHTWUlnwt2lxnRGpgaoEBkNj3ZjiHtVJCiUnITAqNy8ObZZeu5GI4pbxtghvaIyr8O6JyuvB1445fM',
    activeInIfood: false,
  }
];

export const INITIAL_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv-carlos',
    clientName: 'Carlos Eduardo Guimarães',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtCAgE9Iu4C-KFDCajgsBne512JjekHUSrNTR8M8-1v2PwsOzDNNzFxoLvERblWQwvxwEtCrA0lsChWmjObV5u0-n_XFTyUzKrK-gkdY7ozSReyJmW1JF5lhwgYapqQyD5jxSlajQZIW-tO_--Vuu0hPTvLOjynf_l5kCIHiNjRN9Bvwsl6b_2APxVVbb18F8Jw_BX8rkAAticgulzmHGlKsMUYPbjAFPq_CxqNkyhSLf0quPfvZM',
    channel: 'whatsapp',
    channelBadgeText: 'WhatsApp Cloud API',
    time: '10:43',
    lastMessage: 'Perfeito! A entrega pelo iFood chega em quanto tempo?',
    unreadCount: 0,
    vipStatus: 'VIP Ouro',
    orderRef: '#8942',
    phone: '+55 (11) 98821-4432',
    slaTime: '04:15 restante',
    totalSpentMonth: 'R$ 489,50',
    completedOrdersCount: 6,
    avgTicket: 'R$ 81,58',
    address: 'Av. Paulista, 1420 - Bela Vista',
    sentimentPercent: 96,
    notes: '"Cliente prefere entrega sem interfone, liga no celular. Sempre muito cordial e deixa gorjeta."',
    messages: [
      {
        id: 'msg-1',
        sender: 'client',
        text: 'Bom dia! Fiz o pedido #8942 agora pelo iFood (Pizza Margherita + Suco de Maracujá), mas esqueci de colocar observação para tirar a cebola.',
        time: '10:38'
      },
      {
        id: 'msg-2',
        sender: 'agent',
        senderName: 'Mariana Silva',
        text: 'Olá Carlos! Já avisei a cozinha imediatamente e o Totvs ERP já foi atualizado: sua Margherita sairá sem cebola! 🍕✨',
        time: '10:40',
        status: 'done_all'
      },
      {
        id: 'msg-3',
        sender: 'system',
        text: '',
        time: '10:41',
        isOrderCard: true,
        orderInfo: {
          orderNumber: 'Pedido Totvs/iFood #8942',
          status: 'Cozinha Preparando',
          total: 'R$ 85,80',
          items: [
            { name: '1x Pizza Margherita Especial', price: 'R$ 68,90' },
            { name: '1x Suco Artesanal de Maracujá 500ml', price: 'R$ 16,90' }
          ],
          notes: 'Obs: Sem Cebola (Atualizado via Totvs às 10:39)',
          eta: 'Previsão de Entrega: 35 a 45 min'
        }
      },
      {
        id: 'msg-4',
        sender: 'client',
        text: 'Maravilha, atendimento nota dez! Vocês têm alguma sobremesa boa para incluir agora antes de sair para entrega?',
        time: '10:42'
      },
      {
        id: 'msg-5',
        sender: 'agent',
        senderName: 'Mariana Silva',
        text: '',
        time: '10:42',
        isDessertCard: true,
        dessertInfo: {
          title: 'Petit Gâteau Belga c/ Gelato',
          desc: 'Chocolate belga 70% com sorvete artesanal',
          price: 'R$ 28,00',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQMgJhBIM36kJL_jOIbWxZxeyc79ejHj7gLros-tSEfEzp4qthK8Meg0xJUH-Jql4aivEJ0jm69ZT8Zed-XFxpekSbmihoKd9CKUBAkymkz3bbrcTp-YGGugT5Zt1WBcveu65O544Uh7ff7_Kn5tri1AKoj-6OR6Wu99FevFWBgBaK3SgUIRutlZl-3uRr_OsZ4vJt5qPtALmah8rP4IvyRBKbnYpX1pZ8Khg5LXyH_WRo8EW_Ahw'
        }
      },
      {
        id: 'msg-6',
        sender: 'client',
        text: 'Perfeito! A entrega pelo iFood chega em quanto tempo?',
        time: '10:43'
      }
    ]
  },
  {
    id: 'conv-beatriz',
    clientName: 'Beatriz Santos',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhHzGO-XIOatUS_QF0tpLjbK80az32-8PTS2PvAWUV5jJeLdofapYeK0WTGw3_R3iIvcSFCDfM3tD6ZCxUqugrkSB8eArEiVb3lDjA-5-rMLBJTfI15wCf7ysbJHYUc1R-LMJivGkYHZJi5uXLYT9NhEHmQy-yb6_n_3S79iRo8VPyStn2xBSidmUo2OvfamFrBtwo6_ep4Qv4PlaaO0k5VAdGBLJZC55weEGK23tfEyOhb1poqsE',
    channel: 'instagram',
    channelBadgeText: 'Instagram Direct',
    time: '10:35',
    lastMessage: 'Olá! Tem como adicionar borda recheada na pizza?',
    unreadCount: 1,
    phone: '+55 (11) 97120-1928',
    slaTime: '08:40 restante',
    totalSpentMonth: 'R$ 230,00',
    completedOrdersCount: 3,
    avgTicket: 'R$ 76,60',
    address: 'Rua Augusta, 850 - Consolação',
    sentimentPercent: 88,
    notes: '"Cliente gosta de borda vulcânica de catupiry original."',
    messages: [
      {
        id: 'msg-b1',
        sender: 'client',
        text: 'Olá! Tem como adicionar borda recheada na pizza?',
        time: '10:35'
      }
    ]
  },
  {
    id: 'conv-lucas',
    clientName: 'Lucas Ferraz',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBri2N65Tutg06wfy1Cyx-SbAgLwzcCE28EZKUEP0amV7962PH7vN-T6vaT_vp9w4B3hHviY3Vllaukj11U6x1j7f6K8ETIF9pC-eTRIXc19qmdPUYBsFfdGGpm02WSr-vamC5jfykm2bRx9EvTQrq8vEOYTSe5vOyUyhtze5RLNsxsXPbYo_-4aRIk_yJnAkN25-5ikyWvo80oM1epCEFWVPsEvWKR59-dWHJvWpsiphWI0ozIj_U',
    channel: 'telegram',
    channelBadgeText: 'Totvs ERP Sync',
    time: '09:58',
    lastMessage: 'Preciso da 2ª via da nota fiscal do pedido...',
    unreadCount: 0,
    phone: '+55 (11) 96455-8811',
    slaTime: '12:00 restante',
    totalSpentMonth: 'R$ 310,00',
    completedOrdersCount: 4,
    avgTicket: 'R$ 77,50',
    address: 'Alameda Santos, 200 - Cerqueira César',
    sentimentPercent: 91,
    notes: '"Empresa consome para almoços de diretoria às terças."',
    messages: [
      {
        id: 'msg-l1',
        sender: 'client',
        text: 'Preciso da 2ª via da nota fiscal do pedido de ontem, por favor.',
        time: '09:58'
      }
    ]
  },
  {
    id: 'conv-amanda',
    clientName: 'Amanda Silva',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv-ajZldAkF2d3e2L8QpUGQlKQNRXAWzylcbCVYsP37ktvB4lU_ABX-2TTshDszEK5ESgKi68zhlCrsIm20XfomA-GLGhbulkLhdEj9_pfrZj7-uaJ9nYg-Uo3kTGov8je2vK319uoVguE99NiIqV_FTAdocqxoO_cDb1pnrIAMNNcpyTpQwpbY58JK6mEctJBvV_U5kyLs3PE1zijmI4KtstrpiR1pcb4aEfdegJZtoQn6W_9098',
    channel: 'whatsapp',
    channelBadgeText: 'WhatsApp Oficial',
    time: '09:12',
    lastMessage: 'Qual horário vocês fecham hoje?',
    unreadCount: 0,
    phone: '+55 (11) 98112-9900',
    slaTime: 'Concluído',
    totalSpentMonth: 'R$ 145,00',
    completedOrdersCount: 2,
    avgTicket: 'R$ 72,50',
    address: 'Rua Haddock Lobo, 400 - Jardins',
    sentimentPercent: 94,
    notes: '"Pediu na inauguração. Prefere sucos naturais."',
    messages: [
      {
        id: 'msg-a1',
        sender: 'client',
        text: 'Qual horário vocês fecham hoje?',
        time: '09:12'
      }
    ]
  },
  {
    id: 'conv-thiago',
    clientName: 'Thiago Moreira',
    avatar: '',
    channel: 'messenger',
    channelBadgeText: 'Messenger Cloud',
    time: 'Ontem',
    lastMessage: 'Recebemos tudo certinho, obrigado!',
    unreadCount: 0,
    phone: '+55 (11) 97721-0022',
    slaTime: 'Concluído',
    totalSpentMonth: 'R$ 520,00',
    completedOrdersCount: 7,
    avgTicket: 'R$ 74,20',
    address: 'Rua Oscar Freire, 1100 - Cerqueira César',
    sentimentPercent: 98,
    notes: '"Cliente fidelizado há mais de 1 ano."',
    messages: [
      {
        id: 'msg-t1',
        sender: 'client',
        text: 'Recebemos tudo certinho, obrigado!',
        time: 'Ontem'
      }
    ]
  }
];

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'b-1',
    code: '#CP-849',
    title: 'Combo Pizza em Dobro',
    campaignType: 'Campanha Disparo de Quinta-feira',
    channel: 'whatsapp',
    channelLabel: 'WhatsApp Feed (1:1)',
    statusBadge: 'Concluído',
    metric1Label: 'Disparos',
    metric1Value: '1.420',
    metric2Label: 'Conversão',
    metric2Value: '18.4% (261 ped.)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFugi0sMZ4TjithUs0FSVCwbtb8huL8jqNTBrQXbmWMqrq-5gDozyu_PWesurOQFSytuSrZtesetZ4S7TwcQKwM4FDLEQDAC-Tnp7rv1r-EfXUGpw-fo4voXEAV5ke79MvUpzepagR8kMqFWxZdTz92TlcCf1r8u-xtmjS0mAkmFnIDV1B6pMHfGkjseYFXVfV_rbqGKRcfztsiipt1mV1BLgs_aEDI91wb_OW5cWWQNKv8Gkngv8'
  },
  {
    id: 'b-2',
    code: '#DS-102',
    title: 'Festival de Sobremesas',
    campaignType: 'Tráfego Pago Instagram Stories',
    channel: 'instagram',
    channelLabel: 'Instagram Ads (9:16)',
    statusBadge: 'Ativa Agora',
    metric1Label: 'Cliques',
    metric1Value: '3.890',
    metric2Label: 'Vendas Atrib.',
    metric2Value: 'R$ 4.200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDraumv2BftyRqbYLTcnEcfLFIwqUEHjn3rWwacF4xLpL9Z7jLYTyeo5emBUmh_cGeDyLhAlUhrB3TrHK_VkfIk7tMu43CXNcqIqm-xJYnqZWe-WgkVa4KL7DzUkos2_6dc7ThLT9_sTaLe0NwwRLy4TmSIn4zeUIDlLyizV62xVe2wQYHmd7tAJDC8ajvSOzCXOFkCcCsTVx8PAEJbKdXx8a2oiydqOIdnQf6CYoCC5Ud245lqERg'
  },
  {
    id: 'b-3',
    code: '#EX-551',
    title: 'Almoço Executivo Grill',
    campaignType: 'Sincronizado c/ Totvs Cardápio',
    channel: 'ifood',
    channelLabel: 'iFood Destaque',
    statusBadge: 'Totvs ERP',
    metric1Label: 'Visualizações',
    metric1Value: '8.420',
    metric2Label: 'Ticket Médio',
    metric2Value: 'R$ 44,50',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXb2A3_5CMZhXDB6D2XDU_mq2s6O9fBANe3pjfRX8MGoPRPFrVoaBp6W5hhSXtdCSzzu5V1fm-gM-U3xax15ypdAWc5Tzn16Ehk1QI2ihZDXZMIPLy1hkxGURY7LwT066zcDSKiF_tLVXp0DhhxvDbTAFSPlOjB6Hu6udkEsbVSoLdEJEiLfjUa1aVklFqXf60uKfoH-GpjVELb2kWwI2tR7iGyol-O2_3QFGUKxBlidnUq97PK8Y'
  },
  {
    id: 'b-4',
    code: '#BF-2024',
    title: 'Black Friday Antecipada',
    campaignType: 'Disparo Omni Agendado p/ 24/Nov',
    channel: 'web',
    channelLabel: 'Banner Web (16:9)',
    statusBadge: 'Agendado',
    metric1Label: 'Base Estimada',
    metric1Value: '12.500 contatos',
    metric2Label: 'Status',
    metric2Value: 'Na Fila',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3fVUyjejMfFkYI6PYHxFocnwOyK0v3E7_A6AZteLlZhV3CItUWU8NuMOZfhXz5Y3q_A9khZrXfAOPkjuN2863BcodIiU3lG_HG0Am2eNxs4Ita8vpPZIJF94nT4vPiT8Fe3mHBc-V_4WXhqxhPN8BmovywVsMTR3PUfr18uo1AN4TBeHcmO4fbxdRPqK_7rtAqcLgEfCUGdAJ8yeY74FKAYKmOGNOY7YCy5eykCoZcSlti-PMdpE'
  }
];

export const STUDIO_VARIATIONS = [
  {
    id: 'var-1',
    formatTag: '9:16 Stories',
    badgeText: 'CUPOM: QUARTA30',
    title: 'Variação Vertical',
    subtitle: 'Otimizado p/ Stories',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm0LMWydpIliaUkKOhLWxEpCe1BG8ipG7yESmjkAYjTozQmnDlSs3S6KRtjpNqL2U4lvDMRdKQcV1jdY6ViUyJxGKtzS20quftS1JUelif41uyRkmm-wiau9B-eS4D1QRDUVkRinrug7QI-TckNvjByvt9KWLJyQAUQuQrJ_-03TPLrhK31NTRmud-Jbmto5h9EU85XxvMXv3X_-1EPcjVU1qcItdqCjMI_TjtHfs-Rex1dFr00XQ'
  },
  {
    id: 'var-2',
    formatTag: '1:1 Combo',
    badgeText: 'COMBO COMPLETO',
    title: 'Combo Clean',
    subtitle: 'Foco no grupo familiar',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjM7NSdEH45jHPLHneUaHBfPVR9SmOsMa4FmrhVXU1HwJK8F3cVSAADxbqRkOvYPMT3PdGxmqCK-4k2hHnkq3UU2K5smysdf_7BHpbxZmDGR78CsWzZSktd_ePp12e3dCRLjnCdreFkSpr0tBGEmgo15t9s64fdxPMLcG4I_ZxyPqvNKpee0-q6zJMmd4STnrMhSZ3qGPxqM9kfZvZulbOdkV9lhI0MOmBE8KdmjHnwnOycgzofi4'
  },
  {
    id: 'var-3',
    formatTag: '16:9 Banner',
    badgeText: 'NIGHT SPECIAL',
    title: 'Dark Neon Night',
    subtitle: 'Ideal p/ Happy Hour',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8Nnz9n5QuNNhmyPC1bH2U6cwbF2xMSFNVTw-ffQESUDFv1lgU6qcLaDZGeRXi_B2icGKO5SeakGNDA8wdpo_aSKVrjuBaI3lnZrFxfFfQVpUsWWWw_gjJA-TlQiHiFfvc7MEunb2YTfA_i5nSAPk13dfdUY2G2qpk9CIh4loakg9S2-Bvqi5575L9QBPfZ9S4R62NhBcRjS7eOBQvHKpqJLTbHIyQRmkMcD6qjn8K-JJXQ3p9fA'
  }
];

export const MAIN_BURGER_STUDIO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCW8rYNWS6ZBFve0gdaEqb3uI_oiujTY6UIFqD5zuT40Vm6BPZPBsCUG_8cd4jzzB9Oi_Xr5NCP8nrEc0Q8-yCK2dQZAxdnvQief8IpqeS_cJRkhXpexYZ-2Nb0jdPocPALtXJmX1sp3l7VWtEBXlaxqOht_KiQB6riu_4-g9ktJE1WtrlemIovnhRqm2q_dwdwCG0e7QHZFnedcSXECZVolMptjz2VMIzn9XQrPWBsHAs9SSGUG7k';
