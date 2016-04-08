'use strict';var lang_1 = require('angular2/src/facade/lang');
var ng_control_name_1 = require('./directives/ng_control_name');
var ng_form_control_1 = require('./directives/ng_form_control');
var ng_model_1 = require('./directives/ng_model');
var ng_control_group_1 = require('./directives/ng_control_group');
var ng_form_model_1 = require('./directives/ng_form_model');
var ng_form_1 = require('./directives/ng_form');
var default_value_accessor_1 = require('./directives/default_value_accessor');
var checkbox_value_accessor_1 = require('./directives/checkbox_value_accessor');
var number_value_accessor_1 = require('./directives/number_value_accessor');
var radio_control_value_accessor_1 = require('./directives/radio_control_value_accessor');
var ng_control_status_1 = require('./directives/ng_control_status');
var select_control_value_accessor_1 = require('./directives/select_control_value_accessor');
var validators_1 = require('./directives/validators');
var ng_control_name_2 = require('./directives/ng_control_name');
exports.NgControlName = ng_control_name_2.NgControlName;
var ng_form_control_2 = require('./directives/ng_form_control');
exports.NgFormControl = ng_form_control_2.NgFormControl;
var ng_model_2 = require('./directives/ng_model');
exports.NgModel = ng_model_2.NgModel;
var ng_control_group_2 = require('./directives/ng_control_group');
exports.NgControlGroup = ng_control_group_2.NgControlGroup;
var ng_form_model_2 = require('./directives/ng_form_model');
exports.NgFormModel = ng_form_model_2.NgFormModel;
var ng_form_2 = require('./directives/ng_form');
exports.NgForm = ng_form_2.NgForm;
var default_value_accessor_2 = require('./directives/default_value_accessor');
exports.DefaultValueAccessor = default_value_accessor_2.DefaultValueAccessor;
var checkbox_value_accessor_2 = require('./directives/checkbox_value_accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_2.CheckboxControlValueAccessor;
var radio_control_value_accessor_2 = require('./directives/radio_control_value_accessor');
exports.RadioControlValueAccessor = radio_control_value_accessor_2.RadioControlValueAccessor;
exports.RadioButtonState = radio_control_value_accessor_2.RadioButtonState;
var number_value_accessor_2 = require('./directives/number_value_accessor');
exports.NumberValueAccessor = number_value_accessor_2.NumberValueAccessor;
var ng_control_status_2 = require('./directives/ng_control_status');
exports.NgControlStatus = ng_control_status_2.NgControlStatus;
var select_control_value_accessor_2 = require('./directives/select_control_value_accessor');
exports.SelectControlValueAccessor = select_control_value_accessor_2.SelectControlValueAccessor;
exports.NgSelectOption = select_control_value_accessor_2.NgSelectOption;
var validators_2 = require('./directives/validators');
exports.RequiredValidator = validators_2.RequiredValidator;
exports.MinLengthValidator = validators_2.MinLengthValidator;
exports.MaxLengthValidator = validators_2.MaxLengthValidator;
exports.PatternValidator = validators_2.PatternValidator;
var ng_control_1 = require('./directives/ng_control');
exports.NgControl = ng_control_1.NgControl;
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 */
exports.FORM_DIRECTIVES = lang_1.CONST_EXPR([
    ng_control_name_1.NgControlName,
    ng_control_group_1.NgControlGroup,
    ng_form_control_1.NgFormControl,
    ng_model_1.NgModel,
    ng_form_model_1.NgFormModel,
    ng_form_1.NgForm,
    select_control_value_accessor_1.NgSelectOption,
    default_value_accessor_1.DefaultValueAccessor,
    number_value_accessor_1.NumberValueAccessor,
    checkbox_value_accessor_1.CheckboxControlValueAccessor,
    select_control_value_accessor_1.SelectControlValueAccessor,
    radio_control_value_accessor_1.RadioControlValueAccessor,
    ng_control_status_1.NgControlStatus,
    validators_1.RequiredValidator,
    validators_1.MinLengthValidator,
    validators_1.MaxLengthValidator,
    validators_1.PatternValidator
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtS1czcDZqY2MudG1wL2FuZ3VsYXIyL3NyYy9jb21tb24vZm9ybXMvZGlyZWN0aXZlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxxQkFBK0IsMEJBQTBCLENBQUMsQ0FBQTtBQUMxRCxnQ0FBNEIsOEJBQThCLENBQUMsQ0FBQTtBQUMzRCxnQ0FBNEIsOEJBQThCLENBQUMsQ0FBQTtBQUMzRCx5QkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5QyxpQ0FBNkIsK0JBQStCLENBQUMsQ0FBQTtBQUM3RCw4QkFBMEIsNEJBQTRCLENBQUMsQ0FBQTtBQUN2RCx3QkFBcUIsc0JBQXNCLENBQUMsQ0FBQTtBQUM1Qyx1Q0FBbUMscUNBQXFDLENBQUMsQ0FBQTtBQUN6RSx3Q0FBMkMsc0NBQXNDLENBQUMsQ0FBQTtBQUNsRixzQ0FBa0Msb0NBQW9DLENBQUMsQ0FBQTtBQUN2RSw2Q0FBd0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRixrQ0FBOEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMvRCw4Q0FHTyw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ3BELDJCQUtPLHlCQUF5QixDQUFDLENBQUE7QUFFakMsZ0NBQTRCLDhCQUE4QixDQUFDO0FBQW5ELHdEQUFtRDtBQUMzRCxnQ0FBNEIsOEJBQThCLENBQUM7QUFBbkQsd0RBQW1EO0FBQzNELHlCQUFzQix1QkFBdUIsQ0FBQztBQUF0QyxxQ0FBc0M7QUFDOUMsaUNBQTZCLCtCQUErQixDQUFDO0FBQXJELDJEQUFxRDtBQUM3RCw4QkFBMEIsNEJBQTRCLENBQUM7QUFBL0Msa0RBQStDO0FBQ3ZELHdCQUFxQixzQkFBc0IsQ0FBQztBQUFwQyxrQ0FBb0M7QUFDNUMsdUNBQW1DLHFDQUFxQyxDQUFDO0FBQWpFLDZFQUFpRTtBQUN6RSx3Q0FBMkMsc0NBQXNDLENBQUM7QUFBMUUsOEZBQTBFO0FBQ2xGLDZDQUdPLDJDQUEyQyxDQUFDO0FBRmpELDZGQUF5QjtBQUN6QiwyRUFDaUQ7QUFDbkQsc0NBQWtDLG9DQUFvQyxDQUFDO0FBQS9ELDBFQUErRDtBQUN2RSxrQ0FBOEIsZ0NBQWdDLENBQUM7QUFBdkQsOERBQXVEO0FBQy9ELDhDQUdPLDRDQUE0QyxDQUFDO0FBRmxELGdHQUEwQjtBQUMxQix3RUFDa0Q7QUFDcEQsMkJBS08seUJBQXlCLENBQUM7QUFKL0IsMkRBQWlCO0FBQ2pCLDZEQUFrQjtBQUNsQiw2REFBa0I7QUFDbEIseURBQytCO0FBQ2pDLDJCQUF3Qix5QkFBeUIsQ0FBQztBQUExQywyQ0FBMEM7QUFHbEQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ1UsdUJBQWUsR0FBVyxpQkFBVSxDQUFDO0lBQ2hELCtCQUFhO0lBQ2IsaUNBQWM7SUFFZCwrQkFBYTtJQUNiLGtCQUFPO0lBQ1AsMkJBQVc7SUFDWCxnQkFBTTtJQUVOLDhDQUFjO0lBQ2QsNkNBQW9CO0lBQ3BCLDJDQUFtQjtJQUNuQixzREFBNEI7SUFDNUIsMERBQTBCO0lBQzFCLHdEQUF5QjtJQUN6QixtQ0FBZTtJQUVmLDhCQUFpQjtJQUNqQiwrQkFBa0I7SUFDbEIsK0JBQWtCO0lBQ2xCLDZCQUFnQjtDQUNqQixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1R5cGUsIENPTlNUX0VYUFJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge05nQ29udHJvbE5hbWV9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUnO1xuaW1wb3J0IHtOZ0Zvcm1Db250cm9sfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9jb250cm9sJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX21vZGVsJztcbmltcG9ydCB7TmdDb250cm9sR3JvdXB9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX2dyb3VwJztcbmltcG9ydCB7TmdGb3JtTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtX21vZGVsJztcbmltcG9ydCB7TmdGb3JtfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybSc7XG5pbXBvcnQge0RlZmF1bHRWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0NoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbFN0YXR1c30gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzJztcbmltcG9ydCB7XG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOZ1NlbGVjdE9wdGlvblxufSBmcm9tICcuL2RpcmVjdGl2ZXMvc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtcbiAgUmVxdWlyZWRWYWxpZGF0b3IsXG4gIE1pbkxlbmd0aFZhbGlkYXRvcixcbiAgTWF4TGVuZ3RoVmFsaWRhdG9yLFxuICBQYXR0ZXJuVmFsaWRhdG9yXG59IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcblxuZXhwb3J0IHtOZ0NvbnRyb2xOYW1lfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9uYW1lJztcbmV4cG9ydCB7TmdGb3JtQ29udHJvbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm1fY29udHJvbCc7XG5leHBvcnQge05nTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19tb2RlbCc7XG5leHBvcnQge05nQ29udHJvbEdyb3VwfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9ncm91cCc7XG5leHBvcnQge05nRm9ybU1vZGVsfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbCc7XG5leHBvcnQge05nRm9ybX0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2Zvcm0nO1xuZXhwb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtcbiAgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcixcbiAgUmFkaW9CdXR0b25TdGF0ZVxufSBmcm9tICcuL2RpcmVjdGl2ZXMvcmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge051bWJlclZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtOZ0NvbnRyb2xTdGF0dXN9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sX3N0YXR1cyc7XG5leHBvcnQge1xuICBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgTmdTZWxlY3RPcHRpb25cbn0gZnJvbSAnLi9kaXJlY3RpdmVzL3NlbGVjdF9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7XG4gIFJlcXVpcmVkVmFsaWRhdG9yLFxuICBNaW5MZW5ndGhWYWxpZGF0b3IsXG4gIE1heExlbmd0aFZhbGlkYXRvcixcbiAgUGF0dGVyblZhbGlkYXRvclxufSBmcm9tICcuL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycyc7XG5leHBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2wnO1xuZXhwb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuXG4vKipcbiAqXG4gKiBBIGxpc3Qgb2YgYWxsIHRoZSBmb3JtIGRpcmVjdGl2ZXMgdXNlZCBhcyBwYXJ0IG9mIGEgYEBDb21wb25lbnRgIGFubm90YXRpb24uXG4gKlxuICogIFRoaXMgaXMgYSBzaG9ydGhhbmQgZm9yIGltcG9ydGluZyB0aGVtIGVhY2ggaW5kaXZpZHVhbGx5LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAqICAgZGlyZWN0aXZlczogW0ZPUk1fRElSRUNUSVZFU11cbiAqIH0pXG4gKiBjbGFzcyBNeUFwcCB7fVxuICogYGBgXG4gKi9cbmV4cG9ydCBjb25zdCBGT1JNX0RJUkVDVElWRVM6IFR5cGVbXSA9IENPTlNUX0VYUFIoW1xuICBOZ0NvbnRyb2xOYW1lLFxuICBOZ0NvbnRyb2xHcm91cCxcblxuICBOZ0Zvcm1Db250cm9sLFxuICBOZ01vZGVsLFxuICBOZ0Zvcm1Nb2RlbCxcbiAgTmdGb3JtLFxuXG4gIE5nU2VsZWN0T3B0aW9uLFxuICBEZWZhdWx0VmFsdWVBY2Nlc3NvcixcbiAgTnVtYmVyVmFsdWVBY2Nlc3NvcixcbiAgQ2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIE5nQ29udHJvbFN0YXR1cyxcblxuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3Jcbl0pO1xuIl19