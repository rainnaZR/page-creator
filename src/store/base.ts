import {ref} from 'vue'

const indexPath = ref('/page/list')
const menuInfo = ref([])
const currentMenuInfo = ref([])

const setMenuInfo = (value: any) => {
    menuInfo.value = value
}

const setCurrentMenuInfo = (value: any) => {
    currentMenuInfo.value = value
}

export {
    indexPath,
    menuInfo,
    currentMenuInfo,
    setMenuInfo,
    setCurrentMenuInfo,
}
