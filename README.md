# dsh-catppuccin

DSH 外置主题插件：把先前动态调好的 **Catppuccin Mocha** 落成可安装的 dual-face 包。

- 深色：Catppuccin Mocha，主色 Mauve `#cba6f7`
- 浅色：Catppuccin Latte，主色 Mauve `#8839ef`
- 通过 `theme.overrideTokens` 叠在内置 `light` / `dark` / `system` 上，所以 Appearance 选择和 `settings.yaml` 里的 `ui-theme.preference` 仍然有效；第三方主题 id 不会写入内置 settings schema。

Token 集合来自动态插件 `catp-1` / `pkg-12` 的实机调整（侧栏、设置弹窗、输入框、按钮、Tooltip、滚动条、用户气泡、Markdown 代码块等）。

## 安装

要求已安装 DSH（`0.1.0-rc.6` 量级），Node.js **>= 22.19.0**。

```bash
cd /path/to/dsh-catppuccin
pnpm install
pnpm verify
dsh plugin --profile web add /path/to/dsh-catppuccin
```

重启 `dsh web`。当前若是深色或 `system` 且系统为深色，界面即为 Mocha；切到浅色则为 Latte。

改 client 代码后需要重新 `pnpm build`，再重启 profile。不要指望本仓库的 client 会跟着 DSH checkout 的 `dev:web` 热更新。

## 行为

| 面 | 行为 |
|---|---|
| Host | 空 `apply()`，只作为 Loader 扫描锚点 |
| Client | 注册 `catppuccin-mocha` / `catppuccin-latte`，并用 `dsh-catppuccin` 覆盖层改写当前主题 |
| 持久化 | 不调用 `setTheme(第三方 id)`，避免和 `ui-theme.preference` 打架 |

## 开发

```bash
pnpm install
pnpm verify
```
