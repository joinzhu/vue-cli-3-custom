### 项目介绍
vue-cli3 预设模板

预装的插件及组件：
    eslint（prettier）
    router（history）
    vuex
    axios
    dayjs
    lodash
    core-js
    
可选的配置：
    element-ui
    mixin

### 创建项目命令
vue create --preset joinzhu/vue-cli-3-custom your-project-name

### preset.json
```
包含 preset 数据的主要文件（必需）
字段介绍：
{
    "packageManager": "npm", // 包管理工具
    "useConfigFiles": false, // 是否合并configs到package.json或相应的配置文件中。例如，当 "useConfigFiles": true 的时候，configs 的值将会被合并到 vue.config.js 中。
    "cssPreprocessor": "node-sass", // css预处理
    "plugins": { // 插件
        "@vue/cli-plugin-babel": {}, // 是否需要babel
        "@vue/cli-plugin-eslint": { // 是否需要eslint
            "prompts": true // 用户自行选择
            // "version": "^3.0.0", // 选择版本
            // "config": "prettier", // 格式化工具
            // "lintOn": [
            //    "save" // 保存时格式化
            // ]
        },
        "@vue/cli-plugin-router": { // 是否需要router
            "prompts": true // 用户自行选择
            // "historyMode": true // history 模式
        },
        "@vue/cli-plugin-vuex": {} // 是否需要vue
    },
    "configs": {

    }
}
```
