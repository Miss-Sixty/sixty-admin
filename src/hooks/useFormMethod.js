import { unref } from 'vue'

export default function(ref, methods) {
  const obj = {}
  for (let key in methods) {
    console.log(key, methods)
    const value = methods[key]
    obj[value] = () => unref(ref) && unref(ref)[value]()
  }
  return obj
}
