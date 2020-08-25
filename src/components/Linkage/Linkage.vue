<template>
  <a-cascader
    :options="options"
    @change="onChange"
    :loadData="loadData"
    :placeholder="placeholder"
    :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
    :value="values"
    :key="type"
    changeOnSelect
    :disabled="disabled"
  />
</template>
<script>
import { axios } from '@/utils/request'
export default {
  props: {
    placeholder: { type: String, default: '请选择' },
    defaultvalue: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [],
      fieldNames: ['city', 'county', 'township', 'village'],
      values: [],
      type: true
    }
  },
  watch: {
    defaultvalue: function(value) {
      this.values = value.filter(ins => {
        return ins !== ''
      })
      this.values.length > 0 && this.setDefault()
    }
  },
  mounted() {
    this.loadfisrtData()
    this.values = [...this.defaultvalue]
  },
  methods: {
    loadfisrtData() {
      axios.get('/dict/nhDictXzq/getList', { params: { pcode: 460000000000 } }).then(res => {
        let arr = res.result
        arr.forEach(element => {
          element.isLeaf = false
        })
        this.options = arr
      })
    },
    onChange(arr) {
      this.values = [...arr]
      let obj = {}
      if (arr.length == 0) {
        obj = null
        this.loadfisrtData()
        this.$emit('onChanged', obj)
        return
      }
      const length = arr.length
      // 取出所得数组 最后一位；
      const value = arr[length - 1]
      const key = this.fieldNames[length - 1]
      obj[key] = value
      // 返回最后一位对应结果
      this.$emit('onChanged', obj)
      // 返回对应关系结果
      let newObj = {}
      let nameArray = {}
      let keyarr = [...this.fieldNames]
      if (arr[0] == 460300000000 || arr[0] == 460100000000 || arr[0] == 460200000000) {
        this.getCodeName(nameArray, this.options, 0, keyarr, arr)
        // {'cityname':'', 'countyname':'', 'townshipname':'', 'villagename':''}
        keyarr.forEach((ins, index) => {
          newObj[ins] = arr[index]
        })
        arr.length == 4 ? this.$emit('resultCodeArray', { nameArray, newObj }) : this.$emit('resultCodeArray', null)
      } else if (arr[0] == 460400499000) {
        keyarr.splice(1, 2)
        this.getCodeName(nameArray, this.options, 0, keyarr, arr)
        // this.getCodeName(nameArray, this.options, 0, keyarr)
        keyarr.forEach((ins, index) => {
          newObj[ins] = arr[index]
        })
        arr.length == 2 ? this.$emit('resultCodeArray', { nameArray, newObj }) : this.$emit('resultCodeArray', null)
      } else {
        // let keys = ['city', 'township', 'village']
        //{'cityname':'','townshipname':'', 'villagename':''}
        keyarr.splice(1, 1)
        this.getCodeName(nameArray, this.options, 0, keyarr, arr)
        keyarr.forEach((ins, index) => {
          newObj[ins] = arr[index]
        })
        arr.length == 3 ? this.$emit('resultCodeArray', { nameArray, newObj }) : this.$emit('resultCodeArray', null)
      }
    },
    loadData(selectedOptions) {
      const targetOption = selectedOptions[selectedOptions.length - 1]
      if (targetOption.hasChild == 0) {
        return
      }
      this.finaly = false
      targetOption.loading = true
      axios.get('/dict/nhDictXzq/getList', { params: { pcode: targetOption.code } }).then(res => {
        targetOption.loading = false
        let arr = res.result
        arr.forEach(element => {
          element.isLeaf = false
        })
        targetOption.children = arr
        this.options = [...this.options]
      })
    },
    getCodeName(nameArray, parent, index, values, arr) {
      // console.log('parent',parent)
      let node = parent.find(node => {
        return node.code == arr[index]
      })
      if (node) {
        nameArray[values[index] + 'name'] = node['name']
        if ('children' in node) {
          index++
          this.getCodeName(nameArray, node.children, index, values, arr)
        }
      }
    },
    setDefault() {
      //   console.log('访问的values', this.values)
      //   let promiseArr = []
      //   this.values.forEach(ins => {
      //     promiseArr.push(
      //       new Promise((resolve, reject) => {
      //         axios.get('/dict/nhDictXzq/getList', { params: { pcode: ins } }).then(res => {
      //           resolve(res.result)
      //         })
      //       })
      //     )
      //   })
      //   Promise.all(promiseArr).then(result => {
      //     console.log('result',JSON.stringify(result))
      //     // 先把result的数据结果集组装
      //     let res = []
      //     this.values.forEach((ins, index) => {
      //       if (index + 1 < this.values.length) {
      //         result.forEach((c, index) => {
      //           let a = c.filter(i => {
      //             return i.code == this.values[index + 1]
      //           })
      //           if (a && a.length > 0) {
      //             a.isLeaf = false
      //             a.loading = false
      //             res.push(a)
      //             // 合并数组
      //             res = Array.prototype.concat.apply([], res)
      //             res = Array.from(new Set(res))
      //           }
      //         })
      //       }
      //     })
      //     for (var i = res.length; i > 0; i--) {
      //       if (res[i]) {
      //         res[i - 1].children = [res[i]]
      //       }
      //     }
      //     res = res[0]
      //     res.isLeaf = false
      //     res.loading = false
      //     let d = this.options.find(ins => {
      //       return ins.code == this.values[0]
      //     })
      //     d && (d.children = [res])
      //     // 更新dom
      //     this.type = !this.type
      //   })
      const p = this.options.find(ins => {
        return ins.code == this.values[0]
      })
      p &&
        this.setChildren(p, 1, this.values, () => {
          // 更新dom
          this.type = !this.type
        })
    },
    setChildren(parent, index, values, cb) {
      axios.get('/dict/nhDictXzq/getList', { params: { pcode: parent.code } }).then(res => {
        if (res.result.length == 0) {
          cb()
          return
        }
        parent.children = res.result
        res.result.forEach(ins => {
          ins.isLeaf = false
          ins.loading = false
          if (ins.code === values[index]) {
            index++
            this.setChildren(ins, index, values, cb)
          }
        })
      })
    }
  }
}
</script>
