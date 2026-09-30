export interface ZipEntry { name: string; data: Buffer }
export interface VerifyReport {
  zip: string; files: number; mp3s: number; sources: number; bytes: number; sha256: string; contentSha256: string; errors: string[];
}
export function readZip(buf: Buffer): ZipEntry[];
export function sourceMp3s(): string[];
export function verify(zipPath: string, sources?: string[]): VerifyReport;
