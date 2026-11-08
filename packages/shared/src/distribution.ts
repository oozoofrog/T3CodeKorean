/** Identity of the unofficial oozoofrog distribution; wire contracts keep their upstream names. */
export const distribution = {
  name: "T3CodeKorean",
  id: "com.oozoofrog.t3codekorean",
  slug: "t3codekorean",
  homeDirectory: ".t3codekorean",
  desktopScheme: "t3code-korean",
  desktopDevScheme: "t3code-korean-dev",
  serverPort: 3783,
  repository: "oozoofrog/T3CodeKorean",
  cliCommand: "t3korean",
} as const;

export const automaticCliUpdatesEnabled: boolean = false;

export const forkUpdateMessage =
  "T3CodeKorean automatic updates are disabled. Build and install a new version from the oozoofrog/T3CodeKorean fork.";

export function desktopScheme(isDevelopment: boolean): string {
  return isDevelopment ? distribution.desktopDevScheme : distribution.desktopScheme;
}
