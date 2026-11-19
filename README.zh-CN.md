# Better-Vibecoding

[English](README.md)

这里收集日常开发中整理的技能和插件。

## 架构与交付规则

用支持 [AGENTS.md](AGENTS.md) 的 agent 打开本仓库，照常描述任务即可。项目规则采用渐进式披露。改一句按钮文案，可以改完直接看实际按钮。改动牵涉其他调用方或交付环节时，agent 才进入对应的项目流程，并使用仓库自行维护的 Better Vibecoding 插件。

- [功能开发流程](plugins/better-vibecoding/.agents/playbooks/feature-delivery.md)按风险指向具体说明。比如迁移已保存的设置时，读[共享接口与数据兼容](plugins/better-vibecoding/.agents/references/shared-contracts.md)；批量导出文件时，读[批量交付验收](plugins/better-vibecoding/.agents/references/batch-delivery.md)。两种风险同时存在时，两份都适用。
- [缺陷修复流程](plugins/better-vibecoding/.agents/playbooks/bug-fix-delivery.md)从复现开始。如果两次修复基于同一假设，又都没通过同一项检查，第三次修改前先直接检验假设。定位到的根因确实需要调整结构时，再读重构说明。

在其他仓库复用时，将规则合并到目标项目的 `AGENTS.md`，把 `plugins/better-vibecoding/` 按相同相对位置复制过去，保留可执行权限。

接入或升级后，在仓库根目录运行：

```sh
node plugins/better-vibecoding/skills/poteto-mode/scripts/check-playbooks.mjs .
```

校验器检查项目流程引用的步骤是否存在于当前插件中。要定制流程，可直接修改[插件源码](plugins/better-vibecoding/README.md)。原作者及许可证见[来源记录](plugins/better-vibecoding/ORIGINS.md)。

### 可选：注册 Codex 原生插件

如需在尚未安装插件的机器上使用原生技能菜单，可以注册本仓库的[插件目录](.agents/plugins/marketplace.json)：

```sh
codex plugin marketplace add WAWA41/Better-Vibecoding
codex plugin add better-vibecoding@better-vibecoding
```

已注册过这个插件目录的用户，可先运行 `codex plugin marketplace upgrade better-vibecoding` 刷新目录，再安装新标识的插件。要沿用模型设置，可在同一配置目录把 `pstack-models.md` 复制为 `better-vibecoding-models.md`，并更新指向旧配置文件的显式引用。将已有指令里的技能引用改成 `better-vibecoding:<技能名>`。两个插件同时启用时，可关闭旧插件的启动路由，避免重复注入。

启用原生插件后，插件还可以在会话启动时注入自己的路由提示，具体取决于宿主的信任设置。仓库指令可独立生效，工具、模型与权限由 agent 运行环境提供。

### 设计参考

- Cloudflare 按任务选择产品文档。例如，需要保存上传文件时，入口会指向 R2 指南。[Cloudflare Skills](https://github.com/cloudflare/skills/blob/main/skills/cloudflare/SKILL.md)
- Superpowers 按排错时观察到的现象补充方法。例如，错误出现在调用栈深处时，才引出反向追踪根因的说明。[Systematic Debugging](https://github.com/obra/superpowers/blob/main/skills/systematic-debugging/SKILL.md)

## 技能

| 技能 | 用途 |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | 让 Codex 桌面端判断一条需求该留在当前聊天还是另开聊天。切换时，新的聊天会收到项目状态、用户纠正和验收条件。 |

### 安装和使用 auto-chat

将仓库中的 `skills/auto-chat` 整个目录复制到 Codex 的个人技能目录。默认安装后的路径为 `~/.codex/skills/auto-chat/SKILL.md`。如果设置了 `CODEX_HOME`，使用该目录下的 `skills/auto-chat/`。

在项目聊天里说“后续需求由你判断，合适时直接新建聊天并交接”即可启用。也可以输入 `$auto-chat` 并附上同样的要求。希望在所有项目中默认启用时，把这句话写入自己的 Codex 全局规则，并注明适用于每个新聊天。

同一问题的追问和修正留在原聊天。遇到可独立验收的新需求时，Codex 会在能够访问原工作目录的条件下创建新聊天并交接。临时想留在原处时，说“这次留在这里”即可。
