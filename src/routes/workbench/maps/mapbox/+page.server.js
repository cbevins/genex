import { MAPBOX, NAME } from '$env/static/private'
console.log('genex/src/routes/mapbox/+page.server.js loaded the .env')
export function load() {
    return {mapbox: {token: MAPBOX}}
}