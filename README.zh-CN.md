# Better-Vibecoding

[English](README.md)

这里收集日常开发中整理的技能和插件。

## 通用交付规则

[Agent 交付规则](AGENTS.md) 在本仓库内使用，也可以复用到其他项目。规则涵盖如何约定验收结果、验证实际交付物、排查同类缺陷，以及在批量交付前验证代表性成品。

要在其他仓库启用，将 `AGENTS.md` 复制到仓库根目录。已有指令文件时，合并适用章节，保留原有的项目命令与约束。如果所用 agent 读取其他指令文件，可从它的入口引用这份规则，或将相应章节合并进去。规则可以独立使用，无需安装 pstack 或额外的 skill。

## 在仓库中使用 pstack

本仓库包含两份 pstack 原生项目流程。[功能开发流程](.agents/playbooks/feature-delivery.md)在规划时确定验收结果，交付前检查实际成品。[缺陷修复流程](.agents/playbooks/bug-fix-delivery.md)检查共用同一根因的入口和产物，并在交付版本上重跑最初的复现步骤。

1. 每个 Codex 环境只需安装一次 pstack。尚未安装时，按[上游安装说明](https://github.com/h00mankind/pstack#install)在终端执行：

   ```sh
   codex plugin marketplace add h00mankind/pstack
   codex plugin add pstack@pstack
   ```

2. 要接入其他仓库，将根目录 `AGENTS.md` 的规则合并到目标仓库，把这两份流程文件复制到目标仓库的 `.agents/playbooks/`，再一起提交。当前仓库已经包含这两部分。
3. 在 Codex 中打开目标仓库，用 `$pstack:poteto-mode` 提交功能需求或缺陷报告。可以在任务计划中查看针对交付成品的验收步骤，或针对同类缺陷的排查步骤。

pstack 升级后，在仓库根目录运行 `node "<pstack-plugin-dir>/skills/poteto-mode/scripts/check-playbooks.mjs" .`，将占位符替换为本机插件目录。该命令检查项目流程与上游步骤是否仍然匹配。实际成品由项目自身的验收操作验证。

## 技能

| 技能 | 用途 |
| --- | --- |
| [auto-chat](skills/auto-chat/SKILL.md) | 让 Codex 桌面端判断一条需求该留在当前聊天还是另开聊天。切换时，新的聊天会收到项目状态、用户纠正和验收条件。 |

### 安装和使用 auto-chat

将仓库中的 `skills/auto-chat` 整个目录复制到 Codex 的个人技能目录。默认安装后的路径为 `~/.codex/skills/auto-chat/SKILL.md`。如果设置了 `CODEX_HOME`，使用该目录下的 `skills/auto-chat/`。

在项目聊天里说“后续需求由你判断，合适时直接新建聊天并交接”即可启用。也可以输入 `$auto-chat` 并附上同样的要求。希望在所有项目中默认启用时，把这句话写入自己的 Codex 全局规则，并注明适用于每个新聊天。

同一问题的追问和修正留在原聊天。遇到可独立验收的新需求时，Codex 会在能够访问原工作目录的条件下创建新聊天并交接。临时想留在原处时，说“这次留在这里”即可。
