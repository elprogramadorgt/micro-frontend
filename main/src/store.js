import { atom, useAtom } from "jotai"


const filterData = atom({})

const useFilterData = () => useAtom(filterData)

export { useFilterData }