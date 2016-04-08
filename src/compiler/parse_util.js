'use strict';var ParseLocation = (function () {
    function ParseLocation(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
    }
    ParseLocation.prototype.toString = function () { return this.file.url + "@" + this.line + ":" + this.col; };
    return ParseLocation;
})();
exports.ParseLocation = ParseLocation;
var ParseSourceFile = (function () {
    function ParseSourceFile(content, url) {
        this.content = content;
        this.url = url;
    }
    return ParseSourceFile;
})();
exports.ParseSourceFile = ParseSourceFile;
var ParseSourceSpan = (function () {
    function ParseSourceSpan(start, end) {
        this.start = start;
        this.end = end;
    }
    ParseSourceSpan.prototype.toString = function () {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
    };
    return ParseSourceSpan;
})();
exports.ParseSourceSpan = ParseSourceSpan;
var ParseError = (function () {
    function ParseError(span, msg) {
        this.span = span;
        this.msg = msg;
    }
    ParseError.prototype.toString = function () {
        var source = this.span.start.file.content;
        var ctxStart = this.span.start.offset;
        if (ctxStart > source.length - 1) {
            ctxStart = source.length - 1;
        }
        var ctxEnd = ctxStart;
        var ctxLen = 0;
        var ctxLines = 0;
        while (ctxLen < 100 && ctxStart > 0) {
            ctxStart--;
            ctxLen++;
            if (source[ctxStart] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        ctxLen = 0;
        ctxLines = 0;
        while (ctxLen < 100 && ctxEnd < source.length - 1) {
            ctxEnd++;
            ctxLen++;
            if (source[ctxEnd] == "\n") {
                if (++ctxLines == 3) {
                    break;
                }
            }
        }
        var context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
            source.substring(this.span.start.offset, ctxEnd + 1);
        return this.msg + " (\"" + context + "\"): " + this.span.start;
    };
    return ParseError;
})();
exports.ParseError = ParseError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtS1czcDZqY2MudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9wYXJzZV91dGlsLnRzIl0sIm5hbWVzIjpbIlBhcnNlTG9jYXRpb24iLCJQYXJzZUxvY2F0aW9uLmNvbnN0cnVjdG9yIiwiUGFyc2VMb2NhdGlvbi50b1N0cmluZyIsIlBhcnNlU291cmNlRmlsZSIsIlBhcnNlU291cmNlRmlsZS5jb25zdHJ1Y3RvciIsIlBhcnNlU291cmNlU3BhbiIsIlBhcnNlU291cmNlU3Bhbi5jb25zdHJ1Y3RvciIsIlBhcnNlU291cmNlU3Bhbi50b1N0cmluZyIsIlBhcnNlRXJyb3IiLCJQYXJzZUVycm9yLmNvbnN0cnVjdG9yIiwiUGFyc2VFcnJvci50b1N0cmluZyJdLCJtYXBwaW5ncyI6IkFBQUE7SUFDRUEsdUJBQW1CQSxJQUFxQkEsRUFBU0EsTUFBY0EsRUFBU0EsSUFBWUEsRUFDakVBLEdBQVdBO1FBRFhDLFNBQUlBLEdBQUpBLElBQUlBLENBQWlCQTtRQUFTQSxXQUFNQSxHQUFOQSxNQUFNQSxDQUFRQTtRQUFTQSxTQUFJQSxHQUFKQSxJQUFJQSxDQUFRQTtRQUNqRUEsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBUUE7SUFBR0EsQ0FBQ0E7SUFFbENELGdDQUFRQSxHQUFSQSxjQUFxQkUsTUFBTUEsQ0FBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsU0FBSUEsSUFBSUEsQ0FBQ0EsSUFBSUEsU0FBSUEsSUFBSUEsQ0FBQ0EsR0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFDNUVGLG9CQUFDQTtBQUFEQSxDQUFDQSxBQUxELElBS0M7QUFMWSxxQkFBYSxnQkFLekIsQ0FBQTtBQUVEO0lBQ0VHLHlCQUFtQkEsT0FBZUEsRUFBU0EsR0FBV0E7UUFBbkNDLFlBQU9BLEdBQVBBLE9BQU9BLENBQVFBO1FBQVNBLFFBQUdBLEdBQUhBLEdBQUdBLENBQVFBO0lBQUdBLENBQUNBO0lBQzVERCxzQkFBQ0E7QUFBREEsQ0FBQ0EsQUFGRCxJQUVDO0FBRlksdUJBQWUsa0JBRTNCLENBQUE7QUFFRDtJQUNFRSx5QkFBbUJBLEtBQW9CQSxFQUFTQSxHQUFrQkE7UUFBL0NDLFVBQUtBLEdBQUxBLEtBQUtBLENBQWVBO1FBQVNBLFFBQUdBLEdBQUhBLEdBQUdBLENBQWVBO0lBQUdBLENBQUNBO0lBRXRFRCxrQ0FBUUEsR0FBUkE7UUFDRUUsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0E7SUFDL0VBLENBQUNBO0lBQ0hGLHNCQUFDQTtBQUFEQSxDQUFDQSxBQU5ELElBTUM7QUFOWSx1QkFBZSxrQkFNM0IsQ0FBQTtBQUVEO0lBQ0VHLG9CQUFtQkEsSUFBcUJBLEVBQVNBLEdBQVdBO1FBQXpDQyxTQUFJQSxHQUFKQSxJQUFJQSxDQUFpQkE7UUFBU0EsUUFBR0EsR0FBSEEsR0FBR0EsQ0FBUUE7SUFBR0EsQ0FBQ0E7SUFFaEVELDZCQUFRQSxHQUFSQTtRQUNFRSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUMxQ0EsSUFBSUEsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDdENBLEVBQUVBLENBQUNBLENBQUNBLFFBQVFBLEdBQUdBLE1BQU1BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2pDQSxRQUFRQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUMvQkEsQ0FBQ0E7UUFDREEsSUFBSUEsTUFBTUEsR0FBR0EsUUFBUUEsQ0FBQ0E7UUFDdEJBLElBQUlBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBO1FBQ2ZBLElBQUlBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBO1FBRWpCQSxPQUFPQSxNQUFNQSxHQUFHQSxHQUFHQSxJQUFJQSxRQUFRQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNwQ0EsUUFBUUEsRUFBRUEsQ0FBQ0E7WUFDWEEsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDcEJBLEtBQUtBLENBQUNBO2dCQUNSQSxDQUFDQTtZQUNIQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEQSxNQUFNQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNYQSxRQUFRQSxHQUFHQSxDQUFDQSxDQUFDQTtRQUNiQSxPQUFPQSxNQUFNQSxHQUFHQSxHQUFHQSxJQUFJQSxNQUFNQSxHQUFHQSxNQUFNQSxDQUFDQSxNQUFNQSxHQUFHQSxDQUFDQSxFQUFFQSxDQUFDQTtZQUNsREEsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDVEEsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDVEEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzNCQSxFQUFFQSxDQUFDQSxDQUFDQSxFQUFFQSxRQUFRQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDcEJBLEtBQUtBLENBQUNBO2dCQUNSQSxDQUFDQTtZQUNIQSxDQUFDQTtRQUNIQSxDQUFDQTtRQUVEQSxJQUFJQSxPQUFPQSxHQUFHQSxNQUFNQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQSxNQUFNQSxDQUFDQSxHQUFHQSxZQUFZQTtZQUNqRUEsTUFBTUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsRUFBRUEsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFFbkVBLE1BQU1BLENBQUlBLElBQUlBLENBQUNBLEdBQUdBLFlBQU1BLE9BQU9BLGFBQU9BLElBQUlBLENBQUNBLElBQUlBLENBQUNBLEtBQU9BLENBQUNBO0lBQzFEQSxDQUFDQTtJQUNIRixpQkFBQ0E7QUFBREEsQ0FBQ0EsQUF4Q0QsSUF3Q0M7QUF4Q3FCLGtCQUFVLGFBd0MvQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFBhcnNlTG9jYXRpb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZmlsZTogUGFyc2VTb3VyY2VGaWxlLCBwdWJsaWMgb2Zmc2V0OiBudW1iZXIsIHB1YmxpYyBsaW5lOiBudW1iZXIsXG4gICAgICAgICAgICAgIHB1YmxpYyBjb2w6IG51bWJlcikge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gYCR7dGhpcy5maWxlLnVybH1AJHt0aGlzLmxpbmV9OiR7dGhpcy5jb2x9YDsgfVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VTb3VyY2VGaWxlIHtcbiAgY29uc3RydWN0b3IocHVibGljIGNvbnRlbnQ6IHN0cmluZywgcHVibGljIHVybDogc3RyaW5nKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgUGFyc2VTb3VyY2VTcGFuIHtcbiAgY29uc3RydWN0b3IocHVibGljIHN0YXJ0OiBQYXJzZUxvY2F0aW9uLCBwdWJsaWMgZW5kOiBQYXJzZUxvY2F0aW9uKSB7fVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQuZmlsZS5jb250ZW50LnN1YnN0cmluZyh0aGlzLnN0YXJ0Lm9mZnNldCwgdGhpcy5lbmQub2Zmc2V0KTtcbiAgfVxufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFyc2VFcnJvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzcGFuOiBQYXJzZVNvdXJjZVNwYW4sIHB1YmxpYyBtc2c6IHN0cmluZykge31cblxuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIHZhciBzb3VyY2UgPSB0aGlzLnNwYW4uc3RhcnQuZmlsZS5jb250ZW50O1xuICAgIHZhciBjdHhTdGFydCA9IHRoaXMuc3Bhbi5zdGFydC5vZmZzZXQ7XG4gICAgaWYgKGN0eFN0YXJ0ID4gc291cmNlLmxlbmd0aCAtIDEpIHtcbiAgICAgIGN0eFN0YXJ0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gICAgfVxuICAgIHZhciBjdHhFbmQgPSBjdHhTdGFydDtcbiAgICB2YXIgY3R4TGVuID0gMDtcbiAgICB2YXIgY3R4TGluZXMgPSAwO1xuXG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhTdGFydCA+IDApIHtcbiAgICAgIGN0eFN0YXJ0LS07XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4U3RhcnRdID09IFwiXFxuXCIpIHtcbiAgICAgICAgaWYgKCsrY3R4TGluZXMgPT0gMykge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY3R4TGVuID0gMDtcbiAgICBjdHhMaW5lcyA9IDA7XG4gICAgd2hpbGUgKGN0eExlbiA8IDEwMCAmJiBjdHhFbmQgPCBzb3VyY2UubGVuZ3RoIC0gMSkge1xuICAgICAgY3R4RW5kKys7XG4gICAgICBjdHhMZW4rKztcbiAgICAgIGlmIChzb3VyY2VbY3R4RW5kXSA9PSBcIlxcblwiKSB7XG4gICAgICAgIGlmICgrK2N0eExpbmVzID09IDMpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBjb250ZXh0ID0gc291cmNlLnN1YnN0cmluZyhjdHhTdGFydCwgdGhpcy5zcGFuLnN0YXJ0Lm9mZnNldCkgKyAnW0VSUk9SIC0+XScgK1xuICAgICAgICAgICAgICAgICAgc291cmNlLnN1YnN0cmluZyh0aGlzLnNwYW4uc3RhcnQub2Zmc2V0LCBjdHhFbmQgKyAxKTtcblxuICAgIHJldHVybiBgJHt0aGlzLm1zZ30gKFwiJHtjb250ZXh0fVwiKTogJHt0aGlzLnNwYW4uc3RhcnR9YDtcbiAgfVxufVxuIl19