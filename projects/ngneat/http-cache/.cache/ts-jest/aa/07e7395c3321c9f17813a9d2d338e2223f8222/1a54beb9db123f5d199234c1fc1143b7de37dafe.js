"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var httpCacheManager_service_1 = require("./httpCacheManager.service");
var cloneWithoutParams_1 = require("./cloneWithoutParams");
var keySerializer_1 = require("./keySerializer");
var HttpCacheInterceptor = /** @class */ (function () {
    function HttpCacheInterceptor(cacheFacade, keySerializer) {
        this.cacheFacade = cacheFacade;
        this.keySerializer = keySerializer;
    }
    HttpCacheInterceptor.prototype.intercept = function (request, next) {
        var _this = this;
        var canActivate = this.cacheFacade._canActivate(request);
        var cache = request.params.get('cache$');
        var ttl = request.params.get('ttl$');
        var customKey = request.params.get('key$');
        var bucket = request.params.get('bucket$');
        var clone = cloneWithoutParams_1.cloneWithoutParams(request, customKey);
        var key = this.keySerializer.serialize(clone);
        if (this.cacheFacade._isCacheable(canActivate, cache)) {
            bucket && bucket.add(key);
            // TODO: wouldn't _queue be better instead of ts-ignore it.
            // @ts-ignore
            if (this.cacheFacade.queue.has(key)) {
                // @ts-ignore
                return this.cacheFacade.queue.get(key);
            }
            if (this.cacheFacade.validate(key)) {
                return rxjs_1.of(this.cacheFacade.get(key));
            }
            //TODO: I would split that to function (for readability sake).
            var shared = next.handle(clone).pipe(operators_1.tap(function (event) {
                if (event instanceof http_1.HttpResponse) {
                    _this.cacheFacade._set(key, event, +ttl);
                }
            }), operators_1.share());
            // @ts-ignore
            this.cacheFacade.queue.set(key, shared);
            return shared;
        }
        return next.handle(clone);
    };
    HttpCacheInterceptor = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [httpCacheManager_service_1.HttpCacheManager, keySerializer_1.KeySerializer])
    ], HttpCacheInterceptor);
    return HttpCacheInterceptor;
}());
exports.HttpCacheInterceptor = HttpCacheInterceptor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiQzpcXFVzZXJzXFxJdGF5XFxwcm9qZWN0c1xcb3BlbnNvdXJjZXNcXGh0dHAtY2FjaGVcXHByb2plY3RzXFxuZ25lYXRcXGh0dHAtY2FjaGVcXHNyY1xcbGliXFxodHRwQ2FjaGVJbnRlcmNlcHRvci50cyIsIm1hcHBpbmdzIjoiOzs7QUFBQSxzQ0FBMkM7QUFDM0MsNkNBQTBHO0FBQzFHLDZCQUFzQztBQUN0Qyw0Q0FBNEM7QUFFNUMsdUVBQThEO0FBQzlELDJEQUEwRDtBQUMxRCxpREFBZ0Q7QUFJaEQ7SUFDRSw4QkFBb0IsV0FBNkIsRUFBVSxhQUE0QjtRQUFuRSxnQkFBVyxHQUFYLFdBQVcsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUFHLENBQUM7SUFFM0Ysd0NBQVMsR0FBVCxVQUFVLE9BQXlCLEVBQUUsSUFBaUI7UUFBdEQsaUJBdUNDO1FBdENDLElBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLElBQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQU0sTUFBTSxHQUFRLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQU0sS0FBSyxHQUFHLHVDQUFrQixDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNyRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVoRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUNyRCxNQUFNLElBQUssTUFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0MsMkRBQTJEO1lBQzNELGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDbkMsYUFBYTtnQkFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QztZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2xDLE9BQU8sU0FBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDdEM7WUFDRCw4REFBOEQ7WUFDOUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQ3BDLGVBQUcsQ0FBQyxVQUFBLEtBQUs7Z0JBQ1AsSUFBSSxLQUFLLFlBQVksbUJBQVksRUFBRTtvQkFDakMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUN6QztZQUNILENBQUMsQ0FBQyxFQUNGLGlCQUFLLEVBQUUsQ0FDUixDQUFDO1lBRUYsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFeEMsT0FBTyxNQUFNLENBQUM7U0FDZjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBMUNVLG9CQUFvQjtRQURoQyxpQkFBVSxFQUFFO2lEQUVzQiwyQ0FBZ0IsRUFBeUIsNkJBQWE7T0FENUUsb0JBQW9CLENBMkNoQztJQUFELDJCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksb0RBQW9CIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcSXRheVxccHJvamVjdHNcXG9wZW5zb3VyY2VzXFxodHRwLWNhY2hlXFxwcm9qZWN0c1xcbmduZWF0XFxodHRwLWNhY2hlXFxzcmNcXGxpYlxcaHR0cENhY2hlSW50ZXJjZXB0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEV2ZW50LCBIdHRwSGFuZGxlciwgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cFJlc3BvbnNlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHNoYXJlLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEh0dHBDYWNoZU1hbmFnZXIgfSBmcm9tICcuL2h0dHBDYWNoZU1hbmFnZXIuc2VydmljZSc7XG5pbXBvcnQgeyBjbG9uZVdpdGhvdXRQYXJhbXMgfSBmcm9tICcuL2Nsb25lV2l0aG91dFBhcmFtcyc7XG5pbXBvcnQgeyBLZXlTZXJpYWxpemVyIH0gZnJvbSAnLi9rZXlTZXJpYWxpemVyJztcbmltcG9ydCB7IENhY2hlQnVja2V0IH0gZnJvbSAnLi9jYWNoZUJ1Y2tldCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwQ2FjaGVJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2FjaGVGYWNhZGU6IEh0dHBDYWNoZU1hbmFnZXIsIHByaXZhdGUga2V5U2VyaWFsaXplcjogS2V5U2VyaWFsaXplcikge31cblxuICBpbnRlcmNlcHQocmVxdWVzdDogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgY2FuQWN0aXZhdGUgPSB0aGlzLmNhY2hlRmFjYWRlLl9jYW5BY3RpdmF0ZShyZXF1ZXN0KTtcbiAgICBjb25zdCBjYWNoZSA9IHJlcXVlc3QucGFyYW1zLmdldCgnY2FjaGUkJyk7XG4gICAgY29uc3QgdHRsID0gcmVxdWVzdC5wYXJhbXMuZ2V0KCd0dGwkJyk7XG4gICAgY29uc3QgY3VzdG9tS2V5ID0gcmVxdWVzdC5wYXJhbXMuZ2V0KCdrZXkkJyk7XG4gICAgY29uc3QgYnVja2V0OiBhbnkgPSByZXF1ZXN0LnBhcmFtcy5nZXQoJ2J1Y2tldCQnKTtcblxuICAgIGNvbnN0IGNsb25lID0gY2xvbmVXaXRob3V0UGFyYW1zKHJlcXVlc3QsIGN1c3RvbUtleSk7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5rZXlTZXJpYWxpemVyLnNlcmlhbGl6ZShjbG9uZSk7XG5cbiAgICBpZiAodGhpcy5jYWNoZUZhY2FkZS5faXNDYWNoZWFibGUoY2FuQWN0aXZhdGUsIGNhY2hlKSkge1xuICAgICAgYnVja2V0ICYmIChidWNrZXQgYXMgQ2FjaGVCdWNrZXQpLmFkZChrZXkpO1xuICAgICAgLy8gVE9ETzogd291bGRuJ3QgX3F1ZXVlIGJlIGJldHRlciBpbnN0ZWFkIG9mIHRzLWlnbm9yZSBpdC5cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGlmICh0aGlzLmNhY2hlRmFjYWRlLnF1ZXVlLmhhcyhrZXkpKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVGYWNhZGUucXVldWUuZ2V0KGtleSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmNhY2hlRmFjYWRlLnZhbGlkYXRlKGtleSkpIHtcbiAgICAgICAgcmV0dXJuIG9mKHRoaXMuY2FjaGVGYWNhZGUuZ2V0KGtleSkpO1xuICAgICAgfVxuICAgICAgLy9UT0RPOiBJIHdvdWxkIHNwbGl0IHRoYXQgdG8gZnVuY3Rpb24gKGZvciByZWFkYWJpbGl0eSBzYWtlKS5cbiAgICAgIGNvbnN0IHNoYXJlZCA9IG5leHQuaGFuZGxlKGNsb25lKS5waXBlKFxuICAgICAgICB0YXAoZXZlbnQgPT4ge1xuICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIEh0dHBSZXNwb25zZSkge1xuICAgICAgICAgICAgdGhpcy5jYWNoZUZhY2FkZS5fc2V0KGtleSwgZXZlbnQsICt0dGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKClcbiAgICAgICk7XG5cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIHRoaXMuY2FjaGVGYWNhZGUucXVldWUuc2V0KGtleSwgc2hhcmVkKTtcblxuICAgICAgcmV0dXJuIHNoYXJlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dC5oYW5kbGUoY2xvbmUpO1xuICB9XG59XG4iXSwidmVyc2lvbiI6M30=