'hydrate'
import {AnimatedLucideIconProps} from "@adaptive-js/extension-lucide-animation-icons";

import { signal } from "@adaptive-js/web";
import * as LucideIcons from "@adaptive-js/extension-lucide-animation-icons";

// Lista de todos os ícones disponíveis (nomes das funções exportadas)
const ALL_ICONS = [
    "AArrowDownIcon",
    "AccessibilityIcon",
    "ActivityIcon",
    "AirplayIcon",
    "AlarmClockCheckIcon",
    "AlarmClockIcon",
    "AlarmClockOffIcon",
    "AlignHorizontalSpaceAroundIcon",
    "AlignVerticalSpaceAroundIcon",
    "AnvilIcon",
    "ArchiveIcon",
    "ArrowBigDownDashIcon",
    "ArrowBigDownIcon",
    "ArrowBigLeftDashIcon",
    "ArrowBigLeftIcon",
    "ArrowBigRightDashIcon",
    "ArrowBigRightIcon",
    "ArrowBigUpDashIcon",
    "ArrowBigUpIcon",
    "ArrowDown01Icon",
    "ArrowDown10Icon",
    "ArrowDownAtoZIcon",
    "ArrowDownIcon",
    "ArrowDownLeftIcon",
    "ArrowDownRightIcon",
    "ArrowDownZtoAIcon",
    "ArrowLeftIcon",
    "ArrowLeftRightIcon",
    "ArrowRightIcon",
    "ArrowRightLeftIcon",
    "ArrowUp01Icon",
    "ArrowUp10Icon",
    "ArrowUpAtoZIcon",
    "ArrowUpIcon",
    "ArrowUpLeftIcon",
    "ArrowUpRightIcon",
    "ArrowUpZtoAIcon",
    "AudioLinesIcon",
    "AwardIcon",
    "AxeIcon",
    "Axis3DIcon",
    "BadgeAlertIcon",
    "BadgeCheckIcon",
    "BadgeQuestionMarkIcon",
    "BadgeXIcon",
    "BatteryChargingIcon",
    "BatteryFullIcon",
    "BatteryIcon",
    "BatteryLowIcon",
    "BatteryMediumIcon",
    "BatteryWarningIcon",
    "BeanOffIcon",
    "BeerOffIcon",
    "BellIcon",
    "BellOffIcon",
    "BellRingIcon",
    "BetweenHorizontalEndIcon",
    "BetweenHorizontalStartIcon",
    "BetweenVerticalEndIcon",
    "BetweenVerticalStartIcon",
    "BinaryIcon",
    "BlendIcon",
    "BlocksIcon",
    "BluetoothOffIcon",
    "BoldIcon",
    "BoltIcon",
    "BoneIcon",
    "BookAIcon",
    "BookAudioIcon",
    "BookCheckIcon",
    "BookDashedIcon",
    "BookDownIcon",
    "BookHeadphonesIcon",
    "BookHeartIcon",
    "BookIcon",
    "BookImageIcon",
    "BookKeyIcon",
    "BookLockIcon",
    "BookMarkIcon",
    "BookmarkedIcon",
    "BookmarkCheckIcon",
    "BookmarkIcon",
    "BookmarkMinusIcon",
    "BookmarkPlusIcon",
    "BookmarkXIcon",
    "BookMinusIcon",
    "BookOpenCheckIcon",
    "BookOpenTextIcon",
    "BookPlusIcon",
    "BookTextIcon",
    "BookTypeIcon",
    "BookUp2Icon",
    "BookUpIcon",
    "BookUserIcon",
    "BookXIcon",
    "BotIcon",
    "BotOffIcon",
    "BoxesIcon",
    "BrainCogIcon",
    "BriefcaseBusinessIcon",
    "BriefcaseConveyorBeltIcon",
    "BriefcaseIcon",
    "BriefcaseMedicalIcon",
    "BrushCleaningIcon",
    "BrushIcon",
    "BugOffIcon",
    "CalendarCheck2Icon",
    "CalendarCheckIcon",
    "CalendarCogIcon",
    "CalendarDaysIcon",
    "CalendarOffIcon",
    "CalendarSyncIcon",
    "CalendarX2Icon",
    "CalendarXIcon",
    "CameraOffIcon",
    "CandyOffIcon",
    "CaptionsOffIcon",
    "CastIcon",
    "CctvIcon",
    "ChartBarDecreasingIcon",
    "ChartBarIcon",
    "ChartBarIncreasingIcon",
    "ChartColumnDecreasingIcon",
    "ChartColumnIcon",
    "ChartColumnIncreasingIcon",
    "ChartGanttIcon",
    "ChartLineIcon",
    "ChartNoAxesColumnDecreasingIcon",
    "ChartNoAxesColumnIcon",
    "ChartNoAxesColumnIncreasingIcon",
    "ChartNoAxesCombinedIcon",
    "ChartNoAxesGanttIcon",
    "ChartPieIcon",
    "ChartScatterIcon",
    "ChartSplineIcon",
    "CheckCheckIcon",
    "CheckIcon",
    "CherryIcon",
    "ChevronDownIcon",
    "ChevronLeftIcon",
    "ChevronRightIcon",
    "ChevronUpIcon",
    "ChevronsDownIcon",
    "ChevronsDownUpIcon",
    "ChevronsLeftIcon",
    "ChevronsLeftRightIcon",
    "ChevronsRightIcon",
    "ChevronsRightLeftIcon",
    "ChevronsUpDownIcon",
    "ChevronsUpIcon",
    "CigaretteOffIcon",
    "CircleAlertIcon",
    "CircleArrowDownIcon",
    "CircleArrowLeftIcon",
    "CircleArrowOutDownLeftIcon",
    "CircleArrowOutDownRightIcon",
    "CircleArrowOutUpLeftIcon",
    "CircleArrowOutUpRightIcon",
    "CircleArrowRightIcon",
    "CircleArrowUpIcon",
    "CircleCheckBigIcon",
    "CircleCheckIcon",
    "CircleChevronDownIcon",
    "CircleChevronLeftIcon",
    "CircleChevronRightIcon",
    "CircleChevronUpIcon",
    "CircleOffIcon",
    "CircleParkingOffIcon",
    "CirclePlusIcon",
    "CircleQuestionMarkIcon",
    "CircleXIcon",
    "ClapperboardIcon",
    "ClipboardCheckIcon",
    "ClipboardIcon",
    "ClipboardListIcon",
    "ClipboardPenIcon",
    "ClipboardPenLineIcon",
    "ClipboardXIcon",
    "Clock",
    "Clock1",
    "Clock10",
    "Clock11",
    "Clock12",
    "Clock2",
    "Clock3",
    "Clock4",
    "Clock5",
    "Clock6",
    "Clock7",
    "Clock8",
    "Clock9",
    "CloudCogIcon",
    "CloudDownloadIcon",
    "CloudMoonIcon",
    "CloudOffIcon",
    "CloudUploadIcon",
    "CogIcon",
    "CompassIcon",
    "ContrastIcon",
    "CopyCheckIcon",
    "CopyIcon",
    "CpuIcon",
    "CropIcon",
    "DiamondPlusIcon",
    "Dice1",
    "Dice2",
    "Dice3",
    "Dice4",
    "Dice5",
    "Dice6",
    "DiffIcon",
    "Disc3",
    "DnaOffIcon",
    "DownloadIcon",
    "DropletOffIcon",
    "DrumIcon",
    "EarOffIcon",
    "EclipseIcon",
    "EggOffIcon",
    "ExpandIcon",
    "EyeIcon",
    "EyeOffIcon",
    "FileChartColumnIcon",
    "FileChartColumnIncreasingIcon",
    "FileChartLineIcon",
    "FileCheckCornerIcon",
    "FileCheckIcon",
    "FileCogIcon",
    "FileDownIcon",
    "FileExclamationPointIcon",
    "FileMinusIcon",
    "FilePenIcon",
    "FilePenLineIcon",
    "FilePlusIcon",
    "FileQuestionMarkIcon",
    "FileSlidersIcon",
    "FileStackIcon",
    "FileTerminalIcon",
    "FileTextIcon",
    "FileUpIcon",
    "FileXCornerIcon",
    "FileXIcon",
    "FishOffIcon",
    "FlagOffIcon",
    "FlashlightOffIcon",
    "FlaskConicalOffIcon",
    "FolderCheckIcon",
    "FolderCogIcon",
    "FolderDownIcon",
    "FolderKanbanIcon",
    "FolderPenIcon",
    "FolderPlusIcon",
    "FolderSyncIcon",
    "FolderUpIcon",
    "FolderXIcon",
    "FrameIcon",
    "FunnelXIcon",
    "GalleryHorizontalEndIcon",
    "GalleryHorizontalIcon",
    "GalleryThumbnailsIcon",
    "GalleryVerticalEndIcon",
    "GalleryVerticalIcon",
    "GaugeIcon",
    "GavelIcon",
    "GlobeXIcon",
    "Grid2x2CheckIcon",
    "GripHorizontalIcon",
    "GripIcon",
    "GripVerticalIcon",
    "HammerIcon",
    "HandCoinsIcon",
    "HandHeartIcon",
    "HardDriveDownloadIcon",
    "HardDriveUploadIcon",
    "HeadphoneOffIcon",
    "HeartIcon",
    "HeartOffIcon",
    "HistoryIcon",
    "HopOffIcon",
    "HouseIcon",
    "HouseWifiIcon",
    "ImageDownIcon",
    "ImageOffIcon",
    "ImagesIcon",
    "ImageUpIcon",
    "InfinityIcon",
    "KanbanIcon",
    "KeyboardIcon",
    "KeyboardOffIcon",
    "KeyIcon",
    "KeyRoundIcon",
    "KeySquareIcon",
    "LandmarkIcon",
    "LayersIcon",
    "LayoutDashboardIcon",
    "LayoutGridIcon",
    "LayoutPanelLeftIcon",
    "LayoutPanelTopIcon",
    "LayoutTemplateIcon",
    "LightbulbIcon",
    "LightbulbOffIcon",
    "Link2OffIcon",
    "ListCheckIcon",
    "ListChecksIcon",
    "ListRestartIcon",
    "ListTodoIcon",
    "LoaderPinwheelIcon",
    "LocateOffIcon",
    "LogInIcon",
    "LogOutIcon",
    "MailCheckIcon",
    "MailXIcon",
    "MapPinCheckIcon",
    "MapPinCheckInsideIcon",
    "MapPinOffIcon",
    "MapPinXIcon",
    "MapPinXInsideIcon",
    "Maximize2Icon",
    "MaximizeIcon",
    "MegaphoneOffIcon",
    "MessageCircleCodeIcon",
    "MessageCircleDashedIcon",
    "MessageCircleHeartIcon",
    "MessageCircleIcon",
    "MessageCircleMoreIcon",
    "MessageCircleOffIcon",
    "MessageCircleQuestionMarkIcon",
    "MessageCircleWarningIcon",
    "MessageCircleXIcon",
    "MessageSquareCodeIcon",
    "MessageSquareDashedIcon",
    "MessageSquareDiffIcon",
    "MessageSquareDotIcon",
    "MessageSquareHeartIcon",
    "MessageSquareIcon",
    "MessageSquareMoreIcon",
    "MessageSquareOffIcon",
    "MessageSquarePlusIcon",
    "MessageSquareQuoteIcon",
    "MessageSquareTextIcon",
    "MessageSquareWarningIcon",
    "MessageSquareXIcon",
    "MicIcon",
    "MicOffIcon",
    "MilkOffIcon",
    "Minimize2Icon",
    "MinimizeIcon",
    "MinusIcon",
    "MonitorCheckIcon",
    "MonitorCogIcon",
    "MonitorDownIcon",
    "MonitorOffIcon",
    "MonitorUpIcon",
    "MonitorXIcon",
    "MoonIcon",
    "MouseOffIcon",
    "MousePointer2Icon",
    "MousePointerIcon",
    "MoveDiagonal2Icon",
    "MoveDiagonalIcon",
    "MoveDownIcon",
    "MoveDownLeftIcon",
    "MoveDownRightIcon",
    "MoveHorizontalIcon",
    "MoveLeftIcon",
    "MoveRightIcon",
    "MoveUpIcon",
    "MoveUpLeftIcon",
    "MoveUpRightIcon",
    "MoveVerticalIcon",
    "Navigation2OffIcon",
    "NavigationOffIcon",
    "NfcIcon",
    "NotebookPenIcon",
    "NutOffIcon",
    "OctagonAlertIcon",
    "OctagonXIcon",
    "OrbitIcon",
    "PackageCheckIcon",
    "PackageXIcon",
    "PaintbrushIcon",
    "PanelBottomCloseIcon",
    "PanelBottomIcon",
    "PanelBottomOpenIcon",
    "PanelLeftCloseIcon",
    "PanelLeftIcon",
    "PanelLeftOpenIcon",
    "PanelRightCloseIcon",
    "PanelRightIcon",
    "PanelRightOpenIcon",
    "PanelTopCloseIcon",
    "PanelTopIcon",
    "PanelTopOpenIcon",
    "PaperclipIcon",
    "PencilIcon",
    "PencilLineIcon",
    "PencilOffIcon",
    "PenIcon",
    "PenLineIcon",
    "PenOffIcon",
    "PhoneCallIcon",
    "PhoneOffIcon",
    "PickaxeIcon",
    "PinOffIcon",
    "PlaneIcon",
    "PlayIcon",
    "PlusIcon",
    "PointerOffIcon",
    "PowerOffIcon",
    "PrinterCheckIcon",
    "RabbitIcon",
    "RadarIcon",
    "RadioIcon",
    "RadioTowerIcon",
    "RainbowIcon",
    "RedoDotIcon",
    "RedoIcon",
    "RefreshCcwDotIcon",
    "RefreshCcwIcon",
    "RefreshCwIcon",
    "RefreshCwOffIcon",
    "RocketIcon",
    "RockingChairIcon",
    "RotateCcwIcon",
    "RotateCcwKeyIcon",
    "RotateCwIcon",
    "RouteIcon",
    "RouteOffIcon",
    "RssIcon",
    "SatelliteDishIcon",
    "SaveOffIcon",
    "ScanTextIcon",
    "ScissorsIcon",
    "SearchCheckIcon",
    "SearchIcon",
    "SearchXIcon",
    "SendHorizontalIcon",
    "SendIcon",
    "SendIcon2",
    "ServerCogIcon",
    "ServerOffIcon",
    "SettingsIcon",
    "ShieldAlertIcon",
    "ShieldCheckIcon",
    "ShieldOffIcon",
    "ShieldPlusIcon",
    "ShieldQuestionMarkIcon",
    "ShieldXIcon",
    "ShipIcon",
    "ShipWheelIcon",
    "ShoppingCartIcon",
    "ShovelIcon",
    "ShowerHeadIcon",
    "ShrinkIcon",
    "SignalHighIcon",
    "SignalIcon",
    "SignalLowIcon",
    "SignalMediumIcon",
    "SignalZeroIcon",
    "SignatureIcon",
    "SlidersHorizontalIcon",
    "SlidersVerticalIcon",
    "SmartphoneNfcIcon",
    "SmileIcon",
    "SnowflakeIcon",
    "SparkleIcon",
    "SparklesIcon",
    "SpeechIcon",
    "SpellCheckIcon",
    "SquareArrowDownIcon",
    "SquareArrowDownLeftIcon",
    "SquareArrowDownRightIcon",
    "SquareArrowLeftIcon",
    "SquareArrowOutDownLeftIcon",
    "SquareArrowOutDownRightIcon",
    "SquareArrowOutUpLeftIcon",
    "SquareArrowOutUpRightIcon",
    "SquareArrowRightIcon",
    "SquareArrowUpIcon",
    "SquareArrowUpLeftIcon",
    "SquareArrowUpRightIcon",
    "SquareChartGanttIcon",
    "SquareCheckBigIcon",
    "SquareCheckIcon",
    "SquareChevronDownIcon",
    "SquareChevronLeftIcon",
    "SquareChevronRightIcon",
    "SquareChevronUpIcon",
    "SquareDashedKanbanIcon",
    "SquareKanbanIcon",
    "SquareParkingOffIcon",
    "SquarePenIcon",
    "SquarePlusIcon",
    "SquareScissorsIcon",
    "SquareStackIcon",
    "SquareTerminalIcon",
    "SquareXIcon",
    "StarIcon",
    "StarOffIcon",
    "SunIcon",
    "SwordIcon",
    "TagIcon",
    "TelescopeIcon",
    "TerminalIcon",
    "TextAlignCenterIcon",
    "TextCursorIcon",
    "TextCursorInputIcon",
    "TextSearchIcon",
    "ThermometerIcon",
    "ThumbsDownIcon",
    "ThumbsUpIcon",
    "TicketCheckIcon",
    "TicketXIcon",
    "TimerIcon",
    "TimerOffIcon",
    "ToggleLeftIcon",
    "ToggleRightIcon",
    "TornadoIcon",
    "TouchpadOffIcon",
    "Trash2Icon",
    "TrashIcon",
    "TriangleAlertIcon",
    "UmbrellaOffIcon",
    "UndoDotIcon",
    "UndoIcon",
    "UnfoldHorizontalIcon",
    "UnfoldVerticalIcon",
    "UnplugIcon",
    "UploadIcon",
    "UserCheckIcon",
    "UserCogIcon",
    "UserIcon",
    "UserPenIcon",
    "UserRoundCheckIcon",
    "UserRoundCogIcon",
    "UserRoundIcon",
    "UserRoundPenIcon",
    "UserRoundXIcon",
    "UsersIcon",
    "UsersRoundIcon",
    "UserXIcon",
    "VaultIcon",
    "VibrateIcon",
    "VibrateOffIcon",
    "VideoOffIcon",
    "VolumeOffIcon",
    "VolumeXIcon",
    "VoteIcon",
    "WashingMachineIcon",
    "WavesHorizontalIcon",
    "WebhookOffIcon",
    "WheatOffIcon",
    "WifiHighIcon",
    "WifiIcon",
    "WifiLowIcon",
    "WifiOffIcon",
    "WifiPenIcon",
    "WifiZeroIcon",
    "WineOffIcon",
    "XIcon",
    "ZapOffIcon",
] as const;

export const LucideIconsShowcase = () => {
    const [searchTerm, setSearchTerm] = signal("");
    const [iconSize, setIconSize] = signal(32);
    const [animDuration, setAnimDuration] = signal(300);
    const [randomColors, setRandomColors] = signal(false);

    const filteredIcons = () => {
        const term = searchTerm().toLowerCase();
        if (!term) return ALL_ICONS;
        return ALL_ICONS.filter((name) => name.toLowerCase().includes(term));
    };



    return (
        <div class="icons-showcase">
            <header class="showcase-header">
                <h1>Lucide Animation Icons</h1>
                <p class="showcase-description">
                    {ALL_ICONS.length} ícones animados • Passe o mouse sobre os ícones
                </p>
            </header>

            <div className="showcase-controls">
                <div className="control-group">
                    <label htmlFor="search">Buscar:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Digite o nome do ícone..."
                        value={() => searchTerm()}
                        onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
                    />
                </div>

                <div className="control-group">
                    <label htmlFor="size">Tamanho: {() => iconSize()}px</label>
                    <input
                        id="size"
                        type="range"
                        min="16"
                        max="64"
                        value={() => String(iconSize())}
                        onInput={(e) => setIconSize(Number((e.target as HTMLInputElement).value))}
                    />
                </div>

                <div className="control-group">
                    <label htmlFor="duration">Duração: {() => animDuration()}ms</label>
                    <input
                        id="duration"
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={() => String(animDuration())}
                        onInput={(e) => setAnimDuration(Number((e.target as HTMLInputElement).value))}
                    />
                </div>

                <div className="control-group">
                    <label>Cores:</label>
                    <button
                        type="button"
                        className={() => randomColors() ? "btn-active" : ""}
                        onClick={() => setRandomColors(!randomColors())}
                    >
                        {() => randomColors() ? "🎨 Cores Aleatórias (Ativado)" : "⚪ Cor Padrão"}
                    </button>
                </div>
            </div>

            <div class="showcase-stats">
                Mostrando {() => filteredIcons().length} de {ALL_ICONS.length} ícones
            </div>

            <div class="icons-grid">
                {() =>
                    filteredIcons().map((iconName) => {
                        // @ts-expect-error - acesso dinâmico aos ícones

                        const IconComponent = LucideIcons[iconName];
                        if (!IconComponent) return null;


                     const  cor =   randomColors() ? getRandomColor(iconName) : () => "currentColor"



                        return (
                            <div class="icon-card" >
                                <div class="icon-wrapper">
                                    <IconWrapper
                                        icon={iconName}
                                        size={() => iconSize()}
                                        duration={animDuration()}
                                        animateOnHover={true}
                                        color={  cor  }
                                    />
                                </div>
                                <span class="icon-name">{iconName}</span>
                            </div>
                        );
                    })
                }
            </div>

            {() =>
                filteredIcons().length === 0 && (
                    <div class="empty-state">
                        <p>Nenhum ícone encontrado para "{searchTerm()}"</p>
                    </div>
                )
            }
        </div>
    );
};





// Tipamos 'icon' com a união dos nomes dos ícones
type IconName = typeof ALL_ICONS[number];

interface IconWrapperProps extends AnimatedLucideIconProps {
    icon: IconName;
    color?: string  | (()  => string) ;

}

export const IconWrapper = (props: IconWrapperProps) => {
    // Separa a propriedade 'icon' das outras props de animação/estilo
    const { icon , color = () => "currentColor", ...iconProps } = props;

    // Acessa o componente do ícone do pacote com casting adequado
    const IconComponent = (LucideIcons as Record<string, any>)[icon];

    if (!IconComponent) return null;

    // Repassa todas as props diretamente para o ícone do Adaptive
    return <IconComponent {...{...iconProps , color} } />;
};


const getRandomColor = (seed: string) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1) * 16777215).toString(16);
    return  () => `#${color.padStart(6, '0')}`;
};