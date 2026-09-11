import type { ReactNode } from "react";

const navy = "#102b50", blue = "#439df2", pale = "#dcedfc";
/** Bold brand silhouettes with restrained drafting detail. Shared by cards and dialogs. */
function Detail({ children }: { children: ReactNode }) {
 return <g fill="none" stroke="#367bb4" strokeWidth=".8" opacity=".75">{children}</g>;
}
function Tube({d,width=15}:{d:string;width?:number}) {
 return <g fill="none"><path d={d} stroke={navy} strokeWidth={width+5}/><path d={d} stroke={blue} strokeWidth={width}/><path d={d} stroke={pale} strokeWidth={Math.max(2,width*.3)} transform="translate(-2 -2)"/></g>;
}
function Joint({x,y,turn=0}:{x:number;y:number;turn?:number}) {
 return <g transform={`translate(${x} ${y}) rotate(${turn})`}><rect x="-6" y="-13" width="12" height="26" rx="1.5" fill="white" strokeWidth="3.5"/><Detail><path d="M1-9V9M4-9V9"/></Detail></g>;
}
function Drop({x=105,y=121}:{x?:number;y?:number}) {
 return <g transform={`translate(${x} ${y})`}><path d="M0-15C-3-8-12 1-12 8a12 12 0 0 0 24 0C12 1 3-8 0-15Z" fill={blue} strokeWidth="3.5"/><path d="M-5 3q-5 9 2 12" stroke="white" strokeWidth="2.5" fill="none"/></g>;
}
function Tank({x=44,y=34,w=72,h=125}:{x?:number;y?:number;w?:number;h?:number}) {
 return <g><rect x={x} y={y} width={w} height={h} rx="12" fill="white"/><path d={`M${x+w-12} ${y+12}V${y+h-12}`} stroke={blue} strokeWidth="13"/><rect x={x} y={y} width={w} height={h} rx="12" fill="none"/><Detail><path d={`M${x+5} ${y+12}H${x+w-5}M${x+5} ${y+h-12}H${x+w-5}M${x+w/2} ${y+3}V${y+h-3}`} strokeDasharray="4 3"/></Detail></g>;
}
function Faucet() {
 return <g><Tube d="M32 157V108Q32 85 57 85H65" width={9}/><path d="M22 159H44M27 114H15V104M11 104H23" fill="none"/><path d="M59 79H72V91H59Z" fill="white"/><Detail><path d="M36 112V146M42 94H55"/></Detail></g>;
}
function Toilet() {
 return <g fill="white"><rect x="83" y="48" width="56" height="48" rx="5"/><path d="M81 45H141V55H81ZM77 99H144Q144 130 123 135L131 158H91L99 132Q78 122 77 99Z"/><path d="M80 102H140Q133 122 111 123Q90 121 80 102Z" fill={blue}/><path d="M99 135H121M94 158H132"/><circle cx="96" cy="67" r="3" fill={blue} strokeWidth="2"/><Detail><path d="M111 59V95M111 111V153" strokeDasharray="3 3"/><path d="M88 89H134M96 150H125"/></Detail></g>;
}
function House() {
 return <g><path d="M16 78L77 28L146 78M26 74V158H136V73" fill="white"/><path d="M30 81L77 42L132 82" fill="none" stroke={blue} strokeWidth="8"/><path d="M53 158V113H81V158M96 99H121V124H96Z" fill={pale}/><Detail><path d="M39 87V150M91 79V152M126 88V150M30 137H132M30 143H132M31 82H129M102 103V120M97 111H120M77 17V172" strokeDasharray="4 3"/></Detail><Tube d="M36 146H96V132H127" width={6}/></g>;
}
function Artwork({id}:{id:string}) {
 switch(id) {
 case "heater": return <><path d="M59 35V17H66V35M94 35V17H101V35" fill={blue}/><Tank/><path d="M53 161V168M106 161V168"/><rect x="65" y="96" width="31" height="44" rx="4" fill={blue} strokeWidth="3"/><circle cx="80" cy="67" r="10" fill="white" strokeWidth="3"/><path d="M80 67L84 61" strokeWidth="2"/><Detail><path d="M72 100V135M102 144l6-5m-6 9 6-5"/><circle cx="71" cy="102" r="1.4"/><circle cx="90" cy="133" r="1.4"/></Detail></>;
 case "leaks": return <><Tube d="M38 159V91Q38 58 72 58H143" width={22}/><Joint x={38} y={132} turn={90}/><Joint x={93} y={58}/><Detail><path d="M38 113V91Q38 58 72 58H139" strokeDasharray="4 4"/><path d="M113 65l6-5m0 5 6-5m0 5 6-5m0 5 6-5"/></Detail><Drop x={112} y={115}/></>;
 case "drains": return <><Tube d="M40 60V116Q40 153 79 153Q118 153 118 116V37" width={21}/><Joint x={40} y={66} turn={90}/><Joint x={118} y={91} turn={90}/><Joint x={118} y={35} turn={90}/><Detail><path d="M40 80V117Q40 153 79 153Q118 153 118 116V49" strokeDasharray="4 4"/><path d="M60 153l4-6m3 8 4-6m3 8 4-6"/></Detail></>;
 case "fixtures": return <><Faucet/><Toilet/></>;
 case "softener": return <><Tank x={24} y={52} w={53} h={108}/><Tank x={93} y={89} w={43} h={71}/><rect x="28" y="25" width="47" height="24" rx="4" fill="white"/><rect x="35" y="31" width="23" height="11" fill={blue} strokeWidth="2"/><circle cx="66" cy="34" r="2" fill={navy} stroke="none"/><path d="M49 49V52M77 66H111V89" fill="none"/><Detail><path d="M31 147l7-5m-3 9 7-5m-3 9 7-5M100 148H130"/></Detail></>;
 case "gas": return <><Tube d="M23 130H139" width={21}/><Joint x={35} y={130}/><Joint x={126} y={130}/><rect x="61" y="117" width="41" height="26" rx="4" fill={blue}/><path d="M80 116V99M63 99H98" fill="none"/><path d="M81 83C56 79 59 61 71 53Q71 66 79 65Q91 55 80 32C111 52 114 75 92 83Z" fill={blue} strokeWidth="3"/><Detail><path d="M47 137l5-5m0 5 5-5M68 123H96M80 125V139" strokeDasharray="3 3"/></Detail></>;
 case "pump": return <><path d="M19 69V148Q19 167 39 167H125Q143 167 143 148V69" fill={pale}/><path d="M24 130H138V148Q138 162 125 162H39Q24 162 24 148Z" fill={blue} stroke="none"/><Tube d="M86 124V33H123" width={10}/><Joint x={86} y={60} turn={90}/><path d="M11 69H46M119 69H151M65 157V115Q65 108 72 108H101Q108 108 108 115V157Z" fill="white"/><rect x="70" y="129" width="33" height="23" rx="2" fill={blue} strokeWidth="2"/><path d="M58 70V104L49 132M43 113L54 116L51 137L40 134Z" fill={blue} strokeWidth="3"/><Detail><path d="M18 78l-7 7m7 2-7 7m7 2-7 7M143 78l7 7m-7 2 7 7m-7 2 7 7M28 96H136M29 146H136" strokeDasharray="3 3"/></Detail></>;
 case "emergency": return <><path d="M43 140V96a37 37 0 0 1 74 0V140Z" fill={blue}/><path d="M36 140H124V153H36Z" fill="white"/><path d="M80 28V43M30 50L41 61M12 94H28M130 50L119 61M133 94H149" stroke={blue} fill="none"/><path d="M58 128V98Q58 76 79 75" stroke="white" strokeWidth="7" fill="none"/><Detail><path d="M80 64V133" strokeDasharray="3 3"/><path d="M103 122l7-5m-7 11 7-5"/></Detail></>;
 case "plans": return <><path d="M34 22H105L131 49V166H34Z" fill="white"/><path d="M104 23V50H131" fill={pale}/><path d="M49 66H115V123H49ZM77 67V91H114M50 104H76V123" fill={pale} strokeWidth="3"/><path d="M78 110H98V124M52 141H97M52 151H83" stroke={blue} strokeWidth="4"/><Detail><path d="M44 59H121M44 130H121M43 58V132M121 58V132M49 95H77" strokeDasharray="3 3"/><path d="M107 143l7-5m-7 10 7-5"/></Detail></>;
 case "underground": return <><path d="M16 50H144M22 51V158H138V51" fill={pale} strokeWidth="3"/><Tube d="M38 64V112Q38 130 57 130H115M81 132V158" width={15}/><Joint x={38} y={79} turn={90}/><Joint x={114} y={130}/><Detail><path d="M24 62l10-7m-10 16 10-7M126 70l10-7m-10 16 10-7M29 145H132M80 56V170" strokeDasharray="3 3"/></Detail></>;
 case "roughin": return <><path d="M26 25H135V163H26Z" fill="white"/><g stroke={blue} strokeWidth="3"><path d="M57 27V161M96 27V161M28 43H133M28 148H133"/></g><Tube d="M40 61H112V94H77V134H43" width={10}/><Joint x={78} y={61}/><Detail><path d="M31 31H130M32 156H130M48 26V164M108 26V164" strokeDasharray="4 4"/><path d="M36 151l7-5m1 5 7-5"/></Detail></>;
 case "service": return <><path d="M22 84L65 49L107 84M32 80V121H97V80" fill="white"/><path d="M50 121V91H75V121" fill={pale}/><Tube d="M17 155H81V137H136V105" width={12}/><Joint x={110} y={137}/><rect x="121" y="83" width="29" height="22" rx="3" fill={blue}/><Detail><path d="M15 128H147M16 170H148M65 54V115" strokeDasharray="4 4"/><path d="M34 163l7-4m0 4 7-4"/></Detail></>;
 case "trim": case "remodels": return <><Faucet/><path d="M85 50H141V152H85Z" fill="white"/><path d="M92 65H132M92 89H132M92 113H132" stroke={blue} strokeWidth="3"/><path d="M96 136l8 7 18-19" stroke={blue} fill="none"/><Detail><path d="M111 55V119" strokeDasharray="3 3"/><path d="M128 144l7-5m-7 10 7-5"/></Detail></>;
 case "house": return <House/>;
 default: return <><Tube d="M29 132L117 44" width={12}/><path d="M109 32Q142 26 134 61L121 58L109 45Z" fill={blue}/><Detail><path d="M45 120L101 64" strokeDasharray="4 4"/></Detail></>;
 }
}
export function ServiceSketch({id,className}:{id:string;className?:string}) {
 return <svg viewBox="0 0 160 190" className={className} data-illustration={id} fill="none" stroke={navy} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><Artwork id={id}/></svg>;
}
export function PipeBanner() {
 return <svg viewBox="0 0 520 190" preserveAspectRatio="xMaxYMid slice" fill="none" stroke={navy} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <Tube d="M25 159H85Q112 159 112 131V95Q112 58 153 58H238Q278 58 278 25V0M238 58H540" width={24}/>
 {[[45,159,0],[112,111,90],[157,58,0],[224,58,0],[278,17,90],[326,58,0],[423,58,0]].map(([x,y,turn])=><Joint key={x+"-"+y} x={x} y={y} turn={turn}/>)}
 <Detail><path d="M32 159H85Q112 159 112 131V95Q112 58 153 58H508M278 7V26" strokeDasharray="6 5"/><path d="M148 84H500M135 96V150M155 81V87M500 81V87"/>{[175,185,195,205,345,355,365].map(x=><path key={x} d={`M${x} 65l6-5`}/>)}</Detail>
 <g fill="#3978d4" stroke="none" fontSize="13" fontWeight="600" fontStyle="italic" letterSpacing="1" transform="rotate(-5 335 111)"><text x="335" y="106">QUALITY PLUMBING</text><text x="335" y="126">STRONGER HOMES.</text></g>
 </svg>;
}
