<template>
    <el-form
            v-bind="$attrs"
            :model="Model"
            :ref="name"
            :api="api"
            :show-message="$attrs['show-message'] !== false"
            :status-icon="$attrs['status-icon'] !== false"
            :inline="$attrs.inline !== false">
        <template v-for="(item,index) in FormItems">

            <slot v-if="item.slot" :name="item.slot"/>

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
                        v-on="item.listeners || {}"
                />
            </el-form-item>
        </template>

        <el-form-item v-if="submit || reset">
            <el-button @click="handleSubmit(name)" v-if="submit">{{$attrs.searchContext || "搜索"}}</el-button>
            <el-button @click="handleReset(name)" v-if="reset">{{$attrs.resetContext || "重置"}}</el-button>
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
            //传入mergeModel允许父组件修改内部Model对象
            mergeModel: {
                type: Object,
                default: () => {
                }
            }
        },
        data() {
            return {
                Model: {},
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
                    delete Model[item.key]
                }
                // form-item 配置
                return item;
            },
            handleMerge() {
                Object.assign(this.Model, this.mergeModel)
            },
            handleSubmit(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        try {
                            let res = await this.api(this.Model)
                            this.$emit('afterSubmit', res)
                        } catch (e) {
                            console.log(e)
                        }
                    }
                });
            },
            handleReset(formName) {
                this.$refs[formName].resetFields();
            }
        },
        computed: {
            //根据formItem计算出实际需要让页面渲染的真正的FormItem数据
            FormItems() {
                //this.Model中的值改变触发computed
                let FormItems = []
                FormItems = this.formItems.map(item => this.computeFormItem(item, this.Model))
                return FormItems
            },
        },
        watch: {
            //使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
            formItems: {
                handler() {
                    this.formItems.forEach(formItem => {
                        if (!formItem.key) return //跳过没有key的属性(插槽)
                        this.$set(this.Model, formItem.key, (formItem.value ? formItem.value : ""))
                    })
                },
                deep: true,
                immediate: true
            },
            mergeModel: {
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
