import { Axios } from "@/utils/plugin/axios-plugin"
// 可请求
let permissions = []
let inited = false
let OperatorCache = {
    info: {},
    inited() {
        return inited
    },
    init(callBack) {
        if (inited)
            callBack()
        else {
            this.info = {
                UserName: '前端圈圈'
            }
            inited = true
            callBack()
        }
    },
    hasPermission(thePermission) {
        return permissions.includes(thePermission)
    },
    clear() {
        inited = false
        permissions = []
        this.info = {}
    }
}

export default OperatorCache