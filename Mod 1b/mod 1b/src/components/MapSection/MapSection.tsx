import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./MapSection.css"

function MapSection(props: { crimes: any; }){
    let crimes = props.crimes

    //console.log(crimes)

    if (crimes != null){
        if(crimes.length===0){
            return (
                <p>There were no crimes reported in that area during the  given timeframe</p>
            )
        } else {
            return (
                <MapContainer center={[crimes[0].location.latitude, crimes[0].location.longitude]} zoom={13} scrollWheelZoom={true} style={{height:"200px", width: "400px"}}>
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        crimes.map((crime: { location: { latitude: number; longitude: number; }; id: string; category: string| null; outcome_status: {category: string}| null})=> (
                            <Marker  position={[crime.location.latitude, crime.location.longitude]} key={crime.id}>
                                <div className="flex flex-row">
                                    <Popup >
                                        Category: {crime.category}
                                        OutCome: {crime.outcome_status === null?"There is no outcome yet.": crime.outcome_status.category}
                                    </Popup>
                                </div>
        
                            </Marker>
                        ))
                    }
                </MapContainer>
            )
        }
    }
}

export default MapSection