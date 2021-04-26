import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Leaflet from "leaflet";
import mapGuitar from "../../assets/guitar.svg";
import './styles.css';
import { Event } from '../../services/typesEvent';
import { useState, useEffect } from 'react';
import { fetchLocalMapBox, fetchEvents } from "../../api";
import AsyncSelect from "react-select/async";
import { toast } from "react-toastify";

const initialPosition = { lat: -22.2154042, lng: -44.8331331 };

type Place = {
    label?: string;
    value?: string;
    position: {
      lat: number;
      lng: number;
    }
}

const mapGuitarIcon = Leaflet.icon({
    iconUrl: mapGuitar,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

function CreateEvent(){
    const [eventsEntities, setEventsEntities] = useState<Event[]>([]);

    const [address, setAddress] = useState<Place>({
        position: initialPosition
    })

    useEffect( () => {
        fetchEvents()
            .then(response => setEventsEntities(response.data))
            .catch(() =>
                toast.warning('Falha ao carregar eventos!')
             )
    },[]);
        
    const loadOptions = (inputValue: string, callback:(place: Place[]) => void): void => {
        fetchLocalMapBox(inputValue).then(({data}) => {
          callback(data.features.map((item: any) => ({
            label: item.place_name,
            value: item.place_name,
            position: {
              lat: item.center[1],
              lng: item.center[0]
           }
          })))
        })
     }
   
    const handleChangeSelect = (place: Place) => {
        setAddress(place);
      };
    
    return( 
        <div id="page-map">
            <main>
                <form className="landing-page-form">
                    <fieldset>
                        <legend>Procurar Eventos</legend>

                        <div className="input-block">
                            <label htmlFor="address">Endereço</label>
                            <AsyncSelect
                                placeholder="Digite seu endereço..."
                                classNamePrefix="filter"
                                cacheOptions
                                required={true}
                                loadOptions={loadOptions}
                                onChange={value => handleChangeSelect(value as Place)}
                                value={address}
                            />
                        </div>
                       
                    </fieldset>
                </form>
            </main>
            <MapContainer
                key={address.position.lat}
                center={address.position}
                zoom={13}
                style={{ width: "100%", height: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {eventsEntities.map((eventsEntities) => (
                <Marker  
                    key={eventsEntities.id}
                    icon={mapGuitarIcon}
                    position={[eventsEntities.latitude, eventsEntities.longitude]}>
                    <Popup
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                    >
                    <div>
                        <h3>{eventsEntities.name}</h3>
                        <p>
                            {eventsEntities.address}
                            {eventsEntities.price}
                        </p>
                    </div>
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default CreateEvent;




