import { CONST_EXPR, IS_DART } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
import { XHR } from 'angular2/src/compiler/xhr';
import { PLATFORM_INITIALIZER, PLATFORM_DIRECTIVES, PLATFORM_PIPES, ExceptionHandler, RootRenderer, APPLICATION_COMMON_PROVIDERS, PLATFORM_COMMON_PROVIDERS } from "angular2/core";
import { COMMON_DIRECTIVES, COMMON_PIPES, FORM_PROVIDERS } from "angular2/common";
import { Testability } from 'angular2/src/core/testability/testability';
import { DOM } from 'angular2/src/platform/dom/dom_adapter';
import { DomEventsPlugin } from 'angular2/src/platform/dom/events/dom_events';
import { KeyEventsPlugin } from 'angular2/src/platform/dom/events/key_events';
import { HammerGesturesPlugin } from 'angular2/src/platform/dom/events/hammer_gestures';
import { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
import { DomRootRenderer, DomRootRenderer_ } from 'angular2/src/platform/dom/dom_renderer';
import { DomSharedStylesHost } from 'angular2/src/platform/dom/shared_styles_host';
import { SharedStylesHost } from "angular2/src/platform/dom/shared_styles_host";
import { BrowserDetails } from "angular2/src/animate/browser_details";
import { AnimationBuilder } from "angular2/src/animate/animation_builder";
import { BrowserDomAdapter } from './browser/browser_adapter';
import { BrowserGetTestability } from 'angular2/src/platform/browser/testability';
import { CachedXHR } from 'angular2/src/platform/browser/xhr_cache';
import { wtfInit } from 'angular2/src/core/profile/wtf_init';
import { EventManager, EVENT_MANAGER_PLUGINS } from "angular2/src/platform/dom/events/event_manager";
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from 'angular2/src/platform/dom/events/hammer_gestures';
import { ELEMENT_PROBE_PROVIDERS } from 'angular2/platform/common_dom';
export { DOCUMENT } from 'angular2/src/platform/dom/dom_tokens';
export { Title } from 'angular2/src/platform/browser/title';
export { ELEMENT_PROBE_PROVIDERS, ELEMENT_PROBE_PROVIDERS_PROD_MODE, inspectNativeElement, By } from 'angular2/platform/common_dom';
export { BrowserDomAdapter } from './browser/browser_adapter';
export { enableDebugTools, disableDebugTools } from 'angular2/src/platform/browser/tools/tools';
export { HAMMER_GESTURE_CONFIG, HammerGestureConfig } from './dom/events/hammer_gestures';
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link platform}.
 */
export const BROWSER_PROVIDERS = CONST_EXPR([
    PLATFORM_COMMON_PROVIDERS,
    new Provider(PLATFORM_INITIALIZER, { useValue: initDomAdapter, multi: true }),
]);
function exceptionHandler() {
    // !IS_DART is required because we must rethrow exceptions in JS,
    // but must not rethrow exceptions in Dart
    return new ExceptionHandler(DOM, !IS_DART);
}
function document() {
    return DOM.defaultDoc();
}
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef.application}.
 */
export const BROWSER_APP_COMMON_PROVIDERS = CONST_EXPR([
    APPLICATION_COMMON_PROVIDERS,
    FORM_PROVIDERS,
    new Provider(PLATFORM_PIPES, { useValue: COMMON_PIPES, multi: true }),
    new Provider(PLATFORM_DIRECTIVES, { useValue: COMMON_DIRECTIVES, multi: true }),
    new Provider(ExceptionHandler, { useFactory: exceptionHandler, deps: [] }),
    new Provider(DOCUMENT, { useFactory: document, deps: [] }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: DomEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: KeyEventsPlugin, multi: true }),
    new Provider(EVENT_MANAGER_PLUGINS, { useClass: HammerGesturesPlugin, multi: true }),
    new Provider(HAMMER_GESTURE_CONFIG, { useClass: HammerGestureConfig }),
    new Provider(DomRootRenderer, { useClass: DomRootRenderer_ }),
    new Provider(RootRenderer, { useExisting: DomRootRenderer }),
    new Provider(SharedStylesHost, { useExisting: DomSharedStylesHost }),
    DomSharedStylesHost,
    Testability,
    BrowserDetails,
    AnimationBuilder,
    EventManager,
    ELEMENT_PROBE_PROVIDERS
]);
export const CACHED_TEMPLATE_PROVIDER = CONST_EXPR([new Provider(XHR, { useClass: CachedXHR })]);
export function initDomAdapter() {
    BrowserDomAdapter.makeCurrent();
    wtfInit();
    BrowserGetTestability.init();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUVpWUtlMU15LnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlcl9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLE1BQU0sMEJBQTBCO09BQ3JELEVBQVUsUUFBUSxFQUF3QixNQUFNLHNCQUFzQjtPQUN0RSxFQUFDLEdBQUcsRUFBQyxNQUFNLDJCQUEyQjtPQUN0QyxFQUNMLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsY0FBYyxFQUdkLGdCQUFnQixFQUVoQixZQUFZLEVBRVosNEJBQTRCLEVBQzVCLHlCQUF5QixFQUMxQixNQUFNLGVBQWU7T0FDZixFQUFDLGlCQUFpQixFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUMsTUFBTSxpQkFBaUI7T0FDeEUsRUFBQyxXQUFXLEVBQUMsTUFBTSwyQ0FBMkM7T0FDOUQsRUFBQyxHQUFHLEVBQUMsTUFBTSx1Q0FBdUM7T0FDbEQsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxlQUFlLEVBQUMsTUFBTSw2Q0FBNkM7T0FDcEUsRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRDtPQUM5RSxFQUFDLFFBQVEsRUFBQyxNQUFNLHNDQUFzQztPQUN0RCxFQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QztPQUNqRixFQUFDLG1CQUFtQixFQUFDLE1BQU0sOENBQThDO09BQ3pFLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw4Q0FBOEM7T0FDdEUsRUFBQyxjQUFjLEVBQUMsTUFBTSxzQ0FBc0M7T0FDNUQsRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHdDQUF3QztPQUNoRSxFQUFDLGlCQUFpQixFQUFDLE1BQU0sMkJBQTJCO09BQ3BELEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQ0FB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d0JBQXdCLEdBQ2pDLFVBQVUsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUUzRDtJQUNFLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLE9BQU8sRUFBRSxDQUFDO0lBQ1YscUJBQXFCLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q09OU1RfRVhQUiwgSVNfREFSVH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7cHJvdmlkZSwgUHJvdmlkZXIsIEluamVjdG9yLCBPcGFxdWVUb2tlbn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb21waWxlci94aHInO1xuaW1wb3J0IHtcbiAgUExBVEZPUk1fSU5JVElBTElaRVIsXG4gIFBMQVRGT1JNX0RJUkVDVElWRVMsXG4gIFBMQVRGT1JNX1BJUEVTLFxuICBDb21wb25lbnRSZWYsXG4gIHBsYXRmb3JtLFxuICBFeGNlcHRpb25IYW5kbGVyLFxuICBSZWZsZWN0b3IsXG4gIFJvb3RSZW5kZXJlcixcbiAgcmVmbGVjdG9yLFxuICBBUFBMSUNBVElPTl9DT01NT05fUFJPVklERVJTLFxuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTXG59IGZyb20gXCJhbmd1bGFyMi9jb3JlXCI7XG5pbXBvcnQge0NPTU1PTl9ESVJFQ1RJVkVTLCBDT01NT05fUElQRVMsIEZPUk1fUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvY29tbW9uXCI7XG5pbXBvcnQge1Rlc3RhYmlsaXR5fSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS90ZXN0YWJpbGl0eS90ZXN0YWJpbGl0eSc7XG5pbXBvcnQge0RPTX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fYWRhcHRlcic7XG5pbXBvcnQge0RvbUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMvZG9tX2V2ZW50cyc7XG5pbXBvcnQge0tleUV2ZW50c1BsdWdpbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9ldmVudHMva2V5X2V2ZW50cyc7XG5pbXBvcnQge0hhbW1lckdlc3R1cmVzUGx1Z2lufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2RvbS9kb21fdG9rZW5zJztcbmltcG9ydCB7RG9tUm9vdFJlbmRlcmVyLCBEb21Sb290UmVuZGVyZXJffSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV9yZW5kZXJlcic7XG5pbXBvcnQge0RvbVNoYXJlZFN0eWxlc0hvc3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0JztcbmltcG9ydCB7U2hhcmVkU3R5bGVzSG9zdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vc2hhcmVkX3N0eWxlc19ob3N0XCI7XG5pbXBvcnQge0Jyb3dzZXJEZXRhaWxzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2FuaW1hdGUvYnJvd3Nlcl9kZXRhaWxzXCI7XG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gXCJhbmd1bGFyMi9zcmMvYW5pbWF0ZS9hbmltYXRpb25fYnVpbGRlclwiO1xuaW1wb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5pbXBvcnQge0Jyb3dzZXJHZXRUZXN0YWJpbGl0eX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGVzdGFiaWxpdHknO1xuaW1wb3J0IHtDYWNoZWRYSFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL3hocl9jYWNoZSc7XG5pbXBvcnQge3d0ZkluaXR9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3Byb2ZpbGUvd3RmX2luaXQnO1xuaW1wb3J0IHtFdmVudE1hbmFnZXIsIEVWRU5UX01BTkFHRVJfUExVR0lOU30gZnJvbSBcImFuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9kb20vZXZlbnRzL2V2ZW50X21hbmFnZXJcIjtcbmltcG9ydCB7XG4gIEhBTU1FUl9HRVNUVVJFX0NPTkZJRyxcbiAgSGFtbWVyR2VzdHVyZUNvbmZpZ1xufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2V2ZW50cy9oYW1tZXJfZ2VzdHVyZXMnO1xuaW1wb3J0IHtFTEVNRU5UX1BST0JFX1BST1ZJREVSU30gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uX2RvbSc7XG5leHBvcnQge0RPQ1VNRU5UfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vZG9tL2RvbV90b2tlbnMnO1xuZXhwb3J0IHtUaXRsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL2Jyb3dzZXIvdGl0bGUnO1xuZXhwb3J0IHtcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlMsXG4gIEVMRU1FTlRfUFJPQkVfUFJPVklERVJTX1BST0RfTU9ERSxcbiAgaW5zcGVjdE5hdGl2ZUVsZW1lbnQsXG4gIEJ5XG59IGZyb20gJ2FuZ3VsYXIyL3BsYXRmb3JtL2NvbW1vbl9kb20nO1xuZXhwb3J0IHtCcm93c2VyRG9tQWRhcHRlcn0gZnJvbSAnLi9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcic7XG5leHBvcnQge2VuYWJsZURlYnVnVG9vbHMsIGRpc2FibGVEZWJ1Z1Rvb2xzfSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scyc7XG5leHBvcnQge0hBTU1FUl9HRVNUVVJFX0NPTkZJRywgSGFtbWVyR2VzdHVyZUNvbmZpZ30gZnJvbSAnLi9kb20vZXZlbnRzL2hhbW1lcl9nZXN0dXJlcyc7XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRvIGluaXRpYWxpemUgdGhlIEFuZ3VsYXIgcGxhdGZvcm0gaW4gYSB3ZWIgYnJvd3Nlci5cbiAqXG4gKiBVc2VkIGF1dG9tYXRpY2FsbHkgYnkgYGJvb3RzdHJhcGAsIG9yIGNhbiBiZSBwYXNzZWQgdG8ge0BsaW5rIHBsYXRmb3JtfS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfUFJPVklERVJTOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9IENPTlNUX0VYUFIoW1xuICBQTEFURk9STV9DT01NT05fUFJPVklERVJTLFxuICBuZXcgUHJvdmlkZXIoUExBVEZPUk1fSU5JVElBTElaRVIsIHt1c2VWYWx1ZTogaW5pdERvbUFkYXB0ZXIsIG11bHRpOiB0cnVlfSksXG5dKTtcblxuZnVuY3Rpb24gZXhjZXB0aW9uSGFuZGxlcigpOiBFeGNlcHRpb25IYW5kbGVyIHtcbiAgLy8gIUlTX0RBUlQgaXMgcmVxdWlyZWQgYmVjYXVzZSB3ZSBtdXN0IHJldGhyb3cgZXhjZXB0aW9ucyBpbiBKUyxcbiAgLy8gYnV0IG11c3Qgbm90IHJldGhyb3cgZXhjZXB0aW9ucyBpbiBEYXJ0XG4gIHJldHVybiBuZXcgRXhjZXB0aW9uSGFuZGxlcihET00sICFJU19EQVJUKTtcbn1cblxuZnVuY3Rpb24gZG9jdW1lbnQoKTogYW55IHtcbiAgcmV0dXJuIERPTS5kZWZhdWx0RG9jKCk7XG59XG5cbi8qKlxuICogQSBzZXQgb2YgcHJvdmlkZXJzIHRvIGluaXRpYWxpemUgYW4gQW5ndWxhciBhcHBsaWNhdGlvbiBpbiBhIHdlYiBicm93c2VyLlxuICpcbiAqIFVzZWQgYXV0b21hdGljYWxseSBieSBgYm9vdHN0cmFwYCwgb3IgY2FuIGJlIHBhc3NlZCB0byB7QGxpbmsgUGxhdGZvcm1SZWYuYXBwbGljYXRpb259LlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9BUFBfQ09NTU9OX1BST1ZJREVSUzogQXJyYXk8YW55IC8qVHlwZSB8IFByb3ZpZGVyIHwgYW55W10qLz4gPSBDT05TVF9FWFBSKFtcbiAgQVBQTElDQVRJT05fQ09NTU9OX1BST1ZJREVSUyxcbiAgRk9STV9QUk9WSURFUlMsXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9QSVBFUywge3VzZVZhbHVlOiBDT01NT05fUElQRVMsIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihQTEFURk9STV9ESVJFQ1RJVkVTLCB7dXNlVmFsdWU6IENPTU1PTl9ESVJFQ1RJVkVTLCBtdWx0aTogdHJ1ZX0pLFxuICBuZXcgUHJvdmlkZXIoRXhjZXB0aW9uSGFuZGxlciwge3VzZUZhY3Rvcnk6IGV4Y2VwdGlvbkhhbmRsZXIsIGRlcHM6IFtdfSksXG4gIG5ldyBQcm92aWRlcihET0NVTUVOVCwge3VzZUZhY3Rvcnk6IGRvY3VtZW50LCBkZXBzOiBbXX0pLFxuICBuZXcgUHJvdmlkZXIoRVZFTlRfTUFOQUdFUl9QTFVHSU5TLCB7dXNlQ2xhc3M6IERvbUV2ZW50c1BsdWdpbiwgbXVsdGk6IHRydWV9KSxcbiAgbmV3IFByb3ZpZGVyKEVWRU5UX01BTkFHRVJfUExVR0lOUywge3VzZUNsYXNzOiBLZXlFdmVudHNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihFVkVOVF9NQU5BR0VSX1BMVUdJTlMsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZXNQbHVnaW4sIG11bHRpOiB0cnVlfSksXG4gIG5ldyBQcm92aWRlcihIQU1NRVJfR0VTVFVSRV9DT05GSUcsIHt1c2VDbGFzczogSGFtbWVyR2VzdHVyZUNvbmZpZ30pLFxuICBuZXcgUHJvdmlkZXIoRG9tUm9vdFJlbmRlcmVyLCB7dXNlQ2xhc3M6IERvbVJvb3RSZW5kZXJlcl99KSxcbiAgbmV3IFByb3ZpZGVyKFJvb3RSZW5kZXJlciwge3VzZUV4aXN0aW5nOiBEb21Sb290UmVuZGVyZXJ9KSxcbiAgbmV3IFByb3ZpZGVyKFNoYXJlZFN0eWxlc0hvc3QsIHt1c2VFeGlzdGluZzogRG9tU2hhcmVkU3R5bGVzSG9zdH0pLFxuICBEb21TaGFyZWRTdHlsZXNIb3N0LFxuICBUZXN0YWJpbGl0eSxcbiAgQnJvd3NlckRldGFpbHMsXG4gIEFuaW1hdGlvbkJ1aWxkZXIsXG4gIEV2ZW50TWFuYWdlcixcbiAgRUxFTUVOVF9QUk9CRV9QUk9WSURFUlNcbl0pO1xuXG5leHBvcnQgY29uc3QgQ0FDSEVEX1RFTVBMQVRFX1BST1ZJREVSOiBBcnJheTxhbnkgLypUeXBlIHwgUHJvdmlkZXIgfCBhbnlbXSovPiA9XG4gICAgQ09OU1RfRVhQUihbbmV3IFByb3ZpZGVyKFhIUiwge3VzZUNsYXNzOiBDYWNoZWRYSFJ9KV0pO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdERvbUFkYXB0ZXIoKSB7XG4gIEJyb3dzZXJEb21BZGFwdGVyLm1ha2VDdXJyZW50KCk7XG4gIHd0ZkluaXQoKTtcbiAgQnJvd3NlckdldFRlc3RhYmlsaXR5LmluaXQoKTtcbn1cbiJdfQ==