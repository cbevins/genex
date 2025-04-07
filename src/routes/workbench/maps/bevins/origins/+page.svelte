<script>
    import { gxmlStr } from '$lib/gxml/gxmlStr'
    import { bevinsOriginsSvgGxml } from '$lib/maps/custom/bevins/bevinsOriginsSvgGxml.js'
    const gxml = bevinsOriginsSvgGxml()
</script>

{@html gxmlStr(gxml)}