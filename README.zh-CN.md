# Better-Vibecoding

[English](README.md)

这里收集日常开发中整理的技能和插件。

## 架构与交付规则

用支持 [AGENTS.md](AGENTS.md) 的 agent 打开本仓库，照常描述任务即可。普通克隆就包含 [pstack 入口](vendor/pstack/plugins/pstack/skills/poteto-mode/SKILL.md)、校验工具和以下项目流程：

- [功能开发](.agents/playbooks/feature-delivery.md)先追踪真实调用，用 `architect` 确定共享边界，交付前检查是否仍有多处各自决定同一业务规则，以及哪些旧路径可以清理。
- [缺陷修复](.agents/playbooks/bug-fix-delivery.md)先复现并定位规则归属。如果两次修复依赖同一假设，且都没通过同一项检查，第三次改代码前先直接验证该假设。需要调整结构时，保住调用方依赖的行为，迁移后清理旧实现。

在其他仓库复用时，将规则合并到目标项目的指令文件，把 `.agents/playbooks/` 和 `vendor/pstack/` 按相同相对位置复制过去，保留可执行权限。如果所用 agent 读取其他指令文件，可从它的入口引用 `AGENTS.md`。

接入或升级后，在仓库根目录运行：

```sh
node vendor/pstack/plugins/pstack/skills/poteto-mode/scripts/check-playbooks.mjs .
```

校验器检查项目流程与上游步骤是否匹配。实际成品仍通过项目自身的正常入口验证。固定的上游提交和许可证见[来源记录](vendor/pstack/UPSTREAM.md)。

### 可选：注册 Codex 原生插件

如需在尚未安装插件的机器上使用原生技能菜单，可以注册本仓库的[插件目录](.agents/plugins/marketplace.json)：

```sh
codex plugin marketplace add WAWA41/Better-Vibecoding
codex plugin add pstack@better-vibecoding
```

启动钩子遵循宿主的信任设置。仓库指令可独立生效，工具、模型与权限由 agent 运行环境提供。

## 技能

| 技能 | 用途 |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | 让 Codex 桌面端判断一条需求该留在当前聊天还是另开聊天。切换时，新的聊天会收到项目状态、用户纠正和验收条件。 |

### 安装和使用 auto-chat

将仓库中的 `skills/auto-chat` 整个目录复制到 Codex 的个人技能目录。默认安装后的路径为 `~/.codex/skills/auto-chat/SKILL.md`。如果设置了 `CODEX_HOME`，使用该目录下的 `skills/auto-chat/`。

在项目聊天里说“后续需求由你判断，合适时直接新建聊天并交接”即可启用。也可以输入 `$auto-chat` 并附上同样的要求。希望在所有项目中默认启用时，把这句话写入自己的 Codex 全局规则，并注明适用于每个新聊天。

同一问题的追问和修正留在原聊天。遇到可独立验收的新需求时，Codex 会在能够访问原工作目录的条件下创建新聊天并交接。临时想留在原处时，说“这次留在这里”即可。
