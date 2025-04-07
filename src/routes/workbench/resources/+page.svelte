<script>
    const urls = [
        ["Association des Tremllay d'Ameririque", "https://tremblay.genealogie.org"],
    ]
</script>

{#each urls as [label, href]}
    <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-xlg text-sm px-5 py-2.5 focus:outline-none"
        href={href}>{label}</a>
{/each}
