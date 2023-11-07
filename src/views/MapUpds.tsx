import { LocationObject, getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps'
import * as Location from "expo-location"
import { View } from 'react-native';
import { Texto } from '@/ui';
import { Image } from 'expo-image';

const MapUpds = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            let { status } = await Location.requestBackgroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setIsLoading(false)
        })();
    }, []);

    return (
        <>
            <Texto>{JSON.stringify(location)}</Texto>
            {isLoading ?
                <></>

                :
                <MapView
                    provider={"google"}
                    showsMyLocationButton
                    cacheEnabled
                    showsUserLocation
                    style={{ width: "100%", height: 500 }}

                    zoomEnabled
                    zoomControlEnabled
                    minZoomLevel={4}
                    maxZoomLevel={10}
                >

                    {/*    <Marker coordinate={{
                        latitude: -21.53699593119491,
                        longitude: -64.74181277984088
                    }}
                        title='UPDS Tarija'
                        description='hola mundo xdd'
                    >
                        <View className='bg-white w-18 h-18 p-1 rounded-full'>
                            <Image
                                source={require("~/assets/images/app/logo-light.png")}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                contentFit='contain'
                            />
                        </View>

                    </Marker> */}
                    <Marker
                        coordinate={{
                            latitude: -21.53699593119491,
                            longitude: -64.74181277984088
                        }}
                        title='UPDS Tarija'
                        description='hola mundo xdd'
                        image={{ uri: "https://www.upds.edu.bo/wp-content/uploads/2020/12/upds-logo-social-preview.jpg", width: 10, height: 10, scale: .1 }}

                    />
                </MapView>
            }

        </>
    )
}

export default MapUpds