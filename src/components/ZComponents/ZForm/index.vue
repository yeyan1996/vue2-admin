<template>
    <el-form
            v-bind="$attrs"
            :model="Model"
            :ref="_ref"
            :inline="$attrs.inline !== false">
        <template v-for="(item,index) in FormItems">

            <slot
                    v-if="item.slot"
                    :name="item.slot"/>

            <el-form-item
                    :key="index"
                    :label="item.label"
                    :rules="item.rules"
                    v-else-if="item._ifRender"
                    :prop="item.key">
                <component
                        :is="item.tag"
                        v-model="Model[item.key]"
                        v-bind="item.attrs || {}"
                />
            </el-form-item>
        </template>

        <el-form-item v-if="submit || reset">
            <el-button @click="handleSubmit(_ref)" v-if="submit">搜索</el-button>
            <el-button @click="handleReset(_ref)" v-if="reset">重置</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import {basic} from "./BASIC";

    export default {
        props: {
            formItems: {
                type: Array,
                required: true,
            },
            _ref: {
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
            action: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                Model: {},
            }
        },
        methods: {
            isFunction(expectFunction) {
                return typeof expectFunction === 'function'
            },
            computeFormItem(formItem, Model) {
                const item = {...formItem};
                // 表单控件的类型
                let tag = item.tag || 'input'
                // 对应到组件映射表
                let basicItem = basic[tag]
                item.tag = basicItem.component;
                item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
                // item.listeners = Object.assign({}, basicItem.listeners, item.listeners)
                // 获取动态 Attributes
                if (item.getAttrs) item.attrs = Object.assign(item.attrs, item.getAttrs(Model))
                // 条件渲染
                item._ifRender = item.ifRender ? item.ifRender(Model) : true
                // 防止表单提交时存在多余 key
                if (!item._ifRender) {
                    delete Model[item.key]
                }
                // form-item 配置
                return item;
            },
            computeModel() {
                this.formItems.forEach(formItem => {
                    this.$set(this.Model, formItem.key, (formItem.value ? formItem.value : ""))
                })
            },
            handleSubmit(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        try {
                            console.log(this.Model)
                            //动态引入api接口,可以将后续操作抛给父组件完成

                            // let module = await import(`@/api/${this.action[0]}`)
                            // let apiFunc = module[this.action[1]]
                            // if (this.isFunction(apiFunc)) {
                            //     let res = await apiFunc(this.Model)
                                this.$emit('afterSubmit', this.Model)
                            // } else {
                            //     throw new TypeError('action格式不对')
                            // }
                        } catch (e) {
                            console.log(e)
                        }
                    }
                });
            },
            handleReset(formName) {
                this.$refs[formName].resetFields();
            },
        },
        computed: {
            FormItems() {
                console.log('computed')
                let FormItems = []
                FormItems = this.formItems.map(item => this.computeFormItem(item, this.Model))
                this.computeModel()
                return FormItems
            },
        },
        watch:{
            formItems() {
                this.formItems.forEach(formItem => {
                    this.$set(this.Model, formItem.key, (formItem.value ? formItem.value : ""))
                })
            }
        },
        mounted() {
            console.log(this.$attrs)
        },
    }
</script>