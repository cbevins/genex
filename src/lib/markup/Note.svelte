<script>
    let { children, ...rest } = $props()
</script>

<div class="text-sm mt-4 mb-2 p-2 bg-blue-100 border-2 border-black rounded shadow-lg shadow-slate-500 overflow-hidden">
    {@render children?.()}
</div>
