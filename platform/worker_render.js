'use strict';function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var worker_render_common_1 = require('angular2/src/platform/worker_render_common');
exports.WORKER_SCRIPT = worker_render_common_1.WORKER_SCRIPT;
exports.WORKER_RENDER_PLATFORM = worker_render_common_1.WORKER_RENDER_PLATFORM;
exports.initializeGenericWorkerRenderer = worker_render_common_1.initializeGenericWorkerRenderer;
exports.WORKER_RENDER_APPLICATION_COMMON = worker_render_common_1.WORKER_RENDER_APPLICATION_COMMON;
var worker_render_1 = require('angular2/src/platform/worker_render');
exports.WORKER_RENDER_APPLICATION = worker_render_1.WORKER_RENDER_APPLICATION;
exports.WebWorkerInstance = worker_render_1.WebWorkerInstance;
var client_message_broker_1 = require('../src/web_workers/shared/client_message_broker');
exports.ClientMessageBroker = client_message_broker_1.ClientMessageBroker;
exports.ClientMessageBrokerFactory = client_message_broker_1.ClientMessageBrokerFactory;
exports.FnArg = client_message_broker_1.FnArg;
exports.UiArguments = client_message_broker_1.UiArguments;
var service_message_broker_1 = require('../src/web_workers/shared/service_message_broker');
exports.ReceivedMessage = service_message_broker_1.ReceivedMessage;
exports.ServiceMessageBroker = service_message_broker_1.ServiceMessageBroker;
exports.ServiceMessageBrokerFactory = service_message_broker_1.ServiceMessageBrokerFactory;
var serializer_1 = require('../src/web_workers/shared/serializer');
exports.PRIMITIVE = serializer_1.PRIMITIVE;
__export(require('../src/web_workers/shared/message_bus'));
var worker_render_2 = require('angular2/src/platform/worker_render');
/**
 * @deprecated Use WORKER_RENDER_APPLICATION
 */
exports.WORKER_RENDER_APP = worker_render_2.WORKER_RENDER_APPLICATION;
var router_providers_1 = require('angular2/src/web_workers/ui/router_providers');
exports.WORKER_RENDER_ROUTER = router_providers_1.WORKER_RENDER_ROUTER;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtS1czcDZqY2MudG1wL2FuZ3VsYXIyL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBS08sNENBQTRDLENBQUM7QUFKbEQsNkRBQWE7QUFDYiwrRUFBc0I7QUFDdEIsaUdBQStCO0FBQy9CLG1HQUNrRDtBQUNwRCw4QkFBMkQscUNBQXFDLENBQUM7QUFBekYsOEVBQXlCO0FBQUUsOERBQThEO0FBQ2pHLHNDQUtPLGlEQUFpRCxDQUFDO0FBSnZELDBFQUFtQjtBQUNuQix3RkFBMEI7QUFDMUIsOENBQUs7QUFDTCwwREFDdUQ7QUFDekQsdUNBSU8sa0RBQWtELENBQUM7QUFIeEQsbUVBQWU7QUFDZiw2RUFBb0I7QUFDcEIsMkZBQ3dEO0FBQzFELDJCQUF3QixzQ0FBc0MsQ0FBQztBQUF2RCwyQ0FBdUQ7QUFDL0QsaUJBQWMsdUNBQXVDLENBQUMsRUFBQTtBQUN0RCw4QkFBd0MscUNBQXFDLENBQUMsQ0FBQTtBQUU5RTs7R0FFRztBQUNVLHlCQUFpQixHQUFHLHlDQUF5QixDQUFDO0FBQzNELGlDQUFtQyw4Q0FBOEMsQ0FBQztBQUExRSx1RUFBMEUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge1xuICBXT1JLRVJfU0NSSVBULFxuICBXT1JLRVJfUkVOREVSX1BMQVRGT1JNLFxuICBpbml0aWFsaXplR2VuZXJpY1dvcmtlclJlbmRlcmVyLFxuICBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OX0NPTU1PTlxufSBmcm9tICdhbmd1bGFyMi9zcmMvcGxhdGZvcm0vd29ya2VyX3JlbmRlcl9jb21tb24nO1xuZXhwb3J0IHtXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OLCBXZWJXb3JrZXJJbnN0YW5jZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3BsYXRmb3JtL3dvcmtlcl9yZW5kZXInO1xuZXhwb3J0IHtcbiAgQ2xpZW50TWVzc2FnZUJyb2tlcixcbiAgQ2xpZW50TWVzc2FnZUJyb2tlckZhY3RvcnksXG4gIEZuQXJnLFxuICBVaUFyZ3VtZW50c1xufSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL2NsaWVudF9tZXNzYWdlX2Jyb2tlcic7XG5leHBvcnQge1xuICBSZWNlaXZlZE1lc3NhZ2UsXG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyLFxuICBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnlcbn0gZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmV4cG9ydCB7UFJJTUlUSVZFfSBmcm9tICcuLi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuZXhwb3J0ICogZnJvbSAnLi4vc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1dPUktFUl9SRU5ERVJfQVBQTElDQVRJT059IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS93b3JrZXJfcmVuZGVyJztcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2UgV09SS0VSX1JFTkRFUl9BUFBMSUNBVElPTlxuICovXG5leHBvcnQgY29uc3QgV09SS0VSX1JFTkRFUl9BUFAgPSBXT1JLRVJfUkVOREVSX0FQUExJQ0FUSU9OO1xuZXhwb3J0IHtXT1JLRVJfUkVOREVSX1JPVVRFUn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL3JvdXRlcl9wcm92aWRlcnMnO1xuIl19