var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserPlatformLocation } from 'angular2/src/platform/browser/location/browser_platform_location';
import { Injectable } from 'angular2/src/core/di';
import { ROUTER_CHANNEL } from 'angular2/src/web_workers/shared/messaging_api';
import { ServiceMessageBrokerFactory } from 'angular2/src/web_workers/shared/service_message_broker';
import { PRIMITIVE, Serializer } from 'angular2/src/web_workers/shared/serializer';
import { bind } from './bind';
import { LocationType } from 'angular2/src/web_workers/shared/serialized_types';
import { MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { ObservableWrapper, PromiseWrapper } from 'angular2/src/facade/async';
export let MessageBasedPlatformLocation = class MessageBasedPlatformLocation {
    constructor(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(bind(this._sendUrlChangeEvent, this));
        this._platformLocation.onHashChange(bind(this._sendUrlChangeEvent, this));
        this._broker = this._brokerFactory.createMessageBroker(ROUTER_CHANNEL);
        this._channelSink = bus.to(ROUTER_CHANNEL);
    }
    start() {
        this._broker.registerMethod("getLocation", null, bind(this._getLocation, this), LocationType);
        this._broker.registerMethod("setPathname", [PRIMITIVE], bind(this._setPathname, this));
        this._broker.registerMethod("pushState", [PRIMITIVE, PRIMITIVE, PRIMITIVE], bind(this._platformLocation.pushState, this._platformLocation));
        this._broker.registerMethod("replaceState", [PRIMITIVE, PRIMITIVE, PRIMITIVE], bind(this._platformLocation.replaceState, this._platformLocation));
        this._broker.registerMethod("forward", null, bind(this._platformLocation.forward, this._platformLocation));
        this._broker.registerMethod("back", null, bind(this._platformLocation.back, this._platformLocation));
    }
    _getLocation() {
        return PromiseWrapper.resolve(this._platformLocation.location);
    }
    _sendUrlChangeEvent(e) {
        let loc = this._serializer.serialize(this._platformLocation.location, LocationType);
        let serializedEvent = { 'type': e.type };
        ObservableWrapper.callEmit(this._channelSink, { 'event': serializedEvent, 'location': loc });
    }
    _setPathname(pathname) { this._platformLocation.pathname = pathname; }
};
MessageBasedPlatformLocation = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ServiceMessageBrokerFactory, BrowserPlatformLocation, MessageBus, Serializer])
], MessageBasedPlatformLocation);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLUVpWUtlMU15LnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcGxhdGZvcm1fbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O09BQU8sRUFDTCx1QkFBdUIsRUFDeEIsTUFBTSxrRUFBa0U7T0FFbEUsRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0I7T0FDeEMsRUFBQyxjQUFjLEVBQUMsTUFBTSwrQ0FBK0M7T0FDckUsRUFDTCwyQkFBMkIsRUFFNUIsTUFBTSx3REFBd0Q7T0FDeEQsRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sNENBQTRDO09BQ3pFLEVBQUMsSUFBSSxFQUFDLE1BQU0sUUFBUTtPQUNwQixFQUFDLFlBQVksRUFBQyxNQUFNLGtEQUFrRDtPQUN0RSxFQUFDLFVBQVUsRUFBQyxNQUFNLDZDQUE2QztPQUMvRCxFQUFlLGlCQUFpQixFQUFFLGNBQWMsRUFBQyxNQUFNLDJCQUEyQjtBQUd6RjtJQUlFLFlBQW9CLGNBQTJDLEVBQzNDLGlCQUEwQyxFQUFFLEdBQWUsRUFDM0QsV0FBdUI7UUFGdkIsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQzNDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBeUI7UUFDMUMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsRUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztRQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLENBQUM7SUFFTyxZQUFZO1FBQ2xCLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBR08sbUJBQW1CLENBQUMsQ0FBUTtRQUNsQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BGLElBQUksZUFBZSxHQUFHLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLEVBQUMsQ0FBQztRQUN2QyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBQyxDQUFDLENBQUM7SUFDN0YsQ0FBQztJQUVPLFlBQVksQ0FBQyxRQUFnQixJQUFVLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM5RixDQUFDO0FBdkNEO0lBQUMsVUFBVSxFQUFFOztnQ0FBQTtBQXVDWiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEJyb3dzZXJQbGF0Zm9ybUxvY2F0aW9uXG59IGZyb20gJ2FuZ3VsYXIyL3NyYy9wbGF0Zm9ybS9icm93c2VyL2xvY2F0aW9uL2Jyb3dzZXJfcGxhdGZvcm1fbG9jYXRpb24nO1xuaW1wb3J0IHtVcmxDaGFuZ2VMaXN0ZW5lcn0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vY29tbW9uJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtST1VURVJfQ0hBTk5FTH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdpbmdfYXBpJztcbmltcG9ydCB7XG4gIFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgU2VydmljZU1lc3NhZ2VCcm9rZXJcbn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJ2aWNlX21lc3NhZ2VfYnJva2VyJztcbmltcG9ydCB7UFJJTUlUSVZFLCBTZXJpYWxpemVyfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcmlhbGl6ZXInO1xuaW1wb3J0IHtiaW5kfSBmcm9tICcuL2JpbmQnO1xuaW1wb3J0IHtMb2NhdGlvblR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplZF90eXBlcyc7XG5pbXBvcnQge01lc3NhZ2VCdXN9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnZV9idXMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIE9ic2VydmFibGVXcmFwcGVyLCBQcm9taXNlV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9hc3luYyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRQbGF0Zm9ybUxvY2F0aW9uIHtcbiAgcHJpdmF0ZSBfY2hhbm5lbFNpbms6IEV2ZW50RW1pdHRlcjxPYmplY3Q+O1xuICBwcml2YXRlIF9icm9rZXI6IFNlcnZpY2VNZXNzYWdlQnJva2VyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfcGxhdGZvcm1Mb2NhdGlvbjogQnJvd3NlclBsYXRmb3JtTG9jYXRpb24sIGJ1czogTWVzc2FnZUJ1cyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplcikge1xuICAgIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ub25Qb3BTdGF0ZSg8VXJsQ2hhbmdlTGlzdGVuZXI+YmluZCh0aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQsIHRoaXMpKTtcbiAgICB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLm9uSGFzaENoYW5nZSg8VXJsQ2hhbmdlTGlzdGVuZXI+YmluZCh0aGlzLl9zZW5kVXJsQ2hhbmdlRXZlbnQsIHRoaXMpKTtcbiAgICB0aGlzLl9icm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUk9VVEVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2NoYW5uZWxTaW5rID0gYnVzLnRvKFJPVVRFUl9DSEFOTkVMKTtcbiAgfVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcImdldExvY2F0aW9uXCIsIG51bGwsIGJpbmQodGhpcy5fZ2V0TG9jYXRpb24sIHRoaXMpLCBMb2NhdGlvblR5cGUpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldFBhdGhuYW1lXCIsIFtQUklNSVRJVkVdLCBiaW5kKHRoaXMuX3NldFBhdGhuYW1lLCB0aGlzKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwicHVzaFN0YXRlXCIsIFtQUklNSVRJVkUsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uLnB1c2hTdGF0ZSwgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICAgIHRoaXMuX2Jyb2tlci5yZWdpc3Rlck1ldGhvZChcInJlcGxhY2VTdGF0ZVwiLCBbUFJJTUlUSVZFLCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5yZXBsYWNlU3RhdGUsIHRoaXMuX3BsYXRmb3JtTG9jYXRpb24pKTtcbiAgICB0aGlzLl9icm9rZXIucmVnaXN0ZXJNZXRob2QoXCJmb3J3YXJkXCIsIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5mb3J3YXJkLCB0aGlzLl9wbGF0Zm9ybUxvY2F0aW9uKSk7XG4gICAgdGhpcy5fYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiYmFja1wiLCBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24uYmFjaywgdGhpcy5fcGxhdGZvcm1Mb2NhdGlvbikpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TG9jYXRpb24oKTogUHJvbWlzZTxMb2NhdGlvbj4ge1xuICAgIHJldHVybiBQcm9taXNlV3JhcHBlci5yZXNvbHZlKHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ubG9jYXRpb24pO1xuICB9XG5cblxuICBwcml2YXRlIF9zZW5kVXJsQ2hhbmdlRXZlbnQoZTogRXZlbnQpOiB2b2lkIHtcbiAgICBsZXQgbG9jID0gdGhpcy5fc2VyaWFsaXplci5zZXJpYWxpemUodGhpcy5fcGxhdGZvcm1Mb2NhdGlvbi5sb2NhdGlvbiwgTG9jYXRpb25UeXBlKTtcbiAgICBsZXQgc2VyaWFsaXplZEV2ZW50ID0geyd0eXBlJzogZS50eXBlfTtcbiAgICBPYnNlcnZhYmxlV3JhcHBlci5jYWxsRW1pdCh0aGlzLl9jaGFubmVsU2luaywgeydldmVudCc6IHNlcmlhbGl6ZWRFdmVudCwgJ2xvY2F0aW9uJzogbG9jfSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRQYXRobmFtZShwYXRobmFtZTogc3RyaW5nKTogdm9pZCB7IHRoaXMuX3BsYXRmb3JtTG9jYXRpb24ucGF0aG5hbWUgPSBwYXRobmFtZTsgfVxufVxuIl19