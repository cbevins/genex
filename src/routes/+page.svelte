<script>
    import scroll from '/src/lib/maps/SimpleMaps/scroll1.png'
    import gb from '$lib/maps/SimpleMaps/gb.svg'
    const svg1 = {w: 800, h: 1000, fill: "#6f9c76"}
    const svg2 = {x: 0, y: 0, w: 400, h: 500, fill: "blue"}
    const svg3 = {x: 400, y: 500, w: 400, h: 500, fill: "green"}

    // Google fonts of interest
    const fonts = ["Aladin", "Almendra", "Astloch", "Bad Script", "Courgette",
        "Eagle Lake", "Germania One", "Jaguard 24", "Modern Antiqua",
        "New Rocker", "Tangerine", "Uncial Antiqua", "UnifrakturCook"
    ]
    const Aladin = "Aladin"
    const Almendra = "Almendra"
    const Astloch = "Astloch"
    const BadScript = "Bad Script"
    const Courgette = "Courgette"
    const EagleLake = "Eagle Lake"
    const GermaniaOne = "Germania One"
    const Jacquard24 = "Jacquard 24"
    const MedievalSharp = "MedievalSharp"
    const ModernAntiqua = "Modern Antiqua"
    const NewRocker = "New Rocker"
    const Tangerine = "Tangerine"
    const UncialAntiqua = "Uncial Antiqua"
    const Unifraktur = "UnifrakturCook"
</script>

<p>Visit
    <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xlg text-sm px-5 py-2.5 focus:outline-none"
        href="https://svelte.dev/docs/kit">svelte.dev/docs/kit
    </a>
to read the documentation</p>

<img alt="Scroll" src={scroll} width="200" height="200"/>

<svg width={svg1.w} height={svg1.h}
        font-family="Times New Roman" font-size="16px" font-weight="normal"
        stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"
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
                @import url("https://fonts.googleapis.com/css?family=Modern Antiqua:400,400i,700,700i");
                @import url("https://fonts.googleapis.com/css?family=New Rocker:400,400i,700,700i");
                @import url("https://fonts.googleapis.com/css?family=Tangerine:400,400i,700,700i");
                @import url("https://fonts.googleapis.com/css?family=Uncial Antiqua:400,400i,700,700i");
                @import url("https://fonts.googleapis.com/css?family=Jacquard 24:400,400i,700,700i");
                @import url("https://fonts.googleapis.com/css?family=UnifrakturCook:400,400i,700,700i");
                
            </style>
        </defs>
        <style><![CDATA[svg text{stroke:none}]]></style>
    
    <rect x="0" y="0" width={svg1.w} height={svg1.h} fill={svg1.fill} />

    <svg x={svg2.x} y={svg2.y} width={svg2.w} height={svg2.h} fill={svg2.fill}>
        <rect x={svg2.x} y={svg2.y} width={svg2.w} height={svg2.h} fill={svg2.fill}/>
        <image href='/src/lib/maps/SimpleMaps/scroll1.png' width={svg2.w} height={svg2.h}/>
        {#each fonts as font, i}
            <text x={svg2.w/2} y={100+i*20} text-anchor="middle" font-family={font} font-size="24" fill="black">
                {font} Newbold Verdon</text>
        {/each}
    </svg>

    <svg x={svg3.x} y={svg3.y} width={svg3.w} height={svg3.h} fill={svg3.fill}>
        <image href={scroll}  x="-100" y="-100" width={svg3.w} height={svg3.h}/>
    </svg>
</svg>
