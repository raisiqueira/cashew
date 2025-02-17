import { fakeAsync, tick } from '@angular/core/testing';
import { DefaultTTLManager } from '../ttlManager';
import { config, localStorageMock } from './mocks.spec';
import { LocalStorageTTLManager } from '../localstorage/localStorageTtlManager';

describe('localStorageTtlManager', () => {
  let ttlManager: LocalStorageTTLManager;
  const ttl = 1000;
  localStorageMock();

  beforeEach(() => {
    ttlManager = new LocalStorageTTLManager(config);
  });

  describe('valid', () => {
    it('should not be valid if a key does not exist', () => {
      expect(ttlManager.isValid('notExistingKey')).toBeFalsy();
    });
  });

  describe('set', () => {
    it('should be valid', () => {
      ttlManager.set('key', 1000);
      expect(ttlManager.isValid('key')).toBeTruthy();
    });

    it('should not be valid after ttl is over', fakeAsync(() => {
      ttlManager.set('key', 1000);
      tick(1001);
      expect(ttlManager.isValid('key')).toBeFalsy();
    }));

    it('should use the config ttl if non has been passed', () => {
      spyOn(Date.prototype, 'setMilliseconds');
      ttlManager.set('key');
      expect(Date.prototype.setMilliseconds).toHaveBeenCalledWith(config.ttl);
    });
  });

  describe('delete', () => {
    it('should clear storage when call without a key', () => {
      spyOn((ttlManager as any).ttl, 'delete');
      spyOn(localStorage, 'removeItem');
      ttlManager.delete();
      expect((ttlManager as any).ttl.delete).toHaveBeenCalled();
      expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it('should call delete when given key', () => {
      spyOn((ttlManager as any).ttl, 'delete');
      spyOn(localStorage, 'setItem');
      ttlManager.delete('key');
      expect((ttlManager as any).ttl.delete).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('should delete by regex', () => {
      const key = 'aaa';
      ttlManager.set(key, ttl);
      const regex = new RegExp('aa');
      ttlManager.delete(regex);
      expect(ttlManager.isValid(key)).toBeFalsy();
    });
  });
});
