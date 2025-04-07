<script>
    const items = [
        "/workbench/bevinsMigrationMap1",
        "/workbench/bevinsOriginsMap1",
        "/workbench/europeanOriginsMap1",
        "/workbench/maps/bevins/origins",
        "/workbench/maps/dereuss/origins",
        "/workbench/maps/google/america1",
        "/workbench/maps/google/england1",
        "/workbench/maps/google/europe1",
        "/workbench/resources",
        "/workbench/topo/europe",
    ]
</script>

<p class="w-full text-2xl text-left text-gray-500 rounded-lg">
    Site Map
</p>

<table class="w-full text-sm text-left text-gray-500 rounded-lg">
    <tbody>
        {#each items as href}
        <tr class="odd:bg-white even:bg-gray-50 bg-white border-b ">
            <td class="px-10 py-1 text-left">
                <a href={href}>{href}</a></td>
        </tr>
        {/each}
    </tbody>
</table>