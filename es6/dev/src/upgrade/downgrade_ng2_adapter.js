import { provide } from 'angular2/core';
import { NG1_SCOPE } from './constants';
const INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
export class DowngradeNg2ComponentAdapter {
    constructor(id, info, element, attrs, scope, parentInjector, parse, viewManager, hostViewFactory) {
        this.id = id;
        this.info = info;
        this.element = element;
        this.attrs = attrs;
        this.scope = scope;
        this.parentInjector = parentInjector;
        this.parse = parse;
        this.viewManager = viewManager;
        this.hostViewFactory = hostViewFactory;
        this.component = null;
        this.inputChangeCount = 0;
        this.inputChanges = null;
        this.hostViewRef = null;
        this.changeDetector = null;
        this.contentInsertionPoint = null;
        this.element[0].id = id;
        this.componentScope = scope.$new();
        this.childNodes = element.contents();
    }
    bootstrapNg2() {
        var childInjector = this.parentInjector.resolveAndCreateChild([provide(NG1_SCOPE, { useValue: this.componentScope })]);
        this.contentInsertionPoint = document.createComment('ng1 insertion point');
        this.hostViewRef = this.viewManager.createRootHostView(this.hostViewFactory, '#' + this.id, childInjector, [[this.contentInsertionPoint]]);
        var hostElement = this.viewManager.getHostElement(this.hostViewRef);
        this.changeDetector = this.hostViewRef.changeDetectorRef;
        this.component = this.viewManager.getComponent(hostElement);
    }
    setupInputs() {
        var attrs = this.attrs;
        var inputs = this.info.inputs;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var expr = null;
            if (attrs.hasOwnProperty(input.attr)) {
                var observeFn = ((prop) => {
                    var prevValue = INITIAL_VALUE;
                    return (value) => {
                        if (this.inputChanges !== null) {
                            this.inputChangeCount++;
                            this.inputChanges[prop] =
                                new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                            prevValue = value;
                        }
                        this.component[prop] = value;
                    };
                })(input.prop);
                attrs.$observe(input.attr, observeFn);
            }
            else if (attrs.hasOwnProperty(input.bindAttr)) {
                expr = attrs[input.bindAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketAttr)) {
                expr = attrs[input.bracketAttr];
            }
            else if (attrs.hasOwnProperty(input.bindonAttr)) {
                expr = attrs[input.bindonAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                expr = attrs[input.bracketParenAttr];
            }
            if (expr != null) {
                var watchFn = ((prop) => (value, prevValue) => {
                    if (this.inputChanges != null) {
                        this.inputChangeCount++;
                        this.inputChanges[prop] = new Ng1Change(prevValue, value);
                    }
                    this.component[prop] = value;
                })(input.prop);
                this.componentScope.$watch(expr, watchFn);
            }
        }
        var prototype = this.info.type.prototype;
        if (prototype && prototype.ngOnChanges) {
            // Detect: OnChanges interface
            this.inputChanges = {};
            this.componentScope.$watch(() => this.inputChangeCount, () => {
                var inputChanges = this.inputChanges;
                this.inputChanges = {};
                this.component.ngOnChanges(inputChanges);
            });
        }
        this.componentScope.$watch(() => this.changeDetector && this.changeDetector.detectChanges());
    }
    projectContent() {
        var childNodes = this.childNodes;
        var parent = this.contentInsertionPoint.parentNode;
        if (parent) {
            for (var i = 0, ii = childNodes.length; i < ii; i++) {
                parent.insertBefore(childNodes[i], this.contentInsertionPoint);
            }
        }
    }
    setupOutputs() {
        var attrs = this.attrs;
        var outputs = this.info.outputs;
        for (var j = 0; j < outputs.length; j++) {
            var output = outputs[j];
            var expr = null;
            var assignExpr = false;
            var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
            var bracketParenAttr = output.bracketParenAttr ?
                `[(${output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8)})]` :
                null;
            if (attrs.hasOwnProperty(output.onAttr)) {
                expr = attrs[output.onAttr];
            }
            else if (attrs.hasOwnProperty(output.parenAttr)) {
                expr = attrs[output.parenAttr];
            }
            else if (attrs.hasOwnProperty(bindonAttr)) {
                expr = attrs[bindonAttr];
                assignExpr = true;
            }
            else if (attrs.hasOwnProperty(bracketParenAttr)) {
                expr = attrs[bracketParenAttr];
                assignExpr = true;
            }
            if (expr != null && assignExpr != null) {
                var getter = this.parse(expr);
                var setter = getter.assign;
                if (assignExpr && !setter) {
                    throw new Error(`Expression '${expr}' is not assignable!`);
                }
                var emitter = this.component[output.prop];
                if (emitter) {
                    emitter.subscribe({
                        next: assignExpr ? ((setter) => (value) => setter(this.scope, value))(setter) :
                            ((getter) => (value) => getter(this.scope, { $event: value }))(getter)
                    });
                }
                else {
                    throw new Error(`Missing emitter '${output.prop}' on component '${this.info.selector}'!`);
                }
            }
        }
    }
    registerCleanup() {
        this.element.bind('$destroy', () => this.viewManager.destroyRootHostView(this.hostViewRef));
    }
}
class Ng1Change {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    isFirstChange() { return this.previousValue === this.currentValue; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bmdyYWRlX25nMl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1NaHlNTWloMC50bXAvYW5ndWxhcjIvc3JjL3VwZ3JhZGUvZG93bmdyYWRlX25nMl9hZGFwdGVyLnRzIl0sIm5hbWVzIjpbIkRvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIiLCJEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyLmNvbnN0cnVjdG9yIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5ib290c3RyYXBOZzIiLCJEb3duZ3JhZGVOZzJDb21wb25lbnRBZGFwdGVyLnNldHVwSW5wdXRzIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5wcm9qZWN0Q29udGVudCIsIkRvd25ncmFkZU5nMkNvbXBvbmVudEFkYXB0ZXIuc2V0dXBPdXRwdXRzIiwiRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlci5yZWdpc3RlckNsZWFudXAiLCJOZzFDaGFuZ2UiLCJOZzFDaGFuZ2UuY29uc3RydWN0b3IiLCJOZzFDaGFuZ2UuaXNGaXJzdENoYW5nZSJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFDTCxPQUFPLEVBUVIsTUFBTSxlQUFlO09BQ2YsRUFBQyxTQUFTLEVBQUMsTUFBTSxhQUFhO0FBS3JDLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLGlCQUFpQixFQUFFLElBQUk7Q0FDeEIsQ0FBQztBQUVGO0lBVUVBLFlBQW9CQSxFQUFVQSxFQUFVQSxJQUFtQkEsRUFDdkNBLE9BQWlDQSxFQUFVQSxLQUEwQkEsRUFDckVBLEtBQXFCQSxFQUFVQSxjQUF3QkEsRUFDdkRBLEtBQTRCQSxFQUFVQSxXQUEyQkEsRUFDakVBLGVBQW1DQTtRQUpuQ0MsT0FBRUEsR0FBRkEsRUFBRUEsQ0FBUUE7UUFBVUEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBZUE7UUFDdkNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQTBCQTtRQUFVQSxV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SUEsQ0FBQ0E7WUFFYkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtZQUM5QkEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xEQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNqQ0EsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzVDQSxJQUFJQSxHQUFHQSxLQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDekJBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxjQUFjQSxDQUFDQSxnQkFBZ0JBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsREEsSUFBSUEsR0FBR0EsS0FBS0EsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxDQUFDQTtnQkFDL0JBLFVBQVVBLEdBQUdBLElBQUlBLENBQUNBO1lBQ3BCQSxDQUFDQTtZQUVEQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxJQUFJQSxJQUFJQSxJQUFJQSxVQUFVQSxJQUFJQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDdkNBLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUM5QkEsSUFBSUEsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7Z0JBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDMUJBLE1BQU1BLElBQUlBLEtBQUtBLENBQUNBLGVBQWVBLElBQUlBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0E7Z0JBQzdEQSxDQUFDQTtnQkFDREEsSUFBSUEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7Z0JBQzFDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDWkEsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7d0JBQ2hCQSxJQUFJQSxFQUFFQSxVQUFVQSxHQUFHQSxDQUFDQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxLQUFLQSxLQUFLQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxNQUFNQSxDQUFDQTs0QkFDMURBLENBQUNBLENBQUNBLE1BQU1BLEtBQUtBLENBQUNBLEtBQUtBLEtBQUtBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLEVBQUVBLEVBQUNBLE1BQU1BLEVBQUVBLEtBQUtBLEVBQUNBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBO3FCQUN4RkEsQ0FBQ0EsQ0FBQ0E7Z0JBQ0xBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDTkEsTUFBTUEsSUFBSUEsS0FBS0EsQ0FBQ0Esb0JBQW9CQSxNQUFNQSxDQUFDQSxJQUFJQSxtQkFBbUJBLElBQUlBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLElBQUlBLENBQUNBLENBQUNBO2dCQUM1RkEsQ0FBQ0E7WUFDSEEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFREwsZUFBZUE7UUFDYk0sSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsTUFBTUEsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQSxDQUFDQTtJQUM5RkEsQ0FBQ0E7QUFDSE4sQ0FBQ0E7QUFFRDtJQUNFTyxZQUFtQkEsYUFBa0JBLEVBQVNBLFlBQWlCQTtRQUE1Q0Msa0JBQWFBLEdBQWJBLGFBQWFBLENBQUtBO1FBQVNBLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFLQTtJQUFHQSxDQUFDQTtJQUVuRUQsYUFBYUEsS0FBY0UsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsS0FBS0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDL0VGLENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBwcm92aWRlLFxuICBBcHBWaWV3TWFuYWdlcixcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEhvc3RWaWV3UmVmLFxuICBJbmplY3RvcixcbiAgT25DaGFuZ2VzLFxuICBIb3N0Vmlld0ZhY3RvcnlSZWYsXG4gIFNpbXBsZUNoYW5nZVxufSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7TkcxX1NDT1BFfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge0NvbXBvbmVudEluZm99IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IEVsZW1lbnQgPSBwcm90cmFjdG9yLkVsZW1lbnQ7XG5pbXBvcnQgKiBhcyBhbmd1bGFyIGZyb20gJy4vYW5ndWxhcl9qcyc7XG5cbmNvbnN0IElOSVRJQUxfVkFMVUUgPSB7XG4gIF9fVU5JTklUSUFMSVpFRF9fOiB0cnVlXG59O1xuXG5leHBvcnQgY2xhc3MgRG93bmdyYWRlTmcyQ29tcG9uZW50QWRhcHRlciB7XG4gIGNvbXBvbmVudDogYW55ID0gbnVsbDtcbiAgaW5wdXRDaGFuZ2VDb3VudDogbnVtYmVyID0gMDtcbiAgaW5wdXRDaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSA9IG51bGw7XG4gIGhvc3RWaWV3UmVmOiBIb3N0Vmlld1JlZiA9IG51bGw7XG4gIGNoYW5nZURldGVjdG9yOiBDaGFuZ2VEZXRlY3RvclJlZiA9IG51bGw7XG4gIGNvbXBvbmVudFNjb3BlOiBhbmd1bGFyLklTY29wZTtcbiAgY2hpbGROb2RlczogTm9kZVtdO1xuICBjb250ZW50SW5zZXJ0aW9uUG9pbnQ6IE5vZGUgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaWQ6IHN0cmluZywgcHJpdmF0ZSBpbmZvOiBDb21wb25lbnRJbmZvLFxuICAgICAgICAgICAgICBwcml2YXRlIGVsZW1lbnQ6IGFuZ3VsYXIuSUF1Z21lbnRlZEpRdWVyeSwgcHJpdmF0ZSBhdHRyczogYW5ndWxhci5JQXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBzY29wZTogYW5ndWxhci5JU2NvcGUsIHByaXZhdGUgcGFyZW50SW5qZWN0b3I6IEluamVjdG9yLFxuICAgICAgICAgICAgICBwcml2YXRlIHBhcnNlOiBhbmd1bGFyLklQYXJzZVNlcnZpY2UsIHByaXZhdGUgdmlld01hbmFnZXI6IEFwcFZpZXdNYW5hZ2VyLFxuICAgICAgICAgICAgICBwcml2YXRlIGhvc3RWaWV3RmFjdG9yeTogSG9zdFZpZXdGYWN0b3J5UmVmKSB7XG4gICAgKDxhbnk+dGhpcy5lbGVtZW50WzBdKS5pZCA9IGlkO1xuICAgIHRoaXMuY29tcG9uZW50U2NvcGUgPSBzY29wZS4kbmV3KCk7XG4gICAgdGhpcy5jaGlsZE5vZGVzID0gPE5vZGVbXT48YW55PmVsZW1lbnQuY29udGVudHMoKTtcbiAgfVxuXG4gIGJvb3RzdHJhcE5nMigpIHtcbiAgICB2YXIgY2hpbGRJbmplY3RvciA9IHRoaXMucGFyZW50SW5qZWN0b3IucmVzb2x2ZUFuZENyZWF0ZUNoaWxkKFxuICAgICAgICBbcHJvdmlkZShORzFfU0NPUEUsIHt1c2VWYWx1ZTogdGhpcy5jb21wb25lbnRTY29wZX0pXSk7XG4gICAgdGhpcy5jb250ZW50SW5zZXJ0aW9uUG9pbnQgPSBkb2N1bWVudC5jcmVhdGVDb21tZW50KCduZzEgaW5zZXJ0aW9uIHBvaW50Jyk7XG5cbiAgICB0aGlzLmhvc3RWaWV3UmVmID0gdGhpcy52aWV3TWFuYWdlci5jcmVhdGVSb290SG9zdFZpZXcoXG4gICAgICAgIHRoaXMuaG9zdFZpZXdGYWN0b3J5LCAnIycgKyB0aGlzLmlkLCBjaGlsZEluamVjdG9yLCBbW3RoaXMuY29udGVudEluc2VydGlvblBvaW50XV0pO1xuICAgIHZhciBob3N0RWxlbWVudCA9IHRoaXMudmlld01hbmFnZXIuZ2V0SG9zdEVsZW1lbnQodGhpcy5ob3N0Vmlld1JlZik7XG4gICAgdGhpcy5jaGFuZ2VEZXRlY3RvciA9IHRoaXMuaG9zdFZpZXdSZWYuY2hhbmdlRGV0ZWN0b3JSZWY7XG4gICAgdGhpcy5jb21wb25lbnQgPSB0aGlzLnZpZXdNYW5hZ2VyLmdldENvbXBvbmVudChob3N0RWxlbWVudCk7XG4gIH1cblxuICBzZXR1cElucHV0cygpOiB2b2lkIHtcbiAgICB2YXIgYXR0cnMgPSB0aGlzLmF0dHJzO1xuICAgIHZhciBpbnB1dHMgPSB0aGlzLmluZm8uaW5wdXRzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaW5wdXQgPSBpbnB1dHNbaV07XG4gICAgICB2YXIgZXhwciA9IG51bGw7XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYXR0cikpIHtcbiAgICAgICAgdmFyIG9ic2VydmVGbiA9ICgocHJvcCkgPT4ge1xuICAgICAgICAgIHZhciBwcmV2VmFsdWUgPSBJTklUSUFMX1ZBTFVFO1xuICAgICAgICAgIHJldHVybiAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0Q2hhbmdlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlQ291bnQrKztcbiAgICAgICAgICAgICAgdGhpcy5pbnB1dENoYW5nZXNbcHJvcF0gPVxuICAgICAgICAgICAgICAgICAgbmV3IE5nMUNoYW5nZSh2YWx1ZSwgcHJldlZhbHVlID09PSBJTklUSUFMX1ZBTFVFID8gdmFsdWUgOiBwcmV2VmFsdWUpO1xuICAgICAgICAgICAgICBwcmV2VmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50W3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoaW5wdXQucHJvcCk7XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKGlucHV0LmF0dHIsIG9ic2VydmVGbik7XG4gICAgICB9IGVsc2UgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KGlucHV0LmJpbmRBdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYmluZEF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5icmFja2V0QXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJyYWNrZXRBdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoaW5wdXQuYmluZG9uQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW2lucHV0LmJpbmRvbkF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShpbnB1dC5icmFja2V0UGFyZW5BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbaW5wdXQuYnJhY2tldFBhcmVuQXR0cl07XG4gICAgICB9XG4gICAgICBpZiAoZXhwciAhPSBudWxsKSB7XG4gICAgICAgIHZhciB3YXRjaEZuID0gKChwcm9wKSA9PiAodmFsdWUsIHByZXZWYWx1ZSkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlucHV0Q2hhbmdlcyAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0Q2hhbmdlQ291bnQrKztcbiAgICAgICAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzW3Byb3BdID0gbmV3IE5nMUNoYW5nZShwcmV2VmFsdWUsIHZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5jb21wb25lbnRbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgfSkoaW5wdXQucHJvcCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50U2NvcGUuJHdhdGNoKGV4cHIsIHdhdGNoRm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcm90b3R5cGUgPSB0aGlzLmluZm8udHlwZS5wcm90b3R5cGU7XG4gICAgaWYgKHByb3RvdHlwZSAmJiAoPE9uQ2hhbmdlcz5wcm90b3R5cGUpLm5nT25DaGFuZ2VzKSB7XG4gICAgICAvLyBEZXRlY3Q6IE9uQ2hhbmdlcyBpbnRlcmZhY2VcbiAgICAgIHRoaXMuaW5wdXRDaGFuZ2VzID0ge307XG4gICAgICB0aGlzLmNvbXBvbmVudFNjb3BlLiR3YXRjaCgoKSA9PiB0aGlzLmlucHV0Q2hhbmdlQ291bnQsICgpID0+IHtcbiAgICAgICAgdmFyIGlucHV0Q2hhbmdlcyA9IHRoaXMuaW5wdXRDaGFuZ2VzO1xuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlcyA9IHt9O1xuICAgICAgICAoPE9uQ2hhbmdlcz50aGlzLmNvbXBvbmVudCkubmdPbkNoYW5nZXMoaW5wdXRDaGFuZ2VzKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudFNjb3BlLiR3YXRjaCgoKSA9PiB0aGlzLmNoYW5nZURldGVjdG9yICYmIHRoaXMuY2hhbmdlRGV0ZWN0b3IuZGV0ZWN0Q2hhbmdlcygpKTtcbiAgfVxuXG4gIHByb2plY3RDb250ZW50KCkge1xuICAgIHZhciBjaGlsZE5vZGVzID0gdGhpcy5jaGlsZE5vZGVzO1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLmNvbnRlbnRJbnNlcnRpb25Qb2ludC5wYXJlbnROb2RlO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpaSA9IGNoaWxkTm9kZXMubGVuZ3RoOyBpIDwgaWk7IGkrKykge1xuICAgICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkTm9kZXNbaV0sIHRoaXMuY29udGVudEluc2VydGlvblBvaW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXR1cE91dHB1dHMoKSB7XG4gICAgdmFyIGF0dHJzID0gdGhpcy5hdHRycztcbiAgICB2YXIgb3V0cHV0cyA9IHRoaXMuaW5mby5vdXRwdXRzO1xuICAgIGZvciAodmFyIGogPSAwOyBqIDwgb3V0cHV0cy5sZW5ndGg7IGorKykge1xuICAgICAgdmFyIG91dHB1dCA9IG91dHB1dHNbal07XG4gICAgICB2YXIgZXhwciA9IG51bGw7XG4gICAgICB2YXIgYXNzaWduRXhwciA9IGZhbHNlO1xuXG4gICAgICB2YXIgYmluZG9uQXR0ciA9XG4gICAgICAgICAgb3V0cHV0LmJpbmRvbkF0dHIgPyBvdXRwdXQuYmluZG9uQXR0ci5zdWJzdHJpbmcoMCwgb3V0cHV0LmJpbmRvbkF0dHIubGVuZ3RoIC0gNikgOiBudWxsO1xuICAgICAgdmFyIGJyYWNrZXRQYXJlbkF0dHIgPVxuICAgICAgICAgIG91dHB1dC5icmFja2V0UGFyZW5BdHRyID9cbiAgICAgICAgICAgICAgYFsoJHtvdXRwdXQuYnJhY2tldFBhcmVuQXR0ci5zdWJzdHJpbmcoMiwgb3V0cHV0LmJyYWNrZXRQYXJlbkF0dHIubGVuZ3RoIC0gOCl9KV1gIDpcbiAgICAgICAgICAgICAgbnVsbDtcblxuICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KG91dHB1dC5vbkF0dHIpKSB7XG4gICAgICAgIGV4cHIgPSBhdHRyc1tvdXRwdXQub25BdHRyXTtcbiAgICAgIH0gZWxzZSBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkob3V0cHV0LnBhcmVuQXR0cikpIHtcbiAgICAgICAgZXhwciA9IGF0dHJzW291dHB1dC5wYXJlbkF0dHJdO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShiaW5kb25BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbYmluZG9uQXR0cl07XG4gICAgICAgIGFzc2lnbkV4cHIgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShicmFja2V0UGFyZW5BdHRyKSkge1xuICAgICAgICBleHByID0gYXR0cnNbYnJhY2tldFBhcmVuQXR0cl07XG4gICAgICAgIGFzc2lnbkV4cHIgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXhwciAhPSBudWxsICYmIGFzc2lnbkV4cHIgIT0gbnVsbCkge1xuICAgICAgICB2YXIgZ2V0dGVyID0gdGhpcy5wYXJzZShleHByKTtcbiAgICAgICAgdmFyIHNldHRlciA9IGdldHRlci5hc3NpZ247XG4gICAgICAgIGlmIChhc3NpZ25FeHByICYmICFzZXR0ZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cHJlc3Npb24gJyR7ZXhwcn0nIGlzIG5vdCBhc3NpZ25hYmxlIWApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbWl0dGVyID0gdGhpcy5jb21wb25lbnRbb3V0cHV0LnByb3BdO1xuICAgICAgICBpZiAoZW1pdHRlcikge1xuICAgICAgICAgIGVtaXR0ZXIuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG5leHQ6IGFzc2lnbkV4cHIgPyAoKHNldHRlcikgPT4gKHZhbHVlKSA9PiBzZXR0ZXIodGhpcy5zY29wZSwgdmFsdWUpKShzZXR0ZXIpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGdldHRlcikgPT4gKHZhbHVlKSA9PiBnZXR0ZXIodGhpcy5zY29wZSwgeyRldmVudDogdmFsdWV9KSkoZ2V0dGVyKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2luZyBlbWl0dGVyICcke291dHB1dC5wcm9wfScgb24gY29tcG9uZW50ICcke3RoaXMuaW5mby5zZWxlY3Rvcn0nIWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJDbGVhbnVwKCkge1xuICAgIHRoaXMuZWxlbWVudC5iaW5kKCckZGVzdHJveScsICgpID0+IHRoaXMudmlld01hbmFnZXIuZGVzdHJveVJvb3RIb3N0Vmlldyh0aGlzLmhvc3RWaWV3UmVmKSk7XG4gIH1cbn1cblxuY2xhc3MgTmcxQ2hhbmdlIGltcGxlbWVudHMgU2ltcGxlQ2hhbmdlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByZXZpb3VzVmFsdWU6IGFueSwgcHVibGljIGN1cnJlbnRWYWx1ZTogYW55KSB7fVxuXG4gIGlzRmlyc3RDaGFuZ2UoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnByZXZpb3VzVmFsdWUgPT09IHRoaXMuY3VycmVudFZhbHVlOyB9XG59XG4iXX0=