import { OpaqueToken } from 'angular2/src/core/di';
import { CONST_EXPR } from 'angular2/src/facade/lang';
/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application into a Web Worker).
 */
export const DOCUMENT = CONST_EXPR(new OpaqueToken('DocumentToken'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Rva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtTWh5TU1paDAudG1wL2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZG9tX3Rva2Vucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQjtPQUN6QyxFQUFDLFVBQVUsRUFBQyxNQUFNLDBCQUEwQjtBQUVuRDs7Ozs7R0FLRztBQUNILGFBQWEsUUFBUSxHQUFnQixVQUFVLENBQUMsSUFBSSxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7T3BhcXVlVG9rZW59IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Q09OU1RfRVhQUn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuLyoqXG4gKiBBIERJIFRva2VuIHJlcHJlc2VudGluZyB0aGUgbWFpbiByZW5kZXJpbmcgY29udGV4dC4gSW4gYSBicm93c2VyIHRoaXMgaXMgdGhlIERPTSBEb2N1bWVudC5cbiAqXG4gKiBOb3RlOiBEb2N1bWVudCBtaWdodCBub3QgYmUgYXZhaWxhYmxlIGluIHRoZSBBcHBsaWNhdGlvbiBDb250ZXh0IHdoZW4gQXBwbGljYXRpb24gYW5kIFJlbmRlcmluZ1xuICogQ29udGV4dHMgYXJlIG5vdCB0aGUgc2FtZSAoZS5nLiB3aGVuIHJ1bm5pbmcgdGhlIGFwcGxpY2F0aW9uIGludG8gYSBXZWIgV29ya2VyKS5cbiAqL1xuZXhwb3J0IGNvbnN0IERPQ1VNRU5UOiBPcGFxdWVUb2tlbiA9IENPTlNUX0VYUFIobmV3IE9wYXF1ZVRva2VuKCdEb2N1bWVudFRva2VuJykpO1xuIl19