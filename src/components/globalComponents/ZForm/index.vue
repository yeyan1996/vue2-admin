<template>
    <el-form
            v-bind="$attrs"
            :model="Model"
            :ref="name"
            :api="api"
            :show-message="showMessage"
            :status-icon="statusIcon"
            :inline="inline">
        <template v-for="(item,index) in _formItems">

            <slot v-if="item.slot" :name="item.slot"/>

            <el-form-item
                    :key="index"
                    v-else-if="item._ifRender"
                    v-bind="item.itemAttrs || {}"
                    :prop="item.key">
                <component
                        :is="item.tag"
                        v-model="Model[item.attrs.key]"
                        v-bind="item.attrs || {}"
                        v-on="item.listeners || {}"
                />
            </el-form-item>
        </template>

        <el-form-item v-if="submit || reset">
            <el-button @click="handleSubmit(name)" v-if="submit">{{$attrs.searchContext || "搜索"}}</el-button>
            <el-button @click="handleReset" v-if="reset">{{$attrs.resetContext || "重置"}}</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import {basic} from "./BASIC";

    export default {
        name:'z-form',
        props: {
            formItems: {
                type: Array,
                required: true,
            },
            //作为表单验证和重置需要ref属性
            name: {
                type: String,
                required: true
            },
            submit: {
                type: Boolean,
                default: true
            },
            reset: {
                type: Boolean,
                default: true
            },
            //接口函数
            api: {
                type: Function,
                required: true
            },
            //传入mergeForm允许父组件修改内部Model对象
            mergeForm: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {
                Model: {},
                originModel:{}
            }
        },
        methods: {
            computeFormItem(formItem, Model) {
                const item = {...formItem};
                // 表单控件的类型
                let tag = item.tag || 'input'
                // 对应到组件映射表
                let basicItem = basic[tag]
                item.tag = basicItem.component;
                //继承基类的属性
                item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
                // 获取动态 Attributes
                if (item.getAttrs) item.attrs = Object.assign(item.attrs, item.getAttrs(Model))
                // 条件渲染
                item._ifRender = item.ifRender ? item.ifRender(Model) : true
                // 防止表单提交时存在多余 key
                if (!item._ifRender) {
                    delete Model[item.attrs.key]
                }
                // form-item 配置
                return item;
            },
            handleMerge() {
                Object.assign(this.Model, this.mergeForm)
            },
            //提交按钮
            handleSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        try {
                            let res = await this.api(this.Model)
                            this.$emit('after-submit', res)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                });
            },
            handleReset() {
                this.Model = JSON.parse(JSON.stringify(this.originModel))
            }
        },
        computed: {
            //根据formItem计算出实际需要让页面渲染的真正的_formItem数据
            _formItems() {
                //this.Model中的值改变触发computed
                let _formItems = []
                _formItems = this.formItems.map(item => this.computeFormItem(item, this.Model))
                return _formItems
            },
            showMessage() {
                return this.$attrs['show-message'] !== false
            },
            statusIcon() {
                return this.$attrs['status-icon'] !== false
            },
            inline() {
                return this.$attrs.inline !== false
            }
        },
        watch: {
            //使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
            formItems: {
                handler() {
                    this.formItems.forEach(formItem => {
                        if (!formItem.attrs || !formItem.attrs.key) return //跳过没有key的属性(插槽)
                        this.$set(this.Model, formItem.attrs.key, (formItem.attrs.value ? formItem.attrs.value : ""))
                    })
                    this.originModel = JSON.parse(JSON.stringify(this.Model))
                },
                deep: true,
                immediate: true
            },
            mergeForm: {
                handler() {
                    this.handleMerge()
                },
                deep: true,
                immediate: true
            },
        },
        mounted() {
            //mounted钩子中formItems是空数组,所以不在mounted里面操作
        }
    }
</script>
