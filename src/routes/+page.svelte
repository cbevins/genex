<script>
    const topics = [ ['Site Map', [
        "/workbench/bevinsMigrationMap1",
        "/workbench/bevinsOriginsMap1",
        "/workbench/europeanOriginsMap1",
        "/workbench/maps/bevins/origins",
        "/workbench/maps/dereuss/origins",
        "/workbench/maps/google/america1",
        "/workbench/maps/google/england1",
        "/workbench/maps/google/europe1",
        "/workbench/maps/mapbox",
        "/workbench/resources",
        "/workbench/topo/europe",
    ]]]
</script>

{#each topics as [topic, items]}
    <h2 class="mt-2 mb-1 px-5 text-2xl font-semibold text-blacks dark:text-black">{topic}</h2>
    <ul class="max-w-md space-y-1 text-black-900 list-disc list-inside dark:text-black-900">
        {#each items as href}
            <li class="px-10">
                <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href={href}>{href}
                </a>
            </li>
        {/each}
    </ul>
{/each}
