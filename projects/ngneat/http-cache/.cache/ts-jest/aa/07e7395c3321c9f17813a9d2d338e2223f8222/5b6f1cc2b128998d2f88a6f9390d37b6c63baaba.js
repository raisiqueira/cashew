"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var httpCacheConfig_1 = require("./httpCacheConfig");
var deleteByRegex_1 = require("./deleteByRegex");
var TTLManager = /** @class */ (function () {
    function TTLManager() {
    }
    return TTLManager;
}());
exports.TTLManager = TTLManager;
var DefaultTTLManager = /** @class */ (function () {
    function DefaultTTLManager(config) {
        this.config = config;
        this.cache = new Map();
    }
    DefaultTTLManager.prototype.isValid = function (key) {
        return this.cache.get(key) > new Date().getTime();
    };
    DefaultTTLManager.prototype.set = function (key, ttl) {
        var resolveTTL = ttl || this.config.ttl.default;
        this.cache.set(key, new Date().setMilliseconds(resolveTTL));
    };
    DefaultTTLManager.prototype.delete = function (key) {
        if (!key) {
            this.cache.clear();
            return;
        }
        if (typeof key === 'string') {
            this.cache.delete(key);
            return;
        }
        deleteByRegex_1.deleteByRegex(key, this.cache);
    };
    DefaultTTLManager = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__param(0, core_1.Inject(httpCacheConfig_1.HTTP_CACHE_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [Object])
    ], DefaultTTLManager);
    return DefaultTTLManager;
}());
exports.DefaultTTLManager = DefaultTTLManager;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFx0dGxNYW5hZ2VyLnRzIiwibWFwcGluZ3MiOiI7OztBQUFBLHNDQUFtRDtBQUNuRCxxREFBdUU7QUFDdkUsaURBQWdEO0FBRWhEO0lBQUE7SUFJQSxDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpxQixnQ0FBVTtBQU9oQztJQUdFLDJCQUErQyxNQUF1QjtRQUF2QixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUY5RCxVQUFLLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7SUFFK0IsQ0FBQztJQUUxRSxtQ0FBTyxHQUFQLFVBQVEsR0FBVztRQUNqQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEQsQ0FBQztJQUVELCtCQUFHLEdBQUgsVUFBSSxHQUFXLEVBQUUsR0FBWTtRQUMzQixJQUFJLFVBQVUsR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBRWhELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxrQ0FBTSxHQUFOLFVBQU8sR0FBcUI7UUFDMUIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBRUQsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBYSxDQUFDLENBQUM7WUFDakMsT0FBTztTQUNSO1FBRUQsNkJBQWEsQ0FBQyxHQUFhLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUEzQlUsaUJBQWlCO1FBRDdCLGlCQUFVLEVBQUU7UUFJRSxtQkFBQSxhQUFNLENBQUMsbUNBQWlCLENBQUMsQ0FBQTs7T0FIM0IsaUJBQWlCLENBNEI3QjtJQUFELHdCQUFDO0NBQUEsQUE1QkQsSUE0QkM7QUE1QlksOENBQWlCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcdHRsTWFuYWdlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfQ0FDSEVfQ09ORklHLCBIdHRwQ2FjaGVDb25maWcgfSBmcm9tICcuL2h0dHBDYWNoZUNvbmZpZyc7XG5pbXBvcnQgeyBkZWxldGVCeVJlZ2V4IH0gZnJvbSAnLi9kZWxldGVCeVJlZ2V4JztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFRUTE1hbmFnZXIge1xuICBhYnN0cmFjdCBpc1ZhbGlkKGtleTogc3RyaW5nKTogYm9vbGVhbjtcbiAgYWJzdHJhY3Qgc2V0KGtleTogc3RyaW5nLCB0dGw/OiBudW1iZXIpOiB2b2lkO1xuICBhYnN0cmFjdCBkZWxldGUoa2V5Pzogc3RyaW5nIHwgUmVnRXhwKTogdm9pZDtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERlZmF1bHRUVExNYW5hZ2VyIHtcbiAgcHJpdmF0ZSBjYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChIVFRQX0NBQ0hFX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IEh0dHBDYWNoZUNvbmZpZykge31cblxuICBpc1ZhbGlkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGUuZ2V0KGtleSkgPiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdHRsPzogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IHJlc29sdmVUVEwgPSB0dGwgfHwgdGhpcy5jb25maWcudHRsLmRlZmF1bHQ7XG5cbiAgICB0aGlzLmNhY2hlLnNldChrZXksIG5ldyBEYXRlKCkuc2V0TWlsbGlzZWNvbmRzKHJlc29sdmVUVEwpKTtcbiAgfVxuXG4gIGRlbGV0ZShrZXk/OiBzdHJpbmcgfCBSZWdFeHApOiB2b2lkIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgdGhpcy5jYWNoZS5jbGVhcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Yga2V5ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5jYWNoZS5kZWxldGUoa2V5IGFzIHN0cmluZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGVsZXRlQnlSZWdleChrZXkgYXMgUmVnRXhwLCB0aGlzLmNhY2hlKTtcbiAgfVxufVxuIl0sInZlcnNpb24iOjN9