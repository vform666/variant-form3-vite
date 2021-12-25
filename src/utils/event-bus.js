import mitt from 'mitt'

const instance = mitt()
const eventBus = {}
eventBus.$on = instance.on
eventBus.$off = instance.off
eventBus.$emit = instance.emit

export default eventBus
