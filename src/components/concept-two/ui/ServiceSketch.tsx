import { useId } from "react";

/** Detailed technical drawings, kept as vectors for crisp phone and desktop rendering. */
function Pipe({ d, width = 14 }: { d: string; width?: number }) {
 return <><path d={d} strokeWidth={width + 2.4}/><path d={d} stroke="#fff" strokeWidth={width}/><path d={d} stroke="#a8c3d7" strokeWidth={width - 5}/><path d={d} stroke="#fff" strokeWidth={width - 7}/></>;
}
function Collar({ x, y, rotate = 0 }: {x:number;y:number;rotate?:number}) {
 return <g transform={`translate(${x} ${y}) rotate(${rotate})`} fill="#fff"><rect x="-4" y="-12" width="8" height="24" rx="1"/><path d="M-1-11V11M2-11V11" strokeWidth=".65"/></g>;
}
function Valve({x=80,y=80}: {x?:number;y?:number}) {
 return <g transform={`translate(${x} ${y})`} fill="#fff"><path d="M-12-8H12V8H-12ZM-5-8V-23H5V-8"/><ellipse cy="-25" rx="19" ry="4"/><path d="M-16-25H16M0-28V-22M-8-29V-21M8-29V-21" strokeWidth=".75"/><path d="M-8 4H8M-8-4H8"/></g>;
}
function Tap({ x=80,y=70 }: {x?:number;y?:number}) {
 return <g transform={`translate(${x} ${y})`}><Pipe d="M0 60V0C0-24 30-24 30 0V8" width={7}/><path d="M-9 61H10V65H-9ZM25 7H35V12H25M-15 51V30H-9V51M-21 30H-3" fill="#fff"/></g>;
}
function Tank({x=45,y=40,w=70,h=108}: {x?:number;y?:number;w?:number;h?:number}) {
 return <g fill="#fff"><path d={`M${x} ${y}v${h}c0 12 ${w} 12 ${w} 0V${y}`}/><ellipse cx={x+w/2} cy={y} rx={w/2} ry="9"/><path d={`M${x+4} ${y+5}v${h-4}M${x+8} ${y+7}v${h-6}M${x+w-6} ${y+7}v${h-6}`} stroke="#819db4" strokeWidth=".7"/><path d={`M${x+2} ${y+h-5}q${w/2} 12 ${w-4} 0M${x+8} ${y+h+9}v6m${w-16} -6v6`}/></g>;
}
function Drops() {return <g fill="#c0dcec"><path d="M73 119c-2 7-7 11-7 16a7 7 0 0 0 14 0c0-5-5-9-7-16ZM67 147c-2 5-5 8-5 11a5 5 0 0 0 10 0c0-3-3-6-5-11Z"/></g>}
function House() {
 return <g fill="none"><path d="M9 78L73 25L151 59L92 104ZM9 78V148L92 169L151 117V59M92 104V169M73 25V89M9 148L73 89L151 117M6 82L73 20L157 57"/>{[23,37,51,65].map(x=><path key={x} d={`M${x} ${78-(x-9)*.82}V${148-(x-9)*.91}M${x} ${82+(x-9)*.27}V${148+(x-9)*.25}`}/>)}{[104,116,128,140].map(x=><path key={x} d={`M${x} ${104-(x-92)*.76}V${169-(x-92)*.88}`}/>)}<path d="M14 126L86 145M14 132L86 151M98 139L147 96M98 145L147 102M35 100V132H54V105ZM109 113V142L128 126V97M73 31L17 79L91 99L146 60Z"/><path d="M31 137V110H44V128H65V103H81V147M101 153V119L120 103V82" strokeWidth="3" stroke="#7da6c6"/><path d="M0 158L94 183L160 126M0 163L94 188M4 49H155M73 6V177M0 175H160" strokeWidth=".45" opacity=".55"/></g>;
}

export function ServiceSketch({id}: {id:string}) {
 const uid=useId().replace(/:/g,"");
 return <svg viewBox="0 0 160 190" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
 <defs><pattern id={uid} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0 0V5" stroke="#95aec3" strokeWidth=".65"/></pattern></defs>
 <g stroke="#b3c8d9" strokeWidth=".45" opacity=".65"><path d="M9 17V179M151 17V179M4 173H156M4 22H156M6 176l6-6M148 176l6-6M6 25l6-6M148 25l6-6"/><path d="M80 7V184M3 95H157" strokeDasharray="5 4"/></g>
 {id==="heater"&&<><Tank/><Pipe d="M60 31V16M100 31V16" width={6}/><Collar x={60} y={22} rotate={90}/><Collar x={100} y={22} rotate={90}/><path d="M74 30V13H86V30M77 13V7H83V13" fill="#fff"/><circle cx="80" cy="64" r="8"/><circle cx="80" cy="64" r="5"/><path d="M80 64l3-3"/><rect x="69" y="111" width="23" height="28" rx="2" fill={`url(#${uid})`}/><rect x="74" y="116" width="13" height="13" fill="#fff"/><circle cx="80" cy="122" r="3"/><Pipe d="M44 137H31V161H22" width={5}/><path d="M25 135H37M29 131H33V140M58 151H103"/></>}
 {id==="leaks"&&<><Pipe d="M42 19V81Q42 105 67 105H143"/><Collar x={42} y={51} rotate={90}/><Collar x={89} y={105}/><Collar x={123} y={105}/><path d="M64 99l7 5-6 6 8 6M29 22V73M34 22V74M97 100H118M97 108H118" strokeWidth=".65"/><Drops/></>}
 {id==="drains"&&<><ellipse cx="49" cy="32" rx="24" ry="6" fill="#fff"/><Pipe d="M49 39V115Q49 143 76 143Q102 143 102 116V95Q102 78 132 78" width={16}/><Collar x={49} y={60} rotate={90}/><Collar x={102} y={111} rotate={90}/><Collar x={127} y={78}/><ellipse cx="49" cy="32" rx="17" ry="3"/><path d="M36 40H61M38 45H60M56 133Q77 151 91 132M127 67V90" strokeWidth=".65"/></>}
 {id==="fixtures"&&<><Tap x={28} y={55}/><g fill="#fff"><rect x="82" y="64" width="56" height="47" rx="5"/><path d="M79 63H141V69H79ZM84 112H139Q139 139 119 143L131 165H92L97 140Q81 130 84 112Z"/><ellipse cx="111" cy="113" rx="29" ry="6"/><ellipse cx="111" cy="114" rx="23" ry="3"/><path d="M99 141H119M96 158H124M88 73H132M88 100H132"/><circle cx="94" cy="80" r="2"/></g></>}
 {id==="softener"&&<><Tank x={75} y={60} w={49} h={94}/><Tank x={19} y={94} w={43} h={64}/><rect x="82" y="25" width="39" height="28" rx="3" fill="#fff"/><rect x="87" y="30" width="20" height="13" fill={`url(#${uid})`}/><circle cx="114" cy="34" r="2"/><circle cx="114" cy="43" r="2"/><path d="M93 54V59H106V54M39 88V69H81M42 88V73H81M25 97H56M25 101H56M84 145H116"/></>}
 {id==="gas"&&<><Pipe d="M27 163V93Q27 79 43 79H146" width={10}/><Valve x={91} y={79}/><Collar x={53} y={79}/><Collar x={131} y={79}/><path d="M19 163H35M18 156H36M18 151H36M59 76H72M108 76H120M59 82H72M108 82H120" strokeWidth=".7"/></>}
 {id==="pump"&&<><path d="M16 93H49M108 93H146M39 96V160Q79 181 124 160V96"/><path d="M18 99H37V167Q81 190 129 167V99H146" fill={`url(#${uid})`}/><ellipse cx="81" cy="158" rx="34" ry="11"/><Pipe d="M84 145V28Q84 18 95 18H119" width={7}/><Collar x={84} y={62} rotate={90}/><path d="M62 142V159H105V141L96 129H73Z" fill="#fff"/><path d="M67 146V158M72 143V160M77 143V160M96 141V159M101 144V159M58 141V119H66V143M101 129V105Q111 95 110 68V42"/><circle cx="110" cy="64" r="4"/><path d="M29 88l-8-5m10-6-9-4m113 13 8-5M47 151H57M107 151H120"/></>}
 {id==="emergency"&&<><path d="M49 132V92a31 31 0 0 1 62 0V132M43 132H117V145H43ZM39 145H121V151H39Z" fill="#fff"/><path d="M58 123V94Q58 73 77 71M63 124V94Q63 80 76 77M85 72Q103 76 104 94V125" stroke="#86aac6"/><path d="M80 41V24M44 54L31 40M27 87H11M115 54L128 40M132 87H149M59 44L53 30M102 44L108 30" strokeWidth="2"/></>}
 {id==="plans"&&<><path d="M23 53L127 31L143 138L40 164Z" fill="#fff"/><path d="M23 53Q12 46 14 33Q20 23 28 32L45 148Q39 166 29 157M127 31Q135 20 140 32L153 129Q150 140 143 138" fill="#fff"/><g transform="rotate(-12 80 96)"><path d="M45 61H118V129H45ZM45 89H80V61M80 89H118M80 129V104M45 113H64V129M94 89V111H118M84 111H96M52 68H69V79H52ZM99 66H111V79H99Z"/><path d="M48 86H61M65 86H77M83 92V104M48 110H60M98 115H113M37 59V134M34 61H40M34 129H40M44 138H119M45 135V141M118 135V141" strokeWidth=".55"/><path d="M67 113a15 15 0 0 1 13-14M95 90a16 16 0 0 0 15 15" strokeWidth=".7"/></g></>}
 {id==="underground"&&<><path d="M7 102L111 35L153 51L49 132ZM7 102V130L50 155L153 78V51M50 132V155" fill={`url(#${uid})`}/><path d="M26 113L127 47M41 127L144 58M26 113V136M41 127V146" fill="#fff"/><Pipe d="M34 135L137 63" width={11}/>{[55,81,108].map((x)=><Collar key={x} x={x} y={135-(x-34)*.699} rotate={-35}/>)}<path d="M13 100L18 96M27 91L32 88M50 77L55 74M67 67L72 64M98 47L102 44M55 160L156 86" strokeDasharray="2 4"/></>}
 {id==="roughin"&&<><path d="M23 31L139 16V155L23 175Z" fill={`url(#${uid})`}/>{[27,58,91,126].map(x=><path key={x} d={`M${x} ${34-(x-27)*.13}V${170-(x-27)*.15}H${x+6}V${33-(x-27)*.13}Z`} fill="#fff"/>)}<path d="M23 35L139 20M23 167L139 149"/><Pipe d="M42 151V110H78V57H113V135" width={6}/><Pipe d="M78 110V148M42 86H78M78 75H107" width={4}/><Collar x={78} y={94} rotate={90}/><path d="M38 112H47M74 58H83M107 132H120"/></>}
 {id==="service"&&<><path d="M14 43H146V65H14ZM14 110H146V148H14Z" fill={`url(#${uid})`}/><path d="M95 26V159H123V26Z" fill={`url(#${uid})`}/><Pipe d="M13 91H108V154M108 91H147" width={10}/><Collar x={46} y={91}/><Collar x={82} y={91}/><Collar x={136} y={91}/><path d="M95 67H123M96 119H123M22 48H64M71 54H88M19 129H70M24 138H83M130 121H143" strokeWidth=".6"/><path d="M54 74V64H76V76" fill="#fff"/><rect x="52" y="76" width="27" height="24" rx="3" fill="#fff"/><circle cx="65" cy="86" r="8"/><path d="M65 86l4-3"/></>}
 {id==="trim"&&<><Tap x={36} y={87}/><Pipe d="M96 154V42Q96 26 113 26H130V42" width={5}/><path d="M121 42H139L145 51H115ZM116 55v4m7-4v4m7-4v4m7-4v4m7-4v4M90 94H104V117H90Z" fill="#fff"/><circle cx="97" cy="105" r="4"/><path d="M22 158H62V165H22M85 155H110V163H85M63 123H82V144H63Z" fill="#fff"/></>}
 {id==="house"&&<House/>}
 </svg>;
}

export function PipeBanner() {return <svg viewBox="0 0 520 190" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><g opacity=".25" strokeWidth=".5">{Array.from({length:15},(_,i)=><path key={i} d={`M${i*36} 0V190`}/>)}{[20,55,90,125,160].map(y=><path key={y} d={`M0 ${y}H520`}/>)}</g><Pipe d="M25 159H85Q112 159 112 131V95Q112 58 153 58H238Q278 58 278 25V0M238 58H515" width={18}/>{[[45,159,0],[112,111,90],[157,58,0],[224,58,0],[278,17,90],[326,58,0],[423,58,0]].map(([x,y,r])=><Collar key={`${x}-${y}`} x={x} y={y} rotate={r}/>)}<path d="M30 175H100M129 91V142M150 39H247M341 77H508M326 35V85M20 184H105M20 180V188M105 180V188" strokeWidth=".6"/><text x="360" y="120" fill="currentColor" stroke="none" fontSize="13" letterSpacing="2" transform="rotate(-5 360 120)">QUALITY WORK</text><text x="360" y="140" fill="currentColor" stroke="none" fontSize="13" letterSpacing="2" transform="rotate(-5 360 140)">IN EVERY LINE.</text></svg>}

