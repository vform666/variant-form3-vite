let comps = {}

const modules = import.meta.globEager('./**/*.vue')
for (const path in modules) {
  let cname = modules[path].default.name
  comps[cname] = modules[path].default
}

export default comps
