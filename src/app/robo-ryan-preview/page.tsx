import type { Metadata } from 'next';
import { RoboRyan } from '@/components/robo-ryan/RoboRyan';
export const metadata:Metadata={title:'RoboRyan preview',robots:{index:false,follow:false}};
export default function RoboRyanPreview(){return <RoboRyan studio offline/>}
