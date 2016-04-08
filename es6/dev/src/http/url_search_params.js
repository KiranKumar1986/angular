import { isPresent } from 'angular2/src/facade/lang';
import { Map, ListWrapper, isListLikeIterable } from 'angular2/src/facade/collection';
function paramParser(rawParams = '') {
    var map = new Map();
    if (rawParams.length > 0) {
        var params = rawParams.split('&');
        params.forEach((param) => {
            var split = param.split('=');
            var key = split[0];
            var val = split[1];
            var list = isPresent(map.get(key)) ? map.get(key) : [];
            list.push(val);
            map.set(key, list);
        });
    }
    return map;
}
/**
 * Map-like representation of url search parameters, based on
 * [URLSearchParams](https://url.spec.whatwg.org/#urlsearchparams) in the url living standard,
 * with several extensions for merging URLSearchParams objects:
 *   - setAll()
 *   - appendAll()
 *   - replaceAll()
 */
export class URLSearchParams {
    constructor(rawParams = '') {
        this.rawParams = rawParams;
        this.paramsMap = paramParser(rawParams);
    }
    clone() {
        var clone = new URLSearchParams();
        clone.appendAll(this);
        return clone;
    }
    has(param) { return this.paramsMap.has(param); }
    get(param) {
        var storedParam = this.paramsMap.get(param);
        if (isListLikeIterable(storedParam)) {
            return ListWrapper.first(storedParam);
        }
        else {
            return null;
        }
    }
    getAll(param) {
        var mapParam = this.paramsMap.get(param);
        return isPresent(mapParam) ? mapParam : [];
    }
    set(param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = isPresent(mapParam) ? mapParam : [];
        ListWrapper.clear(list);
        list.push(val);
        this.paramsMap.set(param, list);
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `set(name, values[0])`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    setAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var mapParam = this.paramsMap.get(param);
            var list = isPresent(mapParam) ? mapParam : [];
            ListWrapper.clear(list);
            list.push(value[0]);
            this.paramsMap.set(param, list);
        });
    }
    append(param, val) {
        var mapParam = this.paramsMap.get(param);
        var list = isPresent(mapParam) ? mapParam : [];
        list.push(val);
        this.paramsMap.set(param, list);
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `append(name, value)`
    // for each value in `values`.
    //
    // E.g: "a=[1,2], c=[8]" + "a=[3,4], b=[7]" = "a=[1,2,3,4], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    appendAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var mapParam = this.paramsMap.get(param);
            var list = isPresent(mapParam) ? mapParam : [];
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    // A merge operation
    // For each name-values pair in `searchParams`, perform `delete(name)`,
    // followed by `set(name, values)`
    //
    // E.g: "a=[1,2,3], c=[8]" + "a=[4,5,6], b=[7]" = "a=[4,5,6], c=[8], b=[7]"
    //
    // TODO(@caitp): document this better
    replaceAll(searchParams) {
        searchParams.paramsMap.forEach((value, param) => {
            var mapParam = this.paramsMap.get(param);
            var list = isPresent(mapParam) ? mapParam : [];
            ListWrapper.clear(list);
            for (var i = 0; i < value.length; ++i) {
                list.push(value[i]);
            }
            this.paramsMap.set(param, list);
        });
    }
    toString() {
        var paramsList = [];
        this.paramsMap.forEach((values, k) => { values.forEach(v => paramsList.push(k + '=' + v)); });
        return paramsList.join('&');
    }
    delete(param) { this.paramsMap.delete(param); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLU1oeU1NaWgwLnRtcC9hbmd1bGFyMi9zcmMvaHR0cC91cmxfc2VhcmNoX3BhcmFtcy50cyJdLCJuYW1lcyI6WyJwYXJhbVBhcnNlciIsIlVSTFNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcy5jb25zdHJ1Y3RvciIsIlVSTFNlYXJjaFBhcmFtcy5jbG9uZSIsIlVSTFNlYXJjaFBhcmFtcy5oYXMiLCJVUkxTZWFyY2hQYXJhbXMuZ2V0IiwiVVJMU2VhcmNoUGFyYW1zLmdldEFsbCIsIlVSTFNlYXJjaFBhcmFtcy5zZXQiLCJVUkxTZWFyY2hQYXJhbXMuc2V0QWxsIiwiVVJMU2VhcmNoUGFyYW1zLmFwcGVuZCIsIlVSTFNlYXJjaFBhcmFtcy5hcHBlbmRBbGwiLCJVUkxTZWFyY2hQYXJhbXMucmVwbGFjZUFsbCIsIlVSTFNlYXJjaFBhcmFtcy50b1N0cmluZyIsIlVSTFNlYXJjaFBhcmFtcy5kZWxldGUiXSwibWFwcGluZ3MiOiJPQUFPLEVBQWEsU0FBUyxFQUFVLE1BQU0sMEJBQTBCO09BQ2hFLEVBQUMsR0FBRyxFQUFjLFdBQVcsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGdDQUFnQztBQUUvRixxQkFBcUIsU0FBUyxHQUFXLEVBQUU7SUFDekNBLElBQUlBLEdBQUdBLEdBQUdBLElBQUlBLEdBQUdBLEVBQW9CQSxDQUFDQTtJQUN0Q0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDekJBLElBQUlBLE1BQU1BLEdBQWFBLFNBQVNBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBO1FBQzVDQSxNQUFNQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxLQUFhQTtZQUMzQkEsSUFBSUEsS0FBS0EsR0FBYUEsS0FBS0EsQ0FB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IHtDT05TVF9FWFBSLCBpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge01hcCwgTWFwV3JhcHBlciwgTGlzdFdyYXBwZXIsIGlzTGlzdExpa2VJdGVyYWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcblxuZnVuY3Rpb24gcGFyYW1QYXJzZXIocmF3UGFyYW1zOiBzdHJpbmcgPSAnJyk6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPiB7XG4gIHZhciBtYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nW10+KCk7XG4gIGlmIChyYXdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgIHZhciBwYXJhbXM6IHN0cmluZ1tdID0gcmF3UGFyYW1zLnNwbGl0KCcmJyk7XG4gICAgcGFyYW1zLmZvckVhY2goKHBhcmFtOiBzdHJpbmcpID0+IHtcbiAgICAgIHZhciBzcGxpdDogc3RyaW5nW10gPSBwYXJhbS5zcGxpdCgnPScpO1xuICAgICAgdmFyIGtleSA9IHNwbGl0WzBdO1xuICAgICAgdmFyIHZhbCA9IHNwbGl0WzFdO1xuICAgICAgdmFyIGxpc3QgPSBpc1ByZXNlbnQobWFwLmdldChrZXkpKSA/IG1hcC5nZXQoa2V5KSA6IFtdO1xuICAgICAgbGlzdC5wdXNoKHZhbCk7XG4gICAgICBtYXAuc2V0KGtleSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBNYXAtbGlrZSByZXByZXNlbnRhdGlvbiBvZiB1cmwgc2VhcmNoIHBhcmFtZXRlcnMsIGJhc2VkIG9uXG4gKiBbVVJMU2VhcmNoUGFyYW1zXShodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHNlYXJjaHBhcmFtcykgaW4gdGhlIHVybCBsaXZpbmcgc3RhbmRhcmQsXG4gKiB3aXRoIHNldmVyYWwgZXh0ZW5zaW9ucyBmb3IgbWVyZ2luZyBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0czpcbiAqICAgLSBzZXRBbGwoKVxuICogICAtIGFwcGVuZEFsbCgpXG4gKiAgIC0gcmVwbGFjZUFsbCgpXG4gKi9cbmV4cG9ydCBjbGFzcyBVUkxTZWFyY2hQYXJhbXMge1xuICBwYXJhbXNNYXA6IE1hcDxzdHJpbmcsIHN0cmluZ1tdPjtcbiAgY29uc3RydWN0b3IocHVibGljIHJhd1BhcmFtczogc3RyaW5nID0gJycpIHsgdGhpcy5wYXJhbXNNYXAgPSBwYXJhbVBhcnNlcihyYXdQYXJhbXMpOyB9XG5cbiAgY2xvbmUoKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgICB2YXIgY2xvbmUgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKCk7XG4gICAgY2xvbmUuYXBwZW5kQWxsKHRoaXMpO1xuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIGhhcyhwYXJhbTogc3RyaW5nKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhcmFtc01hcC5oYXMocGFyYW0pOyB9XG5cbiAgZ2V0KHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHZhciBzdG9yZWRQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG4gICAgaWYgKGlzTGlzdExpa2VJdGVyYWJsZShzdG9yZWRQYXJhbSkpIHtcbiAgICAgIHJldHVybiBMaXN0V3JhcHBlci5maXJzdChzdG9yZWRQYXJhbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGdldEFsbChwYXJhbTogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIHZhciBtYXBQYXJhbSA9IHRoaXMucGFyYW1zTWFwLmdldChwYXJhbSk7XG4gICAgcmV0dXJuIGlzUHJlc2VudChtYXBQYXJhbSkgPyBtYXBQYXJhbSA6IFtdO1xuICB9XG5cbiAgc2V0KHBhcmFtOiBzdHJpbmcsIHZhbDogc3RyaW5nKSB7XG4gICAgdmFyIG1hcFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcbiAgICB2YXIgbGlzdCA9IGlzUHJlc2VudChtYXBQYXJhbSkgPyBtYXBQYXJhbSA6IFtdO1xuICAgIExpc3RXcmFwcGVyLmNsZWFyKGxpc3QpO1xuICAgIGxpc3QucHVzaCh2YWwpO1xuICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gIH1cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBzZXQobmFtZSwgdmFsdWVzWzBdKWBcbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMiwzXSwgYz1bOF1cIiArIFwiYT1bNCw1LDZdLCBiPVs3XVwiID0gXCJhPVs0XSwgYz1bOF0sIGI9WzddXCJcbiAgLy9cbiAgLy8gVE9ETyhAY2FpdHApOiBkb2N1bWVudCB0aGlzIGJldHRlclxuICBzZXRBbGwoc2VhcmNoUGFyYW1zOiBVUkxTZWFyY2hQYXJhbXMpIHtcbiAgICBzZWFyY2hQYXJhbXMucGFyYW1zTWFwLmZvckVhY2goKHZhbHVlLCBwYXJhbSkgPT4ge1xuICAgICAgdmFyIG1hcFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcbiAgICAgIHZhciBsaXN0ID0gaXNQcmVzZW50KG1hcFBhcmFtKSA/IG1hcFBhcmFtIDogW107XG4gICAgICBMaXN0V3JhcHBlci5jbGVhcihsaXN0KTtcbiAgICAgIGxpc3QucHVzaCh2YWx1ZVswXSk7XG4gICAgICB0aGlzLnBhcmFtc01hcC5zZXQocGFyYW0sIGxpc3QpO1xuICAgIH0pO1xuICB9XG5cbiAgYXBwZW5kKHBhcmFtOiBzdHJpbmcsIHZhbDogc3RyaW5nKTogdm9pZCB7XG4gICAgdmFyIG1hcFBhcmFtID0gdGhpcy5wYXJhbXNNYXAuZ2V0KHBhcmFtKTtcbiAgICB2YXIgbGlzdCA9IGlzUHJlc2VudChtYXBQYXJhbSkgPyBtYXBQYXJhbSA6IFtdO1xuICAgIGxpc3QucHVzaCh2YWwpO1xuICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gIH1cblxuICAvLyBBIG1lcmdlIG9wZXJhdGlvblxuICAvLyBGb3IgZWFjaCBuYW1lLXZhbHVlcyBwYWlyIGluIGBzZWFyY2hQYXJhbXNgLCBwZXJmb3JtIGBhcHBlbmQobmFtZSwgdmFsdWUpYFxuICAvLyBmb3IgZWFjaCB2YWx1ZSBpbiBgdmFsdWVzYC5cbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMl0sIGM9WzhdXCIgKyBcImE9WzMsNF0sIGI9WzddXCIgPSBcImE9WzEsMiwzLDRdLCBjPVs4XSwgYj1bN11cIlxuICAvL1xuICAvLyBUT0RPKEBjYWl0cCk6IGRvY3VtZW50IHRoaXMgYmV0dGVyXG4gIGFwcGVuZEFsbChzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHNlYXJjaFBhcmFtcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWUsIHBhcmFtKSA9PiB7XG4gICAgICB2YXIgbWFwUGFyYW0gPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pO1xuICAgICAgdmFyIGxpc3QgPSBpc1ByZXNlbnQobWFwUGFyYW0pID8gbWFwUGFyYW0gOiBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgbGlzdC5wdXNoKHZhbHVlW2ldKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGFyYW1zTWFwLnNldChwYXJhbSwgbGlzdCk7XG4gICAgfSk7XG4gIH1cblxuXG4gIC8vIEEgbWVyZ2Ugb3BlcmF0aW9uXG4gIC8vIEZvciBlYWNoIG5hbWUtdmFsdWVzIHBhaXIgaW4gYHNlYXJjaFBhcmFtc2AsIHBlcmZvcm0gYGRlbGV0ZShuYW1lKWAsXG4gIC8vIGZvbGxvd2VkIGJ5IGBzZXQobmFtZSwgdmFsdWVzKWBcbiAgLy9cbiAgLy8gRS5nOiBcImE9WzEsMiwzXSwgYz1bOF1cIiArIFwiYT1bNCw1LDZdLCBiPVs3XVwiID0gXCJhPVs0LDUsNl0sIGM9WzhdLCBiPVs3XVwiXG4gIC8vXG4gIC8vIFRPRE8oQGNhaXRwKTogZG9jdW1lbnQgdGhpcyBiZXR0ZXJcbiAgcmVwbGFjZUFsbChzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtcykge1xuICAgIHNlYXJjaFBhcmFtcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWUsIHBhcmFtKSA9PiB7XG4gICAgICB2YXIgbWFwUGFyYW0gPSB0aGlzLnBhcmFtc01hcC5nZXQocGFyYW0pO1xuICAgICAgdmFyIGxpc3QgPSBpc1ByZXNlbnQobWFwUGFyYW0pID8gbWFwUGFyYW0gOiBbXTtcbiAgICAgIExpc3RXcmFwcGVyLmNsZWFyKGxpc3QpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBsaXN0LnB1c2godmFsdWVbaV0pO1xuICAgICAgfVxuICAgICAgdGhpcy5wYXJhbXNNYXAuc2V0KHBhcmFtLCBsaXN0KTtcbiAgICB9KTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgdmFyIHBhcmFtc0xpc3Q6IHN0cmluZ1tdID0gW107XG4gICAgdGhpcy5wYXJhbXNNYXAuZm9yRWFjaCgodmFsdWVzLCBrKSA9PiB7IHZhbHVlcy5mb3JFYWNoKHYgPT4gcGFyYW1zTGlzdC5wdXNoKGsgKyAnPScgKyB2KSk7IH0pO1xuICAgIHJldHVybiBwYXJhbXNMaXN0LmpvaW4oJyYnKTtcbiAgfVxuXG4gIGRlbGV0ZSAocGFyYW06IHN0cmluZyk6IHZvaWQgeyB0aGlzLnBhcmFtc01hcC5kZWxldGUocGFyYW0pOyB9XG59XG4iXX0=