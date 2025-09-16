export const FrontEndIcon = ({ size = 48, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* Écran principal */}
        <rect x="8" y="12" width="48" height="32" rx="3" fill={color} stroke={color} strokeWidth="2"/>
        <rect x="12" y="16" width="40" height="24" fill="transparent" stroke={color} strokeWidth="1.5"/>

        {/* Code sur l'écran */}
        <line x1="16" y1="20" x2="28" y2="20" stroke={color} strokeWidth="1" opacity="0.8"/>
        <line x1="16" y1="24" x2="24" y2="24" stroke={color} strokeWidth="1" opacity="0.8"/>
        <line x1="20" y1="28" x2="32" y2="28" stroke={color} strokeWidth="1" opacity="0.8"/>
        <line x1="16" y1="32" x2="20" y2="32" stroke={color} strokeWidth="1" opacity="0.8"/>
        <line x1="16" y1="36" x2="36" y2="36" stroke={color} strokeWidth="1" opacity="0.8"/>

        {/* Curseur */}
        <rect x="40" y="28" width="1" height="4" fill={color}/>

        {/* Support */}
        <rect x="28" y="44" width="8" height="4" fill={color}/>
        <rect x="24" y="48" width="16" height="3" fill={color}/>

        {/* Base */}
        <ellipse cx="32" cy="52" rx="12" ry="2" fill={color}/>
    </svg>
);

export const BackEndIcon = ({ size = 48, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* Rack serveur */}
        <rect x="16" y="8" width="32" height="48" rx="2" fill="transparent" stroke={color} strokeWidth="2"/>

        {/* Serveur 1 */}
        <rect x="18" y="12" width="28" height="8" fill={color}/>
        <circle cx="22" cy="16" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <circle cx="26" cy="16" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <rect x="30" y="14" width="12" height="4" fill="transparent" stroke="black" strokeWidth="1"/>

        {/* Serveur 2 */}
        <rect x="18" y="22" width="28" height="8" fill={color}/>
        <circle cx="22" cy="26" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <circle cx="26" cy="26" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <rect x="30" y="24" width="12" height="4" fill="transparent" stroke="black" strokeWidth="1"/>

        {/* Serveur 3 */}
        <rect x="18" y="32" width="28" height="8" fill={color}/>
        <circle cx="22" cy="36" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <circle cx="26" cy="36" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <rect x="30" y="34" width="12" height="4" fill="transparent" stroke="black" strokeWidth="1"/>

        {/* Serveur 4 */}
        <rect x="18" y="42" width="28" height="8" fill={color}/>
        <circle cx="22" cy="46" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <circle cx="26" cy="46" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        <rect x="30" y="44" width="12" height="4" fill="transparent" stroke="black" strokeWidth="1"/>

        {/* Câbles de connexion */}
        <path d="M8 20 Q4 24 8 28" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M8 32 Q4 36 8 40" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M56 20 Q60 24 56 28" stroke={color} strokeWidth="2" fill="none"/>
        <path d="M56 32 Q60 36 56 40" stroke={color} strokeWidth="2" fill="none"/>
    </svg>
);

export const SoftwareIcon = ({ size = 48, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* Roue crantée principale */}
        <g transform="translate(32,32)">
            {/* Dents extérieures */}
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color}/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(45)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(90)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(135)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(180)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(225)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(270)"/>
            <path d="M0,-20 L3,-18 L3,-22 L-3,-22 L-3,-18 Z" fill={color} transform="rotate(315)"/>

            {/* Corps principal */}
            <circle r="18" fill={color}/>

            {/* Trou central */}
            <circle r="6" fill="transparent" stroke="black" strokeWidth="2"/>

            {/* Détails intérieurs */}
            <circle r="4" fill="transparent" stroke="black" strokeWidth="1"/>
        </g>

        {/* Petite roue crantée */}
        <g transform="translate(20,20)">
            <circle r="8" fill={color}/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color}/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color} transform="rotate(60)"/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color} transform="rotate(120)"/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color} transform="rotate(180)"/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color} transform="rotate(240)"/>
            <path d="M0,-8 L2,-7 L2,-9 L-2,-9 L-2,-7 Z" fill={color} transform="rotate(300)"/>
            <circle r="3" fill="transparent" stroke="black" strokeWidth="1"/>
        </g>
    </svg>
);

export const JSLibIcon = ({ size = 48, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* Livre 1 */}
        <rect x="12" y="16" width="8" height="32" rx="1" fill={color} transform="rotate(-5 16 32)"/>
        <rect x="13" y="18" width="6" height="2" fill="transparent" stroke="black" strokeWidth="0.5" transform="rotate(-5 16 32)"/>

        {/* Livre 2 */}
        <rect x="20" y="14" width="8" height="36" rx="1" fill={color}/>
        <rect x="21" y="16" width="6" height="2" fill="transparent" stroke="black" strokeWidth="0.5"/>
        <text x="24" y="32" textAnchor="middle" fontSize="8" fill="black" fontFamily="monospace">JS</text>

        {/* Livre 3 */}
        <rect x="28" y="18" width="8" height="30" rx="1" fill={color} transform="rotate(3 32 33)"/>
        <rect x="29" y="20" width="6" height="2" fill="transparent" stroke="black" strokeWidth="0.5" transform="rotate(3 32 33)"/>

        {/* Livre 4 */}
        <rect x="36" y="16" width="8" height="32" rx="1" fill={color} transform="rotate(-2 40 32)"/>
        <rect x="37" y="18" width="6" height="2" fill="transparent" stroke="black" strokeWidth="0.5" transform="rotate(-2 40 32)"/>

        {/* Livre 5 */}
        <rect x="44" y="20" width="8" height="28" rx="1" fill={color} transform="rotate(7 48 34)"/>
        <rect x="45" y="22" width="6" height="2" fill="transparent" stroke="black" strokeWidth="0.5" transform="rotate(7 48 34)"/>

        {/* Étagère */}
        <rect x="8" y="48" width="48" height="4" fill={color}/>
        <rect x="8" y="52" width="48" height="2" fill={color} opacity="0.7"/>

        {/* Support vertical */}
        <rect x="8" y="12" width="2" height="40" fill={color}/>
        <rect x="54" y="12" width="2" height="40" fill={color}/>
    </svg>
);

export const TestToolsIcon = ({ size = 48, color = "#ffffff" }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        {/* Clé anglaise principale */}
        <g transform="rotate(45 32 32)">
            {/* Manche */}
            <rect x="28" y="8" width="8" height="32" rx="2" fill={color}/>

            {/* Tête de clé */}
            <ellipse cx="32" cy="44" rx="6" ry="8" fill={color}/>
            <ellipse cx="32" cy="44" rx="3" ry="5" fill="transparent" stroke="black" strokeWidth="2"/>

            {/* Partie ajustable */}
            <rect x="26" y="40" width="4" height="8" fill={color}/>
            <rect x="34" y="40" width="4" height="8" fill={color}/>

            {/* Détail du manche */}
            <rect x="30" y="12" width="4" height="24" fill="transparent" stroke="black" strokeWidth="1"/>
        </g>

        {/* Tournevis en arrière-plan */}
        <g transform="rotate(-30 32 32)" opacity="0.7">
            <rect x="30" y="16" width="4" height="20" fill={color}/>
            <polygon points="30,36 34,36 32,40" fill={color}/>
            <circle cx="32" cy="14" r="3" fill={color}/>
            <circle cx="32" cy="14" r="1.5" fill="transparent" stroke="black" strokeWidth="1"/>
        </g>

        {/* Écrou décoratif */}
        <g transform="translate(20,20)">
            <polygon points="0,-4 3.5,-2 3.5,2 0,4 -3.5,2 -3.5,-2" fill={color} opacity="0.8"/>
            <circle r="2" fill="transparent" stroke="black" strokeWidth="1"/>
        </g>
    </svg>
);

export const getCategoryIcon = (categoryName: string, index: string | number) => {
    const iconProps = {
        size: 96,
        color: "#ffffff"
    };

    const iconMap: Record<string | number, React.ComponentType<{ size: number; color: string }>> = {
        0: FrontEndIcon,
        1: BackEndIcon,
        2: SoftwareIcon,
        3: JSLibIcon,
        4: TestToolsIcon
    };

    const IconComponent = iconMap[index] || FrontEndIcon;
    return <IconComponent {...iconProps} />;
};