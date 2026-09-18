'use client';
import { usePathname } from 'next/navigation';
import { RoboRyan } from './RoboRyan';
export function RoboRyanMount({live=false}:{live?:boolean}){const path=usePathname();return path==='/robo-ryan-preview'?null:<RoboRyan live={live}/>}
