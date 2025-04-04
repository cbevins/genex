<script>
    import scroll from '/src/lib/maps/SimpleMaps/scroll1.png'
    import scroll2 from '/src/lib/maps/scrolls/scroll2.png'

    const svg1 = {w: 250, h: 350, fill: "blue"}
    const svg2 = {w: 250, h: 700, fill: "blue"}

    // Google fonts of interest
    const fonts = ["Aladin", "Almendra", "Astloch", "Bad Script", "Courgette",
        "Eagle Lake", "Germania One", "Jaquard24", "MedievalSharp", "Modern Antiqua",
        "New Rocker", "Tangerine", "Uncial Antiqua", "UnifrakturCook"]
</script>

<p>Scroll as HTML image (200w 200h)</p>
<img alt="Scroll" src={scroll} width="200" height="200"/>

<p>Scroll as SVG embedded image url (250w 350h)</p>
<svg width={svg1.w} height={svg1.h}
        font-size="16px" font-weight="normal" fill="black" stroke="black" stroke-width="1"
        xmlns="http://www.w3.org/2000/svg">
    <defs>
        <style>
            @import url("https://fonts.googleapis.com/css?family=Aladin:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Almendra:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Astloch:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Bad Script:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Courgette:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Eagle Lake:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Germania One:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=MedievalSharp:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Modern Antiqua:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=New Rocker:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Tangerine:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Uncial Antiqua:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=Jacquard24:400,400i,700,700i");
            @import url("https://fonts.googleapis.com/css?family=UnifrakturCook:400,400i,700,700i");
        </style>
    </defs>
    <!-- <style><![CDATA[svg text{stroke:none}]]></style> -->
    
    <rect x="0" y="0" width={svg1.w} height={svg1.h} fill={svg1.fill} />

    <image href='/src/lib/maps/SimpleMaps/scroll1.png' width={svg1.w} height={svg1.h}/>
        {#each fonts as font, i}
            <text x={svg1.w/2} y={60+i*20} text-anchor="middle" font-family={font} fill="black">
                {font} Newbold Verdon</text>
        {/each}
</svg>

<p>Scroll as SVG embedded image imported Svelte component (250w 700h)</p>
<svg width={600} height={600} fill={svg1.fill}>
    <rect x="0" y="0" width={svg2.w} height={svg2.h} fill={svg2.fill} />
    <image href={scroll} x="0" y="260" width={svg2.w}/>
    <image href={scroll} x="0" y="0" width={svg2.w}/>
    {#each fonts as font, i}
    <text x={svg1.w/2} y={40+i*20} text-anchor="middle" font-family={font} fill="black">
        {i+1} {font} Newbold Verdon</text>
    {/each}
    {#each fonts as font, i}
    <text x={svg1.w/2} y={320+i*20} text-anchor="middle" font-family={font} fill="black">
        {i+1} {font} Newbold Verdon</text>
    {/each}
</svg>

<p>Scroll2</p>
<svg width={300} height={360} fill={svg1.fill}>
    <rect x="0" y="0" width={300} height={360} fill={svg2.fill} />
    <image href={scroll2} x="0" y="0" width={svg2.w}/>
</svg>