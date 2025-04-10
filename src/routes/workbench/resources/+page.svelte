<script>
    const topics = [
        ['Genealogy', [
            ["Ancestry.com CDB Tree", "https://www.ancestry.com/family-tree/tree/191428111/family?cfpid=292505355536&fpid=292565140204&usePUBJs=true"],
            ["Ancestry.com BJR Tree", "https://www.ancestry.com/family-tree/tree/191428111/family?cfpid=292512071752&fpid=292565140204&usePUBJs=true"],
            ["Association des Tremllay d'Amerique", "https://tremblay.genealogie.org"],
            ['Randall Firsts in America', "https://www.ancestry.com/imageviewer/collections/12246/images/dvm_GenMono001708-00010-0?treeid=191428111&personid=292538989110&hintid=1015243794155&usePUB=true&pId=14"],
            ["The Harris Family", "https://www.ancestry.com/imageviewer/collections/61157/images/46155_b289627-00539?pId=490801"],
        ]],
        ['Maps', [
            ['Free Relief Maps', "https://maps-for-free.com/"],
            ['Geology.com', "https://geology.com/world/united-kingdom-satellite-image.shtml"],
            ['Google Maps', "https://www.google.com/maps/place"],
            ['MapBox GL JS Docs', "https://docs.mapbox.com/mapbox-gl-js/guides/install/"],
            ['SimpleMaps', "https://simplemaps.com/resources/svg-maps"],
            ["Use Mapbox GL JS in a Svelte App", "https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-svelte/?step=4"],
        ]],
        ['Svelte', [
            ["Genex GitHub", "https://github.com/cbevins/genex/"],
            ["Svelte 5 Docs", "https://svelte.dev/docs/svelte/overview"],
            ["Svelte 5 Migration Guide", "https://svelte.dev/docs/svelte/v5-migration-guide"],
            ['Svelte-Mapbox Playground', "https://svelte.dev/playground/9854061d29594408b972e49edb9ccc41?version=5.25.8"],
        ]],
        ['SVG', [
            ["MDN Web Docs SVG Reference", "https://developer.mozilla.org/en-US/docs/Web/SVG/Reference"],
            ["Adding Text to Images", "https://svg-tutorial.com/svg/text"],
            ["Curve Examples", "https://hunormarton.github.io/svg-curves/"],
            ["<pattern> Examples", "https://css-tricks.com/snippets/svg/svg-patterns/"],
        ]],
        ['Tailwind CSS', [
            ["Tailwind CSS v4.1 Docs", "https://tailwindcss.com/docs/installation/using-vite"],
            ["Flowbite Raw Tailwind CSS", "https://flowbite.com/docs"],
            ['Flowbite Svelte Components', "https://flowbite-svelte.com/docs/components/accordion"],
            ["Markdown Cheat Sheet", "https://www.markdownguide.org/cheat-sheet/"],
            ['Web Color Chart', "https://en.wikipedia.org/wiki/Web_colors"],
        ]],
    ]
</script>

<div class="grid grid-cols-2 gap-4 mt-2 ml-2 mr-2">
{#each topics as [topic, items]}
<div class="max-w-md bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-600 dark:border-gray-900 dark:hover:bg-gray-700">
    <h2 class="px-5 text-2xl font-semibold text-white dark:text-white">{topic}</h2>
    <ul class="max-w-md space-y-1 text-white list-disc list-inside dark:text-white">
        {#each items as [label, href]}
            <li class="px-10">
                <a class="font-medium text-white dark:text-white hover:dark:text-green-500 hover:underline"
                    href={href}>{label}
                </a>
            </li>
        {/each}
    </ul>
    </div>
{/each}
</div>
