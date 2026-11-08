/** Third-party profile bundles shipped with the unsigned Linux desktop package. */

/** One npm package pinned into the Desktop runtime and enabled in a fresh profile. */
export interface DesktopBundledPlugin {
  readonly name: string
  readonly version: string
}

/** Exact plugin versions validated against the Web profile before inclusion. */
export const DESKTOP_BUNDLED_PLUGINS = [
  { name: '@ljwei-stak/dsh-boot-animation', version: '0.4.0' },
  { name: 'dsh-plugin-wallpaper-engine', version: '1.4.2' },
  { name: 'dsh-video-skin', version: '0.1.6' },
  { name: 'dsh-whale-widget', version: '0.4.2' },
  { name: 'dshmarket', version: '1.73.12' },
] as const satisfies readonly DesktopBundledPlugin[]

/** Package names recognized by Desktop's bundled-plugin migration. */
export const DESKTOP_BUNDLED_PLUGIN_NAMES: readonly string[] = DESKTOP_BUNDLED_PLUGINS.map(plugin => plugin.name)

/** Select plugins for a build; release packages use the host profile unless embedding is explicit. */
export function desktopBundledPlugins(environment: NodeJS.ProcessEnv = process.env): readonly DesktopBundledPlugin[] {
  return environment.DSH_DESKTOP_EMBED_PLUGINS === '1' ? DESKTOP_BUNDLED_PLUGINS : []
}

/** Exact runtime dependencies that make selected bundled profile entries resolvable. */
export function desktopBundledPluginDependencies(environment: NodeJS.ProcessEnv = process.env): Record<string, string> {
  return Object.fromEntries(desktopBundledPlugins(environment).map(plugin => [plugin.name, plugin.version]))
}
