<script>
    import { onMount } from 'svelte'
    import mapboxgl from 'mapbox-gl'
    import 'mapbox-gl/dist/mapbox-gl.css'

    // The Mapbox access token in read from .env/static/private
    // by the load() function in ./+page.server.js
    let { data } = $props()
    const accessToken = data.mapbox.token

    const places = [
        {lng: -1.3439, lat: 52.6298, zoom: 5, label: 'Newbold Verdon'},
        {lng: -1.3439, lat: 52.7, zoom: 5, label: 'Newbold Verdon 2'},
        {lng: -3.5112, lat: 50.3854, zoom: 5, label: 'Brixham'},
        {lng: -114.0072, lat: 46.8571, zoom: 5, label: 'Sweet Home!'},
    ]
    const start = places[0]
    
    let map
    let mapContainer
    let lat = $state(start.lat)
    let lng = $state(start.lng)
    let zoom = $state(start.zoom)
    let initialState = start
    
    onMount(() => {
        map = new mapboxgl.Map({
            container: mapContainer,
            accessToken,
            center: [lng, lat],
            bearing: 0,
            zoom,
	        // style: 'mapbox://styles/mapbox/streets-v12', // style URL
        })
        map.on('move', () => {
            updateData()
        })

        const props = {color: "magenta", rotation: 0, scale: 1}
        for(let i=0; i<places.length; i++) {
            const p = places[i]
            const home = new mapboxgl.Marker(props)
                .setLngLat([p.lng, p.lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<h1>${p.label}</h1>`))
            .addTo(map)
        }
    })
    
    function updateData() {
        zoom = map.getZoom()
        lng = map.getCenter().lng
        lat = map.getCenter().lat
    }
    function handleReset() {
        map.flyTo({
            center: [initialState.lng, initialState.lat],
            zoom: initialState.zoom,
            essential: true,
            compact: true,
        })
    }
</script>

<div class="m-4">
    <div class="map" bind:this={mapContainer} style='width: 800px; height: 800px;'></div>
    <div class="sidebar absolute top-6 left-6 bg-blue-500 rounded opacity-70">
        Lon: {lng.toFixed(4)} | Lat: {lat.toFixed(4)} | Zoom: {zoom.toFixed(2)}
    </div>
    <button onclick={handleReset} class="reset-button">Reset</button>
</div>

<style>
    #marker {
        background-image: url('https://docs.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg');
        background-size: cover;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
    }

    .mapboxgl-popup {
        max-width: 200px;
    }
</style>
