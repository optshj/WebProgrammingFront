import WorldMap from "./page";
import { Analytics } from '@vercel/analytics/react';

export default function App() {
    return(
        <>
            <Analytics/>
            <WorldMap />
        </> 
    )
}